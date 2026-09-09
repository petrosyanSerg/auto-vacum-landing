import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/business';

/**
 * Everything is indexable. The only disallow is the Next.js build output, which
 * has no reader value and only wastes crawl budget.
 *
 * Yandex gets an explicit block so a future `Host`/`Clean-param` directive has
 * somewhere to live without touching the shared rules.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/_next/'] },
      { userAgent: 'Yandex', allow: '/', disallow: ['/_next/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
