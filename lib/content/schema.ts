import { z } from 'zod';

export const MediaSchema = z.object({
  src: z.string().startsWith('/media/'),
  alt: z.string().min(1),
  type: z.enum(['image', 'video']),
  poster: z.string().optional(),
  credit: z.string().optional(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const AddressSchema = z.object({
  label: z.string(),
  street: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  mapsUrl: z.string().url(),
  mapsEmbedUrl: z.string().url(),
});

export const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  whatsapp: z.string(),
});

export const SocialSchema = z.object({
  platform: z.enum(['instagram', 'tiktok', 'youtube', 'linkedin', 'x']),
  url: z.string().url(),
  handle: z.string(),
});

export const LinkGroupSchema = z.object({
  registration: z.string().url(),
  serviceRequest: z.string().url(),
  donation: z.string().url().optional(),
});

export const StatSchema = z.object({
  label: z.string(),
  value: z.number(),
  suffix: z.string().optional(),
});

export const NavItemSchema: z.ZodType<{
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
}> = z.lazy(() =>
  z.object({
    label: z.string(),
    href: z.string(),
    children: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .optional(),
  }),
);

export const SiteConfigSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  tagline: z.string(),
  description: z.string().min(80).max(200),
  url: z.string().url(),
  contentStatus: z.enum(['dummy', 'final']),
  foundedAt: z.string(),
  decree: z.string(),
  affiliation: z.string(),
  university: z.string(),
  period: z.string().regex(/^\d{4}-\d{4}$/),
  address: AddressSchema,
  contact: ContactSchema,
  socials: z.array(SocialSchema),
  links: LinkGroupSchema,
  stats: z.array(StatSchema),
  nav: z.array(NavItemSchema),
});

export const AnggotaSchema = z.object({
  nama: z.string(),
  jabatan: z.string(),
  foto: MediaSchema.optional(),
  programStudi: z.string().optional(),
  angkatan: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

export const DivisiRefSchema = z.object({
  slug: z.string(),
  nama: z.string(),
  anggota: z.array(AnggotaSchema),
});

export const KabinetSchema = z.object({
  periode: z.string().regex(/^\d{4}-\d{4}$/),
  motto: z.string(),
  komandan: AnggotaSchema.nullable(),
  wakil: z.array(AnggotaSchema).min(1),
  inti: z.array(AnggotaSchema),
  pengawas: z.array(AnggotaSchema).optional(),
  divisi: z.array(DivisiRefSchema),
  foto: MediaSchema.optional(),
});

export const DivisiPageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  singkat: z.string(),
  jobdesk: z.array(z.string()),
  programSlugs: z.array(z.string()),
  urutan: z.number(),
});

export const ProgramSchema = z.object({
  title: z.string(),
  slug: z.string(),
  divisi: z.string(),
  frekuensi: z.enum(['rutin', 'insidental']),
  jadwal: z.string(),
  status: z.enum(['aktif', 'selesai', 'rencana']),
  ringkas: z.string(),
  cover: MediaSchema.optional(),
});

export const KegiatanSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  kategori: z.enum([
    'pendidikan',
    'siaga-medis',
    'bakti-sosial',
    'donor-darah',
    'prestasi',
    'internal',
  ]),
  ringkas: z.string().max(300),
  cover: MediaSchema,
  galeri: z.array(MediaSchema).default([]),
  lokasi: z.string().optional(),
  mitra: z.array(z.string()).optional(),
  unggulan: z.boolean(),
  terbit: z.boolean(),
  tags: z.array(z.string()),
});

export const AlbumSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  cover: MediaSchema,
  items: z.array(MediaSchema),
});

export const PrestasiSchema = z.object({
  tahun: z.string().regex(/^\d{4}$/),
  nama: z.string(),
  peringkat: z.string(),
  tingkat: z.enum(['universitas', 'nasional', 'internasional']),
  penyelenggara: z.string(),
});

export const LayananSchema = z.object({
  slug: z.enum(['siaga-medis', 'donor-darah', 'pelatihan', 'kerja-sama', 'peminjaman-barang']),
  nama: z.string(),
  ringkas: z.string(),
  deskripsi: z.string(),
  syarat: z.array(z.string()),
  alur: z.array(z.string()),
  cta: z.object({
    label: z.string(),
    type: z.enum(['whatsapp', 'form']),
    href: z.string(),
  }),
  phone: z
    .object({
      label: z.string(),
      href: z.string(),
      contact: z.string().optional(),
    })
    .optional(),
  instagram: z
    .object({
      url: z.string().url(),
      label: z.string(),
    })
    .optional(),
  qr: z
    .object({
      src: z.string(),
      url: z.string().url(),
      label: z.string(),
      caption: z.string(),
    })
    .optional(),
  submission: z
    .object({
      lineId: z.string(),
      lineHref: z.string().url(),
      lineQr: z.string().optional(),
      whatsapp: z.string(),
      whatsappHref: z.string().url(),
      whatsappQr: z.string().optional(),
      contact: z.string().optional(),
      sopUrl: z.string().url().optional(),
      scheduleUrl: z.string().url().optional(),
      siagaLetterUrl: z.string().url().optional(),
      trainingLetterUrl: z.string().url().optional(),
      donorLetterUrl: z.string().url().optional(),
      formUrl: z.string().url().optional(),
      feedbackUrl: z.string().url().optional(),
    })
    .optional(),
  coverage: z
    .object({
      mapQuery: z.string(),
      radiusKm: z.number().positive().optional(),
      areas: z.array(z.string()),
    })
    .optional(),
  rental: z
    .object({
      catalog: z.array(
        z.object({
          group: z.string(),
          items: z.array(
            z.object({
              nama: z.string(),
              harga: z.string(),
            }),
          ),
        }),
      ),
      packages: z.array(
        z.object({
          nama: z.string(),
          isi: z.array(z.string()),
          harga: z.string(),
        }),
      ),
      priceListImages: z.array(
        z.object({
          src: z.string(),
          alt: z.string(),
          width: z.number(),
          height: z.number(),
        }),
      ),
    })
    .optional(),
  ikon: z.enum(['medical', 'blood', 'training', 'handshake', 'box']),
});

export const FaqSchema = z.object({
  pertanyaan: z.string(),
  jawaban: z.string(),
});

export const TentangPageSchema = z.object({
  title: z.string(),
  ringkas: z.string(),
  updatedAt: z.string(),
  sources: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      }),
    )
    .optional(),
});

export type Media = z.infer<typeof MediaSchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type Anggota = z.infer<typeof AnggotaSchema>;
export type DivisiRef = z.infer<typeof DivisiRefSchema>;
export type Kabinet = z.infer<typeof KabinetSchema>;
export type DivisiPage = z.infer<typeof DivisiPageSchema>;
export type Program = z.infer<typeof ProgramSchema>;
export type Kegiatan = z.infer<typeof KegiatanSchema>;
export type Album = z.infer<typeof AlbumSchema>;
export type Prestasi = z.infer<typeof PrestasiSchema>;
export type Layanan = z.infer<typeof LayananSchema>;
export type Faq = z.infer<typeof FaqSchema>;
export type TentangPage = z.infer<typeof TentangPageSchema>;
