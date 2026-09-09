import type { MetadataRoute } from 'next';
import { BRAND } from '@/config/business';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { defaultLocale } from '@/lib/i18n/config';

export default function manifest(): MetadataRoute.Manifest {
  const dict = getDictionary(defaultLocale);

  return {
    name: `${BRAND.name} — ${dict.hero.h1}`,
    short_name: BRAND.name,
    description: dict.meta.defaultDescription,
    lang: defaultLocale,
    start_url: '/',
    display: 'standalone',
    background_color: '#07090b',
    theme_color: '#07090b',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
