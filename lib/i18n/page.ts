import { notFound } from 'next/navigation';

import { isLocale, type Locale } from './config';
import { getDictionary, type Dictionary } from './dictionaries';

/**
 * The preamble every localised page shares.
 *
 * Route params arrive as plain strings, so each page has to prove the segment
 * is a locale before it can read a dictionary. Doing that here keeps the guard,
 * the 404 and the dictionary lookup in one place, and lets pages work with a
 * narrowed `Locale` instead of casting a string they have already checked.
 */
export type LocaleParams = Promise<{ locale: string }>;

export interface LocalePage {
  locale: Locale;
  dict: Dictionary;
}

/** For page components: an unknown locale is a 404. */
export async function resolveLocalePage(params: LocaleParams): Promise<LocalePage> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, dict: getDictionary(locale) };
}

/**
 * For `generateMetadata`: an unknown locale yields nothing rather than throwing,
 * because the page component is what owns the 404.
 */
export async function resolveLocaleMeta(params: LocaleParams): Promise<LocalePage | null> {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  return { locale, dict: getDictionary(locale) };
}
