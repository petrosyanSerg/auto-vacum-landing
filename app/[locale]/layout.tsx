import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Noto_Sans, Noto_Sans_Armenian, Noto_Sans_Georgian, JetBrains_Mono } from 'next/font/google';

import '@/styles/globals.scss';

import { isLocale, locales, localeMeta, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { buildRootMetadata } from '@/lib/seo/metadata';
import { localBusinessSchema, websiteSchema } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { Analytics } from '@/components/seo/Analytics';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { SiteBehaviour } from '@/components/layout/SiteBehaviour';

/**
 * Four cuts of one type system. Variable weights keep it to a single file per
 * script, and each family declares only the subsets it is actually needed for,
 * so a Russian visitor never downloads Georgian glyphs.
 */
const notoSans = Noto_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-noto-sans',
  display: 'swap',
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ['armenian'],
  variable: '--font-noto-armenian',
  display: 'swap',
});

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  variable: '--font-noto-georgian',
  display: 'swap',
  preload: false,
});

/** The technical layer: counters, codes, the phone number, micro-labels. */
const monoTech = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono-tech',
  display: 'swap',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#07090b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildRootMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const meta = localeMeta[typedLocale];

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${notoSans.variable} ${notoSansArmenian.variable} ${notoSansGeorgian.variable} ${monoTech.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          {dict.nav.skipToContent}
        </a>

        <Header locale={typedLocale} dict={dict} />

        <main id="main">{children}</main>

        <Footer locale={typedLocale} dict={dict} />
        <MobileActionBar dict={dict} />

        <SiteBehaviour />
        <Analytics />

        <JsonLd data={[localBusinessSchema(typedLocale), websiteSchema(typedLocale)]} />
      </body>
    </html>
  );
}
