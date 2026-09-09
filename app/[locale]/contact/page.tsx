import type { Metadata } from 'next';

import { resolveLocaleMeta, resolveLocalePage, type LocaleParams } from '@/lib/i18n/page';
import { buildMetadata } from '@/lib/seo/metadata';
import { routePath } from '@/lib/i18n/routes';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/jsonld';
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
    path: routePath.contact,
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
  });
}

export default async function ContactPage({ params }: { params: LocaleParams }) {
  const { locale, dict } = await resolveLocalePage(params);

  // The form is live only when an inbox has actually been configured.
  const formEnabled = Boolean(LEAD_ENDPOINT);

  const trail = [
    { name: dict.nav.home, path: routePath.home },
    { name: dict.contact.h1, path: routePath.contact },
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        trail={trail}
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
              {ADDRESS.streetAddress[locale]}
              <br />
              {ADDRESS.addressLocality[locale]}, {ADDRESS.addressRegion[locale]}
              <br />
              {dict.common.hoursUnknown}
            </address>
          </div>

          <div className={styles.links}>
            <ButtonLink href={MAPS.yandexDirections} variant="outline" track="directions_click">
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
          <PhotoAssessment copy={dict.contact} enabled={formEnabled} />
        </div>
      </Section>

      <Location locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />

      <JsonLd
        data={[
          webPageSchema({
            locale,
            path: routePath.contact,
            name: dict.contact.h1,
            description: dict.contact.metaDescription,
            type: 'ContactPage',
          }),
          breadcrumbSchema(locale, trail),
        ]}
      />
    </>
  );
}
