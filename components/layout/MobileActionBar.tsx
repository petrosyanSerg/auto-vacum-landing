import { MAPS, PHONE_DISPLAY, PHONE_TEL_HREF, SOCIAL } from '@/config/business';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { InstagramIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import styles from './MobileActionBar.module.scss';

/**
 * Thumb-height bar pinned to the bottom of every mobile screen. Calling is one
 * tap from anywhere on the site, at any scroll position. The body reserves
 * matching bottom padding in globals.scss so the bar never covers content.
 */
export function MobileActionBar({ dict }: { dict: Dictionary }) {
  return (
    <nav className={styles.bar} aria-label={dict.finalCta.label}>
      <a
        href={PHONE_TEL_HREF}
        className={`${styles.action} ${styles.primary}`}
        aria-label={dict.common.callAria}
        data-track="phone_click"
      >
        <PhoneIcon size={17} />
        <span className={styles.number}>{PHONE_DISPLAY}</span>
      </a>

      <a
        href={MAPS.yandexDirections}
        className={styles.action}
        target="_blank"
        rel="noopener noreferrer"
        data-track="map_click"
      >
        <PinIcon size={19} />
        <span className={styles.label}>{dict.common.onTheMap}</span>
      </a>

      <a
        href={SOCIAL.instagram}
        className={styles.action}
        target="_blank"
        rel="noopener noreferrer"
        data-track="instagram_click"
      >
        <InstagramIcon size={19} />
        <span className={styles.label}>{dict.common.instagram}</span>
      </a>
    </nav>
  );
}
