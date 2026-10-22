'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Kegiatan } from '@/lib/content/schema';

interface KegiatanFilterProps {
  initialKegiatan: Kegiatan[];
}

const CATEGORIES = [
  { label: 'Semua Kategori', value: 'all' },
  { label: 'Siaga Medis', value: 'siaga-medis' },
  { label: 'Donor Darah', value: 'donor-darah' },
  { label: 'Pendidikan', value: 'pendidikan' },
  { label: 'Bakti Sosial', value: 'bakti-sosial' },
] as const;

export function KegiatanFilter({ initialKegiatan }: KegiatanFilterProps) {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filtered =
    selectedCat === 'all'
      ? initialKegiatan
      : initialKegiatan.filter((k) => k.kategori === selectedCat);

  return (
    <div className="flex flex-col gap-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setSelectedCat(cat.value)}
            data-sound="whoosh"
            className={`rounded-[var(--radius-pill)] px-5 py-2.5 text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              selectedCat === cat.value
                ? 'bg-[var(--accent)] text-[var(--accent-on)] shadow-md'
                : 'bg-[var(--surface-warm)] text-[var(--fg-2)] border border-[var(--border)] hover:bg-[var(--border)]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((item) => (
          <article
            key={item.slug}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-xl"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-warm)]">
              <Image
                src={item.cover.src}
                alt={item.cover.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <span className="absolute top-3 left-3 rounded-[var(--radius-pill)] bg-[var(--accent)] px-3.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--accent-on)] uppercase shadow-sm">
                {item.kategori.replace('-', ' ')}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-6">
              <span className="font-mono text-sm font-medium text-[var(--meta)]">
                {new Intl.DateTimeFormat('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(new Date(item.date))}
              </span>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                <Link href={`/kegiatan/${item.slug}`}>{item.title}</Link>
              </h3>
              <p className="mt-3 line-clamp-3 text-base leading-relaxed text-[var(--fg-2)]">
                {item.ringkas}
              </p>
              <div className="mt-auto pt-5">
                <Link
                  href={`/kegiatan/${item.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:underline gap-1"
                >
                  Baca Dokumentasi Lengkap →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
