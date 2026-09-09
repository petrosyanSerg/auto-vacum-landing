import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { routePath } from '@/lib/i18n/routes';
import { breadcrumbSchema, videoListSchema, webPageSchema, worksGallerySchema } from '@/lib/seo/jsonld';
import { works } from '@/content/works';

import { JsonLd } from '@/components/seo/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { CallButton } from '@/components/ui/CallButton';
import { WorksGrid } from '@/components/gallery/WorksGrid';
import { Videos } from '@/components/sections/Videos';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';

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
    path: routePath.works,
    title: dict.works.metaTitle,
    description: dict.works.metaDescription,
  });
}

export default async function WorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <PageHeader
        locale={typedLocale}
        dict={dict}
        trail={[{ name: dict.nav.home, path: routePath.home }]}
        title={dict.works.h1}
        lead={dict.works.pageLead}
      >
        <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} />
      </PageHeader>

      <Section label={dict.works.h1}>
        <WorksGrid items={works} dict={dict} filterable />
      </Section>

      <Videos dict={dict} />
      <Location locale={typedLocale} dict={dict} />
      <FinalCta locale={typedLocale} dict={dict} />

      <JsonLd
        data={[
          webPageSchema({
            locale: typedLocale,
            path: routePath.works,
            name: dict.works.h1,
            description: dict.works.metaDescription,
            type: 'CollectionPage',
            primaryImage: '/images/works/roof-panel-restored.webp',
          }),
          worksGallerySchema(typedLocale),
          breadcrumbSchema(typedLocale, [
            { name: dict.nav.home, path: routePath.home },
            { name: dict.works.h1, path: routePath.works },
          ]),
          videoListSchema(typedLocale),
        ]}
      />
    </>
  );
}
