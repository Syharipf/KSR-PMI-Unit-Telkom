import type { Anggota } from '@/lib/content/schema';
import { PhotoTrigger } from '@/components/media/Lightbox';

interface MemberCardProps {
  member: Anggota;
  role?: string;
  featured?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Nomor urut kartu, tampil sebagai angka latar bergaya arsip. */
  index?: number;
}

/**
 * Kartu pengurus: potret persegi menempel di tepi kiri kartu, identitas
 * di kanan, dan nomor urut besar sebagai latar. Potret dibuat cukup besar
 * agar wajah terbaca, tanpa memenuhi seluruh kartu.
 */
export function MemberCard({
  member,
  role,
  featured = false,
  sizes = '(max-width: 640px) 100vw, 320px',
  priority = false,
  index,
}: MemberCardProps) {
  return (
    <article className={`cabinet-card ${featured ? 'cabinet-card--featured' : ''}`}>
      <div className="cabinet-media">
        {member.foto ? (
          <PhotoTrigger photo={member.foto} sizes={sizes} priority={priority} />
        ) : (
          <span
            aria-hidden="true"
            className="font-display flex h-full w-full items-center justify-center bg-[var(--surface-warm)] text-2xl font-extrabold text-[var(--muted)]"
          >
            {member.nama.slice(0, 1)}
          </span>
        )}
      </div>

      <div className="cabinet-body">
        {index !== undefined && (
          <span aria-hidden="true" className="cabinet-index">
            {String(index).padStart(2, '0')}
          </span>
        )}
        <span className="cabinet-role">{role ?? member.jabatan}</span>
        <h3 className="cabinet-name">{member.nama}</h3>
        <p className="cabinet-meta">
          {[member.programStudi, member.angkatan].filter(Boolean).join(' · ')}
        </p>
      </div>
    </article>
  );
}
