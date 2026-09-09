import type { Metadata } from 'next';

import { resolveLocaleMeta, resolveLocalePage, type LocaleParams } from '@/lib/i18n/page';
import { buildMetadata } from '@/lib/seo/metadata';
import { routePath } from '@/lib/i18n/routes';
import { breadcrumbSchema, videoListSchema, webPageSchema, worksGallerySchema } from '@/lib/seo/jsonld';
import { works } from '@/content/works';

import { JsonLd } from '@/components/seo/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { CallButton } from '@/components/ui/CallButton';
import { WorksGrid } from '@/components/gallery/WorksGrid';
import { worksGridCopy } from '@/components/gallery/WorksGrid.copy';
import { Videos } from '@/components/sections/Videos';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';

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
    path: routePath.works,
    title: dict.works.metaTitle,
    description: dict.works.metaDescription,
  });
}

export default async function WorksPage({ params }: { params: LocaleParams }) {
  const { locale, dict } = await resolveLocalePage(params);

  const trail = [
    { name: dict.nav.home, path: routePath.home },
    { name: dict.works.h1, path: routePath.works },
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        trail={trail}
        title={dict.works.h1}
        lead={dict.works.pageLead}
      >
        <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} />
      </PageHeader>

      <Section label={dict.works.h1}>
        <WorksGrid items={works} copy={worksGridCopy(dict, works)} filterable />
      </Section>

      <Videos dict={dict} />
      <Location locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />

      <JsonLd
        data={[
          webPageSchema({
            locale,
            path: routePath.works,
            name: dict.works.h1,
            description: dict.works.metaDescription,
            type: 'CollectionPage',
            primaryImage: '/images/works/roof-panel-restored.webp',
          }),
          worksGallerySchema(locale),
          breadcrumbSchema(locale, trail),
          videoListSchema(locale),
        ]}
      />
    </>
  );
}
