import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { buildMetadata } from '@/lib/seo/metadata';
import { routePath } from '@/lib/i18n/routes';
import { breadcrumbSchema } from '@/lib/seo/jsonld';
import {
  ADDRESS,
  LEAD_ENDPOINT,
  MAPS,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  SOCIAL,
} from '@/config/business';

import { JsonLd } from '@/components/seo/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { InstagramIcon, PinIcon, YoutubeIcon } from '@/components/ui/Icons';
import { PhotoAssessment } from '@/components/forms/PhotoAssessment';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';
import styles from './page.module.scss';

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
    path: routePath.contact,
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  // The form is live only when an inbox has actually been configured.
  const formEnabled = Boolean(LEAD_ENDPOINT);

  return (
    <>
      <PageHeader
        locale={typedLocale}
        dict={dict}
        trail={[{ name: dict.nav.home, path: routePath.home }]}
        title={dict.contact.h1}
        lead={dict.contact.pageLead}
      />

      <Section labelledBy="contact-channels" innerClassName={styles.split}>
        <div className={styles.channels}>
          <h2 className={styles.blockTitle} id="contact-channels">
            {dict.contact.channelsTitle}
          </h2>

          <div className={styles.phoneRow}>
            <a
              href={PHONE_TEL_HREF}
              className={styles.phone}
              aria-label={dict.common.callAria}
              data-track="phone_click"
            >
              {PHONE_DISPLAY}
            </a>
            <address className={styles.address}>
              {ADDRESS.streetAddress[typedLocale]}
              <br />
              {ADDRESS.addressLocality[typedLocale]}, {ADDRESS.addressRegion[typedLocale]}
              <br />
              {dict.common.hoursUnknown}
            </address>
          </div>

          <div className={styles.links}>
            <ButtonLink href={MAPS.googleDirections} variant="outline" track="directions_click">
              <PinIcon size={17} />
              {dict.common.directions}
            </ButtonLink>
            <ButtonLink href={SOCIAL.instagram} variant="outline" track="instagram_click">
              <InstagramIcon size={17} />
              {dict.common.instagram}
            </ButtonLink>
            <ButtonLink href={SOCIAL.youtube} variant="outline" track="youtube_click">
              <YoutubeIcon size={17} />
              {dict.common.youtube}
            </ButtonLink>
          </div>
        </div>

        <div className={styles.formCol}>
          <h2 className={styles.formTitle}>{dict.contact.formTitle}</h2>
          <p className={styles.formLead}>{dict.contact.formLead}</p>
          <PhotoAssessment dict={dict} enabled={formEnabled} />
        </div>
      </Section>

      <Location locale={typedLocale} dict={dict} />
      <FinalCta locale={typedLocale} dict={dict} />

      <JsonLd
        data={breadcrumbSchema(typedLocale, [
          { name: dict.nav.home, path: routePath.home },
          { name: dict.contact.h1, path: routePath.contact },
        ])}
      />
    </>
  );
}
