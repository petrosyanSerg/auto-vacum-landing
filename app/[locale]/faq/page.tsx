import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { routePath } from '@/lib/i18n/routes';
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo/jsonld';
import { serviceSlugs } from '@/content/services';

import { JsonLd } from '@/components/seo/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { CallButton } from '@/components/ui/CallButton';
import { Faq } from '@/components/sections/Faq';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    path: routePath.faq,
    title: dict.faq.metaTitle,
    description: dict.faq.metaDescription,
  });
}

/**
 * The general questions plus every service-specific one, in a single answerable
 * document. This is the page most likely to be quoted by an answer engine, so
 * each answer is written to stand alone out of context.
 */
export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  const allQuestions = [
    ...dict.faq.items,
    ...serviceSlugs.flatMap((slug) => dict.services[slug].faq),
  ];

  return (
    <>
      <PageHeader
        locale={typedLocale}
        dict={dict}
        trail={[{ name: dict.nav.home, path: routePath.home }]}
        title={dict.faq.h1}
        lead={dict.faq.pageLead}
      >
        <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} />
      </PageHeader>

      <Faq dict={dict} items={allQuestions} />
      <Location locale={typedLocale} dict={dict} />
      <FinalCta locale={typedLocale} dict={dict} />

      <JsonLd
        data={[
          webPageSchema({
            locale: typedLocale,
            path: routePath.faq,
            name: dict.faq.h1,
            description: dict.faq.metaDescription,
          }),
          faqSchema(allQuestions),
          breadcrumbSchema(typedLocale, [
            { name: dict.nav.home, path: routePath.home },
            { name: dict.faq.h1, path: routePath.faq },
          ]),
        ]}
      />
    </>
  );
}
