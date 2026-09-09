import {
  ADDRESS,
  MAP_PROVIDER,
  MAPS,
  OPENING_HOURS,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
} from '@/config/business';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { PinIcon } from '@/components/ui/Icons';
import { LocationMap } from '@/components/map/LocationMap';
import styles from './Location.module.scss';

/**
 * Address, phone and directions in one block, with the map loaded on request.
 * Opening hours appear only when real ones are configured; until then the
 * honest line is "call to confirm".
 */
export function Location({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const providerName =
    MAP_PROVIDER === 'yandex' ? dict.location.provider.yandex : dict.location.provider.google;

  const hours = OPENING_HOURS.length
    ? OPENING_HOURS.map((h) => `${h.days.join(', ')} ${h.opens}–${h.closes}`).join(' · ')
    : dict.common.hoursUnknown;

  return (
    <Section id="location" labelledBy="location-title" raised innerClassName={styles.split}>
      <div className={styles.details}>
        <SectionHeading
          label={dict.location.label}
          title={dict.location.title}
          lead={dict.location.lead}
          id="location-title"
        />

        <address className={styles.address}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{dict.common.address}</span>
            <span className={styles.rowValue}>
              {ADDRESS.streetAddress[locale]}
              <br />
              {ADDRESS.addressLocality[locale]}, {ADDRESS.addressRegion[locale]}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.rowLabel}>{dict.common.phoneLabel}</span>
            <a
              href={PHONE_TEL_HREF}
              className={styles.phone}
              aria-label={dict.common.callAria}
              data-track="phone_click"
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className={styles.row}>
            <span className={styles.rowLabel}>{dict.common.openingHours}</span>
            <span className={styles.hours}>{hours}</span>
          </div>
        </address>

        <div className={styles.actions}>
          <ButtonLink href={MAPS.googleDirections} variant="solid" track="directions_click">
            <PinIcon size={18} />
            {dict.common.directions}
          </ButtonLink>
          <ButtonLink href={MAPS.yandexPlace} variant="outline" track="map_click">
            {dict.location.provider.yandex}
          </ButtonLink>
        </div>
      </div>

      <LocationMap
        title={dict.location.mapTitle}
        cta={dict.location.mapLoadCta}
        note={dict.location.mapLoadNote}
        providerName={providerName}
      />
    </Section>
  );
}
