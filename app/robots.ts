import type { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/content';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();
  const isDummy = config.contentStatus === 'dummy';

  if (isDummy) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${config.url}/sitemap.xml`,
  };
}
