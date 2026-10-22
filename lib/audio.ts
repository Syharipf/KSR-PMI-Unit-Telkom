/**
 * Mesin audio sintetis berbasis Web Audio API.
 *
 * Tidak memakai berkas audio eksternal: semua suara dibangkitkan secara
 * prosedural (osilator + noise buffer), sehingga nol byte tambahan dan
 * latensi awal mendekati nol.
 *
 * Aturan:
 * - Default senyap. Audio baru dibuat setelah interaksi pengguna.
 * - Semua bunyi melewati satu master gain yang mengikuti preferensi
 *   pengguna dan dijeda saat tab tidak terlihat.
 */

const STORAGE_KEY = 'ksr-audio-enabled';
const MASTER_LEVEL = 0.85;

export type AmbienceChapter = 0 | 1 | 2;
export type SoundName = 'click' | 'chime' | 'whoosh';

type Listener = (enabled: boolean) => void;

type AmbienceLayer = {
  gain: GainNode;
  sources: AudioScheduledSourceNode[];
  timers: number[];
  teardown: number | null;
};

class AudioEngine {
  private ctx: AudioContext | null = null;

  private master: GainNode | null = null;

  private enabled = false;

  private hidden = false;

  private listeners = new Set<Listener>();

  private layer: AmbienceLayer | null = null;

  private ambienceRequested = false;

  private chapter: AmbienceChapter = 0;

  private hydrated = false;

  /** Restorasi preferensi tersimpan sekali per sesi, tanpa membuka AudioContext. */
  hydrate() {
    if (typeof window === 'undefined' || this.hydrated) return;
    this.hydrated = true;
    try {
      this.enabled = window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      this.enabled = false;
    }
    this.emit();
  }

  isEnabled() {
    return this.enabled;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    for (const listener of this.listeners) listener(this.enabled);
  }

  setEnabled(next: boolean) {
    if (this.enabled === next) return;
    this.enabled = next;

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {
        /* penyimpanan privat: abaikan */
      }
    }

    const ctx = next ? this.context() : this.ctx;
    if (ctx && this.master) {
      const now = ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setTargetAtTime(next ? MASTER_LEVEL : 0, now, next ? 0.08 : 0.05);
    }

    if (!next) {
      this.stopAmbience();
    } else if (this.ambienceRequested) {
      this.startAmbience();
    }

    this.emit();
  }

  /** Dipanggil saat tab disembunyikan/ditampilkan. */
  setHidden(hidden: boolean) {
    this.hidden = hidden;
    const ctx = this.ctx;
    if (!ctx) return;
    if (hidden && ctx.state === 'running') {
      void ctx.suspend();
    } else if (!hidden && this.enabled && ctx.state === 'suspended') {
      void ctx.resume();
    }
  }

  private context(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      // Safari ≤14 hanya mengekspos prefiks webkitAudioContext.
      const legacyWindow = window as unknown as { webkitAudioContext?: typeof AudioContext };
      const Ctor = window.AudioContext ?? legacyWindow.webkitAudioContext;
      if (!Ctor) return null;

      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.enabled ? MASTER_LEVEL : 0;
      this.master.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended' && !this.hidden) {
      void this.ctx.resume();
    }

    return this.ctx;
  }

  /** Konteks yang siap dibunyikan, atau null bila belum boleh bersuara. */
  private ready(): AudioContext | null {
    if (!this.enabled || this.hidden) return null;
    const ctx = this.context();
    if (!ctx || !this.master) return null;
    return ctx;
  }

  play(name: SoundName) {
    if (name === 'click') this.playClick();
    else if (name === 'chime') this.playChime();
    else this.playWhoosh();
  }

  playClick() {
    const ctx = this.ready();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1280, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.05);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.045, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.075);

    osc.connect(gain).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  playChime() {
    const ctx = this.ready();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;

    for (const [freq, level, offset] of [
      [1046.5, 0.05, 0],
      [1568, 0.03, 0.06],
    ] as const) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + offset);
      gain.gain.setValueAtTime(0.0001, t + offset);
      gain.gain.exponentialRampToValueAtTime(level, t + offset + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.55);
      osc.connect(gain).connect(this.master);
      osc.start(t + offset);
      osc.stop(t + offset + 0.6);
    }
  }

  playWhoosh() {
    const ctx = this.ready();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const duration = 0.16;

    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer(ctx, duration);

    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.Q.value = 1.1;
    band.frequency.setValueAtTime(700, t);
    band.frequency.exponentialRampToValueAtTime(2400, t + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    noise.connect(band).connect(gain).connect(this.master);
    noise.start(t);
    noise.stop(t + duration);
  }

  /** Dua dentuman rendah, dipanggil berkala oleh pengontrol EKG. */
  playHeartbeat() {
    const ctx = this.ready();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    this.thump(ctx, t, 0.16);
    this.thump(ctx, t + 0.27, 0.1);
  }

  /** Sirine doppler halus, dipanggil saat pita ambulans terlihat. */
  playSiren() {
    const ctx = this.ready();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const duration = 2.9;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(555, t);
    osc.frequency.linearRampToValueAtTime(775, t + 0.95);
    osc.frequency.linearRampToValueAtTime(560, t + 1.9);
    osc.frequency.linearRampToValueAtTime(700, t + 2.6);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1150;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.045, t + 0.55);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(-0.75, t);
    panner.pan.linearRampToValueAtTime(0.75, t + duration);

    osc.connect(lp).connect(gain).connect(panner).connect(this.master);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  setAmbience(on: boolean) {
    this.ambienceRequested = on;
    if (on) this.startAmbience();
    else this.stopAmbience();
  }

  isAmbienceOn() {
    return this.ambienceRequested;
  }

  setChapter(chapter: AmbienceChapter) {
    if (this.chapter === chapter) return;
    this.chapter = chapter;
    if (this.ambienceRequested) this.startAmbience();
  }

  private startAmbience() {
    const ctx = this.ready();
    if (!ctx || !this.master) return;

    this.teardownLayer(0.35);

    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    gain.connect(this.master);

    const layer: AmbienceLayer = { gain, sources: [], timers: [], teardown: null };
    this.layer = layer;

    const register = (node: AudioScheduledSourceNode) => {
      layer.sources.push(node);
    };
    const every = (ms: number, fn: () => void) => {
      layer.timers.push(window.setInterval(fn, ms));
    };

    if (this.chapter === 0) {
      this.buildBattleAmbience(ctx, layer, register, every);
    } else if (this.chapter === 1) {
      this.buildNightAmbience(ctx, layer, register, every);
    } else {
      this.buildGenevaAmbience(ctx, layer, register, every);
    }

    gain.gain.setTargetAtTime(0.55, ctx.currentTime, 1.1);
  }

  private buildBattleAmbience(
    ctx: AudioContext,
    layer: AmbienceLayer,
    register: (node: AudioScheduledSourceNode) => void,
    every: (ms: number, fn: () => void) => void,
  ) {
    const drone = ctx.createGain();
    drone.gain.value = 0.085;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 320;
    drone.connect(lp).connect(layer.gain);

    const low = ctx.createOscillator();
    low.type = 'sine';
    low.frequency.value = 55;
    low.connect(drone);
    low.start();
    register(low);

    const fifth = ctx.createOscillator();
    fifth.type = 'triangle';
    fifth.frequency.value = 82.5;
    fifth.connect(drone);
    fifth.start();
    register(fifth);

    every(900, () => this.marchPulse(layer.gain));
  }

  private buildNightAmbience(
    ctx: AudioContext,
    layer: AmbienceLayer,
    register: (node: AudioScheduledSourceNode) => void,
    every: (ms: number, fn: () => void) => void,
  ) {
    const pad = ctx.createGain();
    pad.gain.value = 0.05;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    pad.connect(lp).connect(layer.gain);

    for (const [type, freq, level] of [
      ['sine', 220, 1],
      ['sine', 329.6, 0.7],
      ['triangle', 110, 0.9],
    ] as const) {
      const osc = ctx.createOscillator();
      const local = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      local.gain.value = level * 0.04;
      osc.connect(local).connect(pad);
      osc.start();
      register(osc);
    }

    every(6800, () => this.bellStrike(layer.gain));
  }

  private buildGenevaAmbience(
    ctx: AudioContext,
    layer: AmbienceLayer,
    register: (node: AudioScheduledSourceNode) => void,
    every: (ms: number, fn: () => void) => void,
  ) {
    const pad = ctx.createGain();
    pad.gain.value = 0.055;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1400;
    pad.connect(lp).connect(layer.gain);

    for (const [freq, level] of [
      [261.63, 1],
      [329.63, 0.75],
      [392, 0.6],
    ] as const) {
      const osc = ctx.createOscillator();
      const local = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      local.gain.value = level * 0.035;
      osc.connect(local).connect(pad);
      osc.start();
      register(osc);
    }

    every(4200, () => this.quillTick(layer.gain));
  }

  private marchPulse(destination: AudioNode) {
    const ctx = this.ready();
    if (!ctx) return;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(72, t);
    osc.frequency.exponentialRampToValueAtTime(44, t + 0.24);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);

    osc.connect(gain).connect(destination);
    osc.start(t);
    osc.stop(t + 0.32);
  }

  private bellStrike(destination: AudioNode) {
    const ctx = this.ready();
    if (!ctx) return;
    const t = ctx.currentTime;

    for (const [freq, level] of [
      [880, 0.03],
      [1318.5, 0.014],
    ] as const) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(level, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.9);
      osc.connect(gain).connect(destination);
      osc.start(t);
      osc.stop(t + 3);
    }
  }

  private quillTick(destination: AudioNode) {
    const ctx = this.ready();
    if (!ctx) return;
    const t = ctx.currentTime;

    for (let i = 0; i < 3; i += 1) {
      const offset = i * 0.09;
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer(ctx, 0.05);
      const band = ctx.createBiquadFilter();
      band.type = 'bandpass';
      band.frequency.value = 2600;
      band.Q.value = 1.4;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t + offset);
      gain.gain.exponentialRampToValueAtTime(0.03, t + offset + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.05);
      noise.connect(band).connect(gain).connect(destination);
      noise.start(t + offset);
      noise.stop(t + offset + 0.06);
    }
  }

  private thump(ctx: AudioContext, at: number, level: number) {
    const osc = ctx.createOscillator();
    const lp = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(68, at);
    osc.frequency.exponentialRampToValueAtTime(38, at + 0.16);

    lp.type = 'lowpass';
    lp.frequency.value = 220;

    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(level, at + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);

    osc.connect(lp).connect(gain).connect(this.master as GainNode);
    osc.start(at);
    osc.stop(at + 0.24);
  }

  private noiseBuffer(ctx: AudioContext, seconds: number) {
    const frames = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  private stopAmbience() {
    this.teardownLayer(0.3);
  }

  private teardownLayer(fade: number) {
    const layer = this.layer;
    if (!layer) return;
    this.layer = null;

    for (const timer of layer.timers) window.clearInterval(timer);

    if (this.ctx) {
      const now = this.ctx.currentTime;
      layer.gain.gain.cancelScheduledValues(now);
      layer.gain.gain.setTargetAtTime(0.0001, now, fade);
    }

    layer.teardown = window.setTimeout(() => {
      for (const source of layer.sources) {
        try {
          source.stop();
        } catch {
          /* sudah berhenti */
        }
        source.disconnect();
      }
      layer.gain.disconnect();
    }, fade * 1000 + 400);
  }
}

export const audio = new AudioEngine();

export const SOUND_STORAGE_KEY = STORAGE_KEY;
