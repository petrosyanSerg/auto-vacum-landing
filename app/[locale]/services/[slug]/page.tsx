import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { isLocale, locales, localePath, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { routePath, servicePath } from '@/lib/i18n/routes';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/jsonld';
import { isServiceSlug, serviceImage, serviceSlugs } from '@/content/services';
import { works } from '@/content/works';
import { ADDRESS } from '@/config/business';

import { JsonLd } from '@/components/seo/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { CallButton } from '@/components/ui/CallButton';
import { ButtonLink } from '@/components/ui/Button';
import { Section, sectionStyles } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WorksGrid } from '@/components/gallery/WorksGrid';
import { Faq } from '@/components/sections/Faq';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';
import styles from './page.module.scss';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) return {};
  const service = getDictionary(locale).services[slug];

  return buildMetadata({
    locale,
    path: servicePath(slug),
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

/**
 * One page per service, each with its own H1, copy, suitability list, honest
 * limits, examples, FAQ and structured data. Nothing is shared between them
 * except the layout, so none of them competes with another in search.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const service = dict.services[slug];

  const examples = works.slice(0, 4);
  const others = serviceSlugs.filter((s) => s !== slug);

  return (
    <>
      <PageHeader
        locale={typedLocale}
        dict={dict}
        trail={[
          { name: dict.nav.home, path: routePath.home },
          { name: dict.servicesSection.h1, path: routePath.services },
        ]}
        title={service.h1}
        lead={service.summary}
      >
        <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} />
      </PageHeader>

      <Section label={service.h1} innerClassName={styles.split}>
        <div className={styles.prose}>
          {service.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <aside className={styles.sidebar}>
          <figure className={styles.figure}>
            <Image
              src={`/images/works/${serviceImage[slug]}.webp`}
              alt={dict.works.items[serviceImage[slug]]?.title ?? service.name}
              width={1000}
              height={1250}
              sizes="(min-width: 960px) 32vw, 92vw"
              quality={80}
            />
          </figure>

          <div>
            <p className={styles.blockTitle}>{dict.servicesSection.label}</p>
            <ul className={styles.suited}>
              {service.suitedFor.map((line) => (
                <li key={line} className={styles.suitedItem}>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <p className={styles.limits}>{service.limits}</p>

          <div className={styles.actions}>
            <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} block />
            <ButtonLink href={localePath(typedLocale, routePath.contact)} variant="outline" block>
              {dict.contact.formTitle}
            </ButtonLink>
            <p className={styles.blockTitle}>
              {ADDRESS.streetAddress[typedLocale]}, {ADDRESS.addressLocality[typedLocale]}
            </p>
          </div>
        </aside>
      </Section>

      <Section labelledBy="service-works">
        <SectionHeading
          label={dict.works.label}
          title={dict.works.title}
          lead={dict.works.lead}
          id="service-works"
          wide
        />
        <WorksGrid items={examples} dict={dict} />
        <div className={sectionStyles.foot}>
          <ButtonLink href={localePath(typedLocale, routePath.works)} variant="outline">
            {dict.works.allCta}
          </ButtonLink>
        </div>
      </Section>

      <Faq dict={dict} items={[...service.faq, ...dict.faq.items.slice(0, 4)]} />

      <Section labelledBy="related-services">
        <SectionHeading
          label={dict.servicesSection.label}
          title={dict.servicesSection.title}
          id="related-services"
        />
        <div className={styles.relatedList}>
          {others.map((other) => (
            <ButtonLink
              key={other}
              href={localePath(typedLocale, servicePath(other))}
              variant="outline"
            >
              {dict.services[other].name}
            </ButtonLink>
          ))}
        </div>
      </Section>

      <Location locale={typedLocale} dict={dict} />
      <FinalCta locale={typedLocale} dict={dict} />

      <JsonLd
        data={[
          serviceSchema(typedLocale, slug),
          faqSchema(service.faq),
          breadcrumbSchema(typedLocale, [
            { name: dict.nav.home, path: routePath.home },
            { name: dict.servicesSection.h1, path: routePath.services },
            { name: service.name, path: servicePath(slug) },
          ]),
        ]}
      />
    </>
  );
}
