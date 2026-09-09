import Link from 'next/link';

import { localePath, type Locale } from '@/lib/i18n/config';
import { primaryNav } from '@/lib/i18n/routes';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { ADDRESS, BRAND, PHONE_DISPLAY, PHONE_TEL_HREF } from '@/config/business';
import { CallButton } from '@/components/ui/CallButton';
import { BeamMark, PhoneIcon } from '@/components/ui/Icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import styles from './Header.module.scss';

/**
 * Sticky and transparent over the hero, then earning a surface and a hairline
 * once the page has scrolled. The phone number is present at every width — as
 * a full button on desktop, as an icon here and a full-width bar at the bottom
 * on mobile.
 */
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={localePath(locale, '/')} className={styles.brand}>
          <BeamMark className={styles.mark} size={30} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{BRAND.name}</span>
            <span className={styles.brandMeta}>
              {BRAND.descriptor} · {ADDRESS.addressLocality[locale]}
            </span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={dict.nav.menuLabel}>
          {primaryNav.map((item) => (
            <Link key={item.key} href={localePath(locale, item.href)} className={styles.navLink}>
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.desktopOnly}>
            <LanguageSwitcher locale={locale} label={dict.nav.languageLabel} />
          </span>

          <span className={styles.desktopOnly}>
            <CallButton
              label={PHONE_DISPLAY}
              ariaLabel={dict.common.callAria}
              size="sm"
              variant="solid"
            />
          </span>

          <a
            href={PHONE_TEL_HREF}
            className={`${styles.callIcon} ${styles.mobileOnly}`}
            aria-label={dict.common.callAria}
            data-track="phone_click"
          >
            <PhoneIcon size={19} />
          </a>

          <MobileNav locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}
