import type { MetadataRoute } from 'next';
import { getSiteConfig, getKegiatanList, getDivisiList, getAlbumList, getPeriodeList } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSiteConfig();
  const baseUrl = config.url;

  const staticRoutes = [
    '',
    '/tentang/sejarah',
    '/tentang/visi-misi',
    '/tentang/prinsip',
    '/tentang/lambang',
    '/tentang/lambang/penggunaan',
    '/tentang/lambang/penyalahgunaan',
    '/tentang/lambang/ruu',
    '/tentang/lambang/penerapan',
    '/tentang/struktur',
    '/kepengurusan',
    '/kepengurusan/arsip',
    '/program',
    '/kegiatan',
    '/prestasi',
    '/galeri',
    '/layanan',
    '/gabung',
    '/kontak',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const kegiatanRoutes = getKegiatanList().map((k) => ({
    url: `${baseUrl}/kegiatan/${k.slug}/`,
    lastModified: new Date(k.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const divisiRoutes = getDivisiList().map((d) => ({
    url: `${baseUrl}/kepengurusan/divisi/${d.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const albumRoutes = getAlbumList().map((a) => ({
    url: `${baseUrl}/galeri/${a.slug}/`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const arsipRoutes = getPeriodeList().map((p) => ({
    url: `${baseUrl}/kepengurusan/arsip/${p}/`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...kegiatanRoutes, ...divisiRoutes, ...albumRoutes, ...arsipRoutes];
}
