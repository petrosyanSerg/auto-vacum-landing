import type { Dictionary } from '@/content/translations/types';
import { hy } from '@/content/translations/hy';
import { ru } from '@/content/translations/ru';
import { en } from '@/content/translations/en';
import { kk } from '@/content/translations/kk';
import { ka } from '@/content/translations/ka';
import type { Locale } from './config';

/**
 * Dictionaries are plain modules imported at build time, never fetched at
 * runtime. Pages are Server Components, so no translation payload reaches the
 * browser beyond the individual strings a client component is handed as props.
 */
const dictionaries: Record<Locale, Dictionary> = { hy, ru, en, kk, ka };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
