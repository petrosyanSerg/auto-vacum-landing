import { serviceSlugs } from '@/content/services';
import { locales, localePath, type Locale } from './config';
import { SITE_URL } from '@/config/business';

/**
 * One registry of every page on the site. Navigation, hreflang, the sitemap and
 * breadcrumbs all read from here, so a new page cannot appear in the menu while
 * being missing from the sitemap.
 *
 * Path segments stay in Latin script across all five locales. Localised slugs
 * would fragment the same document across five URL shapes for no measurable
 * gain, and they break every link a customer pastes into a chat.
 */
export type RouteKey =
  | 'home'
  | 'services'
  | 'service'
  | 'works'
  | 'faq'
  | 'contact';

/** Site-relative path for the default locale, without a leading slash. */
export const routePath: Record<Exclude<RouteKey, 'service'>, string> = {
  home: '/',
  services: '/services',
  works: '/works',
  faq: '/faq',
  contact: '/contact',
};

export const servicePath = (slug: string) => `/services/${slug}`;

/** Every canonical path on the site, in sitemap order. */
export const allPaths: string[] = [
  routePath.home,
  routePath.services,
  ...serviceSlugs.map(servicePath),
  routePath.works,
  routePath.faq,
  routePath.contact,
];

export function absoluteUrl(locale: Locale, path = '/'): string {
  const rel = localePath(locale, path);
  return `${SITE_URL}${rel === '/' ? '' : rel}`;
}

/**
 * hreflang map for one document. Search engines need every alternate plus an
 * x-default; the default locale doubles as x-default because it is the version
 * served on the bare domain.
 */
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of locales) map[locale] = absoluteUrl(locale, path);
  map['x-default'] = absoluteUrl('hy', path);
  return map;
}

/** Main navigation, in header order. */
export const primaryNav = [
  { key: 'services', href: routePath.services },
  { key: 'works', href: routePath.works },
  { key: 'faq', href: routePath.faq },
  { key: 'contact', href: routePath.contact },
] as const;
