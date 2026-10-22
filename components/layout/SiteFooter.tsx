import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { SiteConfig } from '@/lib/content/schema';

interface SiteFooterProps {
  config: SiteConfig;
}

export function SiteFooter({ config }: SiteFooterProps) {
  const isDummy = config.contentStatus === 'dummy';

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] transition-colors">
      <div className="w-full px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Identity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-white p-0.5 shadow-xs">
                <Image
                  src="/media/brand/icon-pmi.png"
                  alt="Logo PMI"
                  width={28}
                  height={38}
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="font-display text-base font-bold tracking-tight text-[var(--fg)]">
                KSR PMI Tel-U
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {config.tagline} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="font-mono text-sm text-[var(--meta)]">
              SK Rektor: {config.decree}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold tracking-wider text-[var(--fg)] uppercase">
              Tautan Cepat
            </span>
            <Link href="/tentang/sejarah" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Sejarah Fusi Tiga Unit
            </Link>
            <Link href="/tentang/prinsip" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              7 Prinsip Dasar Gerakan
            </Link>
            <Link href="/tentang/lambang" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Aturan Penggunaan Lambang
            </Link>
            <Link href="/kepengurusan" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Kabinet Kepengurusan Aktif
            </Link>
            <Link href="/layanan" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Layanan Siaga Medis & Pelatihan
            </Link>
            <Link href="/gabung" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Pendaftaran Relawan Baru
            </Link>
          </div>

          {/* Kontak & Sekretariat */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold tracking-wider text-[var(--fg)] uppercase">
              Sekretariat
            </span>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {config.address.street}, {config.address.city}, {config.address.region} {config.address.postalCode}
            </p>
            <a
              href={`mailto:${config.contact.email}`}
              className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              Email: {config.contact.email}
            </a>
            <a
              href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}`}
              className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              WhatsApp: {config.contact.whatsapp}
            </a>
          </div>

          {/* Media Sosial */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold tracking-wider text-[var(--fg)] uppercase">
              Media Sosial
            </span>
            {config.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[var(--muted)] hover:text-[var(--accent)] flex items-center gap-1.5 transition-colors"
              >
                <span className="capitalize font-medium">{s.platform}</span>: {s.handle}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-soft)] pt-6 text-center text-sm text-[var(--meta)] sm:flex-row">
          <p>© {new Date().getFullYear()} KSR PMI Unit Universitas Telkom. Hak cipta dilindungi.</p>
          {isDummy && (
            <p className="font-mono text-sm text-[var(--warn)]">
              Konten contoh — situs dalam pengembangan
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
