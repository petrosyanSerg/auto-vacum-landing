export const locales = ['hy', 'ru', 'en', 'kk', 'ka'] as const;
export type Locale = (typeof locales)[number];

/** Armenian is the default and is served without a URL prefix. */
export const defaultLocale: Locale = 'hy';

export const localeMeta: Record<
  Locale,
  { label: string; englishLabel: string; htmlLang: string; ogLocale: string; dir: 'ltr' }
> = {
  hy: { label: 'Հայերեն', englishLabel: 'Armenian', htmlLang: 'hy-AM', ogLocale: 'hy_AM', dir: 'ltr' },
  ru: { label: 'Русский', englishLabel: 'Russian', htmlLang: 'ru-RU', ogLocale: 'ru_RU', dir: 'ltr' },
  en: { label: 'English', englishLabel: 'English', htmlLang: 'en', ogLocale: 'en_US', dir: 'ltr' },
  kk: { label: 'Қазақша', englishLabel: 'Kazakh', htmlLang: 'kk-KZ', ogLocale: 'kk_KZ', dir: 'ltr' },
  ka: { label: 'ქართული', englishLabel: 'Georgian', htmlLang: 'ka-GE', ogLocale: 'ka_GE', dir: 'ltr' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Build a site-relative path for a locale.
 * The default locale is prefix-free (`/works`), others are prefixed (`/ru/works`).
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return locale === defaultLocale ? clean || '/' : `/${locale}${clean}`;
}
