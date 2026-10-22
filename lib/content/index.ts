import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import {
  SiteConfigSchema,
  KabinetSchema,
  DivisiPageSchema,
  ProgramSchema,
  KegiatanSchema,
  AlbumSchema,
  PrestasiSchema,
  LayananSchema,
  FaqSchema,
  TentangPageSchema,
  type SiteConfig,
  type Kabinet,
  type DivisiPage,
  type Program,
  type Kegiatan,
  type Album,
  type Prestasi,
  type Layanan,
  type Faq,
  type TentangPage,
} from './schema';

export class ContentValidationError extends Error {
  constructor(
    public file: string,
    public issues: string[],
  ) {
    super(`Validation failed for ${file}:\n${issues.join('\n')}`);
    this.name = 'ContentValidationError';
  }
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readJsonFile<T>(relativePath: string): T {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new ContentValidationError(relativePath, ['File not found']);
  }
  const raw = fs.readFileSync(fullPath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new ContentValidationError(relativePath, [
      `JSON parse error: ${err instanceof Error ? err.message : String(err)}`,
    ]);
  }
}

function parseMdxFile<T>(relativePath: string): { frontmatter: T; body: string } {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new ContentValidationError(relativePath, ['File not found']);
  }
  const raw = fs.readFileSync(fullPath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match || !match[1] || match[2] === undefined) {
    throw new ContentValidationError(relativePath, ['Invalid MDX frontmatter delimiters']);
  }

  const yamlText = match[1];
  const body = match[2].trim();
  const frontmatterObj: Record<string, unknown> = {};

  const lines = yamlText.split('\n');
  let currentKey: string | null = null;
  let currentObj: Record<string, unknown> | null = null;
  let currentList: unknown[] | null = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const indent = line.search(/\S/);

    if (indent === 0) {
      // Top level key
      currentObj = null;
      currentList = null;

      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) continue;

      currentKey = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();

      if (!val) {
        // Will be populated by indented lines
      } else if (val === '[]') {
        frontmatterObj[currentKey] = [];
      } else if (val === '{}') {
        frontmatterObj[currentKey] = {};
      } else {
        let parsedVal: unknown = val.replace(/^["']|["']$/g, '');
        if (parsedVal === 'true') parsedVal = true;
        else if (parsedVal === 'false') parsedVal = false;
        else if (/^\d+$/.test(parsedVal as string)) parsedVal = Number(parsedVal);
        frontmatterObj[currentKey] = parsedVal;
      }
    } else if (indent > 0 && currentKey) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        // List item
        if (!currentList) {
          currentList = [];
          frontmatterObj[currentKey] = currentList;
        }
        currentList.push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ''));
      } else {
        // Sub-object property
        if (!currentObj) {
          currentObj = {};
          frontmatterObj[currentKey] = currentObj;
        }
        const subColon = trimmed.indexOf(':');
        if (subColon !== -1) {
          const subKey = trimmed.slice(0, subColon).trim();
          let subVal: unknown = trimmed.slice(subColon + 1).trim().replace(/^["']|["']$/g, '');
          if (subVal === 'true') subVal = true;
          else if (subVal === 'false') subVal = false;
          else if (/^\d+$/.test(subVal as string)) subVal = Number(subVal);
          currentObj[subKey] = subVal;
        }
      }
    }
  }

  return { frontmatter: frontmatterObj as T, body };
}

export function getSiteConfig(): SiteConfig {
  const data = readJsonFile('site.json');
  const parsed = SiteConfigSchema.safeParse(data);
  if (!parsed.success) {
    throw new ContentValidationError(
      'content/site.json',
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return parsed.data;
}

export function getTentangPage(
  slug:
    | 'sejarah'
    | 'visi-misi'
    | 'prinsip'
    | 'lambang'
    | 'lambang-penggunaan'
    | 'lambang-penyalahgunaan'
    | 'lambang-ruu'
    | 'lambang-penerapan'
    | 'struktur',
): { frontmatter: TentangPage; body: string } {
  const { frontmatter, body } = parseMdxFile(`tentang/${slug}.mdx`);
  const parsed = TentangPageSchema.safeParse(frontmatter);
  if (!parsed.success) {
    throw new ContentValidationError(
      `content/tentang/${slug}.mdx`,
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return { frontmatter: parsed.data, body };
}

export function getKegiatanList(): Kegiatan[] {
  const dir = path.join(CONTENT_DIR, 'kegiatan');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  const list: Kegiatan[] = [];

  for (const f of files) {
    const { frontmatter } = parseMdxFile(`kegiatan/${f}`);
    const parsed = KegiatanSchema.safeParse(frontmatter);
    if (!parsed.success) {
      throw new ContentValidationError(
        `content/kegiatan/${f}`,
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
      );
    }
    if (parsed.data.terbit) {
      list.push(parsed.data);
    }
  }

  return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getKegiatan(slug: string): Kegiatan {
  const list = getKegiatanList();
  const item = list.find((k) => k.slug === slug);
  if (!item) {
    throw new ContentValidationError(`content/kegiatan/${slug}.mdx`, [
      `Kegiatan not found for slug: ${slug}`,
    ]);
  }
  return item;
}

export function getProgramList(): Program[] {
  const dir = path.join(CONTENT_DIR, 'program');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  const list: Program[] = [];

  for (const f of files) {
    const { frontmatter } = parseMdxFile(`program/${f}`);
    const parsed = ProgramSchema.safeParse(frontmatter);
    if (!parsed.success) {
      throw new ContentValidationError(
        `content/program/${f}`,
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
      );
    }
    list.push(parsed.data);
  }

  return list;
}

export function getDivisiList(): DivisiPage[] {
  const dir = path.join(CONTENT_DIR, 'divisi');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  const list: DivisiPage[] = [];

  for (const f of files) {
    const { frontmatter } = parseMdxFile(`divisi/${f}`);
    const parsed = DivisiPageSchema.safeParse(frontmatter);
    if (!parsed.success) {
      throw new ContentValidationError(
        `content/divisi/${f}`,
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
      );
    }
    list.push(parsed.data);
  }

  return list.sort((a, b) => a.urutan - b.urutan);
}

export function getDivisi(slug: string): DivisiPage {
  const list = getDivisiList();
  const item = list.find((d) => d.slug === slug);
  if (!item) {
    throw new ContentValidationError(`content/divisi/${slug}.mdx`, [
      `Divisi not found for slug: ${slug}`,
    ]);
  }
  return item;
}

export function getPeriodeList(): string[] {
  const dir = path.join(CONTENT_DIR, 'kepengurusan/periode');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))
    .sort()
    .reverse();
}

export function getKabinet(periode?: string): Kabinet {
  const targetPeriode = periode ?? getSiteConfig().period;
  const data = readJsonFile(`kepengurusan/periode/${targetPeriode}.json`);
  const parsed = KabinetSchema.safeParse(data);
  if (!parsed.success) {
    throw new ContentValidationError(
      `content/kepengurusan/periode/${targetPeriode}.json`,
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return parsed.data;
}

export function getAlbumList(): Album[] {
  const dir = path.join(CONTENT_DIR, 'galeri');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const list: Album[] = [];

  for (const f of files) {
    const data = readJsonFile(`galeri/${f}`);
    const parsed = AlbumSchema.safeParse(data);
    if (!parsed.success) {
      throw new ContentValidationError(
        `content/galeri/${f}`,
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
      );
    }
    list.push(parsed.data);
  }

  return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAlbum(slug: string): Album {
  const data = readJsonFile(`galeri/${slug}.json`);
  const parsed = AlbumSchema.safeParse(data);
  if (!parsed.success) {
    throw new ContentValidationError(
      `content/galeri/${slug}.json`,
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return parsed.data;
}

export function getPrestasiList(): Prestasi[] {
  const data = readJsonFile('prestasi.json');
  const parsed = PrestasiSchema.array().safeParse(data);
  if (!parsed.success) {
    throw new ContentValidationError(
      'content/prestasi.json',
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return parsed.data.sort((a, b) => Number(b.tahun) - Number(a.tahun));
}

export function getLayananList(): Layanan[] {
  const data = readJsonFile('layanan.json');
  const parsed = LayananSchema.array().safeParse(data);
  if (!parsed.success) {
    throw new ContentValidationError(
      'content/layanan.json',
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return parsed.data;
}

export function getFaqList(): Faq[] {
  const data = readJsonFile('faq.json');
  const parsed = FaqSchema.array().safeParse(data);
  if (!parsed.success) {
    throw new ContentValidationError(
      'content/faq.json',
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return parsed.data;
}
