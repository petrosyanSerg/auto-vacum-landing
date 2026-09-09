/**
 * SINGLE SOURCE OF TRUTH for every business fact rendered on the site.
 *
 * Rules for editing this file:
 *  - `verified` values come from the owner's own public listings (List.am) and
 *    the owner's own YouTube channel. Keep them in sync so NAP data stays
 *    consistent across the site, schema, and any business profile.
 *  - Values documented as UNVERIFIED are intentionally null/empty. They are not
 *    invented. Fill them only with real values; every consumer handles null.
 */

export const PHONE_DISPLAY = '099 22 95 90';
export const PHONE_E164 = '+37499229590';
export const PHONE_TEL_HREF = `tel:${PHONE_E164}`;

/** Street address, one canonical spelling per locale. Used for NAP + schema. */
export const ADDRESS = {
  streetAddress: {
    hy: 'Սևանի փ. 37/1, 8-րդ միկրոշրջան',
    ru: 'ул. Севани 37/1, 8-й микрорайон',
    en: '37/1 Sevan St., 8th microdistrict',
    kk: 'Севани к-сі 37/1, 8-шағын аудан',
    ka: 'სევანის ქ. 37/1, მე-8 მიკრორაიონი',
  },
  addressLocality: { hy: 'Աբովյան', ru: 'Абовян', en: 'Abovyan', kk: 'Абовян', ka: 'აბოვიანი' },
  addressRegion: {
    hy: 'Կոտայքի մարզ',
    ru: 'Котайкская область',
    en: 'Kotayk Province',
    kk: 'Котайк облысы',
    ka: 'კოტაიკის მხარე',
  },
  addressCountry: 'AM',
  /** UNVERIFIED — no postal code confirmed by a source. */
  postalCode: null as string | null,
} as const;

/**
 * UNVERIFIED — the business has published no coordinates.
 * Maps render from the address string instead, and `geo` is omitted from
 * JSON-LD while this is null. Set it only from a real, checked map pin.
 */
export const COORDINATES: { lat: number; lng: number } | null = null;

/**
 * UNVERIFIED — no opening hours published on any source.
 * While this is empty the site says "call to confirm" and emits no
 * openingHoursSpecification. Shape when you have real hours:
 *   [{ days: ['Mo','Tu','We','Th','Fr','Sa'], opens: '10:00', closes: '19:00' }]
 */
export const OPENING_HOURS: Array<{ days: string[]; opens: string; closes: string }> = [];

/** UNVERIFIED — no published price list. Never guess a price on this site. */
export const PRICE_RANGE: string | null = null;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/auto.vacuum_/',
  youtube: 'https://www.youtube.com/@sergeypetrosyan5608',
  youtubeChannelId: 'UCWwcIg4AITsxBZA_CxoLy-g',
  listam: 'https://www.list.am/item/23104616',
  listamSecondary: 'https://www.list.am/item/23099054',
} as const;

/** Map deep links built from the address only — no invented coordinates. */
const MAP_QUERY = 'Աբովյան, Սևանի 37/1, Հայաստան';
export const MAPS = {
  query: MAP_QUERY,
  googleDirections: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`,
  googleEmbed: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`,
  yandexPlace: `https://yandex.com/maps/?text=${encodeURIComponent(MAP_QUERY)}`,
  yandexEmbed: `https://yandex.com/map-widget/v1/?text=${encodeURIComponent(MAP_QUERY)}&z=16`,
  /** Route to the address; the start point is left empty so Yandex uses the visitor's own. */
  yandexDirections: `https://yandex.com/maps/?rtext=~${encodeURIComponent(MAP_QUERY)}&rtt=auto`,
} as const;

/** Which map provider the location section renders. Override with NEXT_PUBLIC_MAP_PROVIDER. */
export const MAP_PROVIDER = (process.env.NEXT_PUBLIC_MAP_PROVIDER ?? 'yandex') as 'google' | 'yandex';

/**
 * Public site origin. Drives canonical URLs, hreflang, sitemap and OG URLs.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment before going live.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://autovacuum.am').replace(/\/$/, '');

export const BRAND = {
  /** Trading name, taken from the business's own Instagram handle `auto.vacuum_`. */
  name: 'Auto Vacuum',
  descriptor: 'PDR',
  /** Verified from the owner's List.am seller profile and YouTube channel. */
  masterName: 'Sergey Petrosyan',
} as const;

/**
 * VERIFIED social proof only. List.am publishes a 5.0 seller rating built from a
 * single review, so it is shown as a linked source line rather than as an
 * aggregateRating in JSON-LD — one review is not a meaningful aggregate.
 */
export const LISTAM_RATING = { value: 5.0, count: 1, url: SOCIAL.listam } as const;

export const ANALYTICS = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? null,
  yandexMetrica: process.env.NEXT_PUBLIC_YANDEX_METRICA_ID ?? null,
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID ?? null,
} as const;

export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? null,
  yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? null,
  bing: process.env.NEXT_PUBLIC_BING_VERIFICATION ?? null,
} as const;

/** Where the photo-assessment form posts. Null = the form is disabled and says so. */
export const LEAD_ENDPOINT = process.env.LEAD_FORM_ENDPOINT ?? null;
