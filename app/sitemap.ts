import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { absoluteUrl, allPaths, languageAlternates, routePath } from '@/lib/i18n/routes';

/**
 * One entry per document per locale, each carrying the full hreflang set. Built
 * from the same route registry the navigation uses, so a page cannot ship
 * without appearing here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === routePath.home ? 1 : path === routePath.works ? 0.8 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
