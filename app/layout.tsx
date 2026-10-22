import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';

import { getSiteConfig } from '@/lib/content';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SoundController } from '@/components/audio/SoundController';

export function generateMetadata(): Metadata {
  const config = getSiteConfig();
  const isDummy = config.contentStatus === 'dummy';

  return {
    metadataBase: new URL(config.url),
    title: {
      default: `${config.name} — Profil Resmi`,
      template: `%s — ${config.name}`,
    },
    description: config.description,
    robots: isDummy
      ? { index: false, follow: false }
      : { index: true, follow: true },
    icons: {
      icon: '/icon.png',
      apple: '/icon.png',
    },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: config.url,
      siteName: config.name,
      title: config.name,
      description: config.description,
      images: [
        {
          url: '/media/hero/ksr-hero-poster.svg',
          width: 1600,
          height: 900,
          alt: config.name,
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = getSiteConfig();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    alternateName: config.shortName,
    url: config.url,
    logo: `${config.url}/media/brand/icon-pmi.png`,
    foundingDate: config.foundedAt,
    parentOrganization: {
      '@type': 'Organization',
      name: config.affiliation,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.region,
      postalCode: config.address.postalCode,
      addressCountry: 'ID',
    },
    sameAs: config.socials.map((s) => s.url),
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="app-body flex flex-col bg-[var(--bg)] text-[var(--fg)] antialiased transition-colors">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <SoundController />
          <SiteHeader config={config} />
          <main className="flex-1">{children}</main>
          <SiteFooter config={config} />
        </ThemeProvider>
      </body>
    </html>
  );
}
