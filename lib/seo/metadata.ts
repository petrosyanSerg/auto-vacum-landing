import type { Metadata } from 'next';
import { localeMeta, locales, type Locale } from '@/lib/i18n/config';
import { absoluteUrl, languageAlternates } from '@/lib/i18n/routes';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SITE_URL, VERIFICATION } from '@/config/business';

/** Static preview card, built by scripts/generate-brand-assets.mjs. */
const OG_IMAGE = '/og-default.jpg';

interface PageMetaInput {
  locale: Locale;
  /** Canonical path for the default locale, e.g. `/services/pdr`. */
  path: string;
  title: string;
  description: string;
}

/**
 * Every page builds its metadata here, so canonical URLs, hreflang and Open
 * Graph can never drift apart. `title` is the page-specific part; the layout
 * template appends the business name.
 */
export function buildMetadata({ locale, path, title, description }: PageMetaInput): Metadata {
  const dict = getDictionary(locale);
  const url = absoluteUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: 'website',
      siteName: dict.meta.siteName,
      title,
      description,
      url,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: dict.meta.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

/** Root metadata shared by every page under a locale. */
export function buildRootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${dict.meta.siteName} — ${dict.hero.h1}`,
      template: `%s — ${dict.meta.titleSuffix}`,
    },
    description: dict.meta.defaultDescription,
    applicationName: dict.meta.siteName,
    openGraph: {
      type: 'website',
      siteName: dict.meta.siteName,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: dict.meta.ogImageAlt }],
    },
    twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    formatDetection: { telephone: true },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    },
    // Only emitted once a real verification value is supplied via the environment.
    verification: {
      ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
      ...(VERIFICATION.yandex ? { yandex: VERIFICATION.yandex } : {}),
      ...(VERIFICATION.bing ? { other: { 'msvalidate.01': VERIFICATION.bing } } : {}),
    },
  };
}
