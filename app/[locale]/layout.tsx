import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Noto_Sans_Armenian, Noto_Sans_Georgian, JetBrains_Mono } from 'next/font/google';

import '@/styles/globals.scss';

import { locales, localeMeta } from '@/lib/i18n/config';
import { resolveLocaleMeta, resolveLocalePage, type LocaleParams } from '@/lib/i18n/page';
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
  params: LocaleParams;
}): Promise<Metadata> {
  const resolved = await resolveLocaleMeta(params);
  if (!resolved) return {};
  return buildRootMetadata(resolved.locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const { locale, dict } = await resolveLocalePage(params);
  const meta = localeMeta[locale];

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

        <Header locale={locale} dict={dict} />

        <main id="main">{children}</main>

        <Footer locale={locale} dict={dict} />
        <MobileActionBar dict={dict} />

        <SiteBehaviour />
        <Analytics />

        <JsonLd data={[localBusinessSchema(locale), websiteSchema(locale)]} />
      </body>
    </html>
  );
}
