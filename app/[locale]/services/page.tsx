import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
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
    path: routePath.services,
    title: dict.servicesSection.metaTitle,
    description: dict.servicesSection.metaDescription,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
        title={dict.servicesSection.h1}
        lead={dict.servicesSection.pageLead}
      >
        <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} />
      </PageHeader>

      <Services locale={typedLocale} dict={dict} showAllLink={false} />
      <Damage dict={dict} />
      <Process dict={dict} />
      <FinalCta locale={typedLocale} dict={dict} />

      <JsonLd
        data={[
          webPageSchema({
            locale: typedLocale,
            path: routePath.services,
            name: dict.servicesSection.h1,
            description: dict.servicesSection.metaDescription,
            type: 'CollectionPage',
          }),
          breadcrumbSchema(typedLocale, [
            { name: dict.nav.home, path: routePath.home },
            { name: dict.servicesSection.h1, path: routePath.services },
          ]),
          ...serviceSlugs.map((slug) => serviceSchema(typedLocale, slug)),
        ]}
      />
    </>
  );
}
