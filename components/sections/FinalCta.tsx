import { localePath, type Locale } from '@/lib/i18n/config';
import { routePath } from '@/lib/i18n/routes';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { MAPS, SOCIAL } from '@/config/business';
import { ButtonLink } from '@/components/ui/Button';
import { CallButton } from '@/components/ui/CallButton';
import { BeamField } from '@/components/ui/BeamField';
import { InstagramIcon, PinIcon, YoutubeIcon } from '@/components/ui/Icons';
import styles from './FinalCta.module.scss';

/** The last thing on every page: the number, and three other ways to reach it. */
export function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <BeamField className={styles.field} />

      <div className={styles.inner}>
        <p className={styles.label}>{dict.finalCta.label}</p>
        <h2 className={styles.title} id="cta-title">
          {dict.finalCta.title}
        </h2>
        <p className={styles.lead}>{dict.finalCta.lead}</p>

        <div className={styles.actions}>
          <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} size="lg" />
          <ButtonLink href={localePath(locale, routePath.contact)} variant="outline" size="lg">
            {dict.contact.formTitle}
          </ButtonLink>
        </div>

        <div className={styles.secondary}>
          <ButtonLink href={MAPS.yandexDirections} variant="ghost" size="sm" track="directions_click">
            <PinIcon size={16} />
            {dict.common.directions}
          </ButtonLink>
          <ButtonLink href={SOCIAL.instagram} variant="ghost" size="sm" track="instagram_click">
            <InstagramIcon size={16} />
            {dict.common.instagram}
          </ButtonLink>
          <ButtonLink href={SOCIAL.youtube} variant="ghost" size="sm" track="youtube_click">
            <YoutubeIcon size={16} />
            {dict.common.youtube}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
