import type { Metadata } from 'next';

import { resolveLocaleMeta, resolveLocalePage, type LocaleParams } from '@/lib/i18n/page';
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

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const resolved = await resolveLocaleMeta(params);
  if (!resolved) return {};
  const { locale, dict } = resolved;

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
export default async function FaqPage({ params }: { params: LocaleParams }) {
  const { locale, dict } = await resolveLocalePage(params);

  const allQuestions = [
    ...dict.faq.items,
    ...serviceSlugs.flatMap((slug) => dict.services[slug].faq),
  ];

  const trail = [
    { name: dict.nav.home, path: routePath.home },
    { name: dict.faq.h1, path: routePath.faq },
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        trail={trail}
        title={dict.faq.h1}
        lead={dict.faq.pageLead}
      >
        <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} />
      </PageHeader>

      <Faq dict={dict} items={allQuestions} />
      <Location locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />

      <JsonLd
        data={[
          webPageSchema({
            locale,
            path: routePath.faq,
            name: dict.faq.h1,
            description: dict.faq.metaDescription,
          }),
          faqSchema(allQuestions),
          breadcrumbSchema(locale, trail),
        ]}
      />
    </>
  );
}
