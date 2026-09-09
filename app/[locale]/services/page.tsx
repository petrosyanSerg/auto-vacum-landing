import type { Metadata } from 'next';

import { resolveLocaleMeta, resolveLocalePage, type LocaleParams } from '@/lib/i18n/page';
import { buildMetadata } from '@/lib/seo/metadata';
import { routePath } from '@/lib/i18n/routes';
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo/jsonld';
import { serviceSlugs } from '@/content/services';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { CallButton } from '@/components/ui/CallButton';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Damage } from '@/components/sections/Damage';
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
    path: routePath.services,
    title: dict.servicesSection.metaTitle,
    description: dict.servicesSection.metaDescription,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: LocaleParams;
}) {
  const { locale, dict } = await resolveLocalePage(params);

  const trail = [
    { name: dict.nav.home, path: routePath.home },
    { name: dict.servicesSection.h1, path: routePath.services },
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        trail={trail}
        title={dict.servicesSection.h1}
        lead={dict.servicesSection.pageLead}
      >
        <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} />
      </PageHeader>

      <Services locale={locale} dict={dict} showAllLink={false} />
      <Damage dict={dict} />
      <Process dict={dict} />
      <FinalCta locale={locale} dict={dict} />

      <JsonLd
        data={[
          webPageSchema({
            locale,
            path: routePath.services,
            name: dict.servicesSection.h1,
            description: dict.servicesSection.metaDescription,
            type: 'CollectionPage',
          }),
          breadcrumbSchema(locale, trail),
          ...serviceSlugs.map((slug) => serviceSchema(locale, slug)),
        ]}
      />
    </>
  );
}
