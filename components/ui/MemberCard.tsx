import Image from 'next/image';
import type { Anggota } from '@/lib/content/schema';

interface MemberCardProps {
  member: Anggota;
  role?: string;
  featured?: boolean;
  sizes?: string;
  priority?: boolean;
}

/**
 * Kartu pengurus berpotret penuh (4:5) dengan nama di atas gradien.
 * Foto diperbesar saat hover, dan kartu terangkat untuk memberi kedalaman.
 */
export function MemberCard({
  member,
  role,
  featured = false,
  sizes = '(max-width: 640px) 100vw, 360px',
  priority = false,
}: MemberCardProps) {
  return (
    <article className={`cabinet-card ${featured ? 'cabinet-card--featured' : ''}`}>
      <div className="cabinet-media">
        {member.foto ? (
          <Image
            src={member.foto.src}
            alt={member.foto.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="cabinet-photo object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-[var(--surface-warm)] font-display text-5xl font-extrabold text-[var(--muted)]"
          >
            {member.nama.slice(0, 1)}
          </span>
        )}
      </div>

      <div className="cabinet-overlay">
        <span className="cabinet-role">{role ?? member.jabatan}</span>
        <h3 className="cabinet-name">{member.nama}</h3>
        <p className="cabinet-meta">
          {[member.programStudi, member.angkatan].filter(Boolean).join(' · ')}
        </p>
      </div>
    </article>
  );
}
