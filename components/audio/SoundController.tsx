'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { audio } from '@/lib/audio';

const INTERACTIVE_SELECTOR =
  'a, button, [role="tab"], summary, label[for], input[type="checkbox"], input[type="radio"]';

/**
 * Pemasang efek suara kontekstual sekali per halaman:
 * klik mikro pada kontrol, detak jantung saat garis EKG terlihat, dan
 * sirine jauh ketika pita ambulans masuk viewport.
 */
export function SoundController() {
  const pathname = usePathname();

  useEffect(() => {
    audio.hydrate();

    const handlePointerDown = (event: PointerEvent) => {
      if (!audio.isEnabled()) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = target.closest(INTERACTIVE_SELECTOR);
      if (!control) return;

      const requested = control.getAttribute('data-sound');
      if (requested === 'none') return;
      if (requested === 'chime' || requested === 'whoosh') audio.play(requested);
      else audio.play('click');
    };

    const handleVisibility = () => audio.setHidden(document.hidden);

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('visibilitychange', handleVisibility);

    let heartbeatTimer = 0;
    let ecgVisible = false;
    const beat = () => {
      if (ecgVisible) audio.playHeartbeat();
    };

    const ecgObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) ecgVisible = true;
        }
        if (entries.every((entry) => !entry.isIntersecting)) ecgVisible = false;
        window.clearInterval(heartbeatTimer);
        heartbeatTimer = window.setInterval(beat, 1150);
      },
      { threshold: 0.15 },
    );

    const tracks = Array.from(document.querySelectorAll('.ecg-trace'));
    for (const track of tracks) ecgObserver.observe(track);

    let sirenTimer = 0;
    let sirenDelay = 0;
    let roadVisible = false;

    const sirenObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          roadVisible = entry.isIntersecting;
        }
        window.clearTimeout(sirenDelay);
        window.clearInterval(sirenTimer);
        if (!roadVisible) return;
        sirenDelay = window.setTimeout(() => audio.playSiren(), 2600);
        sirenTimer = window.setInterval(() => audio.playSiren(), 13000);
      },
      { threshold: 0.25 },
    );

    const roads = Array.from(document.querySelectorAll('.ambulance-road'));
    for (const road of roads) sirenObserver.observe(road);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('visibilitychange', handleVisibility);
      ecgObserver.disconnect();
      sirenObserver.disconnect();
      window.clearInterval(heartbeatTimer);
      window.clearInterval(sirenTimer);
      window.clearTimeout(sirenDelay);
    };
  }, [pathname]);

  return null;
}
