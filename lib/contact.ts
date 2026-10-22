export function buildWhatsAppLink({ phone, message }: { phone: string; message: string }): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_TEMPLATES = {
  siagaMedis:
    'Halo KSR PMI Unit Universitas Telkom, saya ingin mengajukan siaga medis untuk kegiatan <nama> pada <tanggal> di <lokasi>.',
  pelatihan:
    'Halo KSR PMI Unit Universitas Telkom, saya ingin mengajukan pelatihan untuk <sekolah/instansi> dengan jumlah peserta <n>.',
  kerjaSama:
    'Halo KSR PMI Unit Universitas Telkom, saya ingin mendiskusikan kerja sama untuk <kegiatan>.',
} as const;
