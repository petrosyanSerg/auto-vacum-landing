import Link from 'next/link';

import { localePath, type Locale } from '@/lib/i18n/config';
import { primaryNav, routePath, servicePath } from '@/lib/i18n/routes';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { serviceSlugs } from '@/content/services';
import {
  ADDRESS,
  BRAND,
  MAPS,
  OPENING_HOURS,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  SOCIAL,
} from '@/config/business';
import { BeamMark, InstagramIcon, YoutubeIcon } from '@/components/ui/Icons';
import { LanguageList } from './LanguageSwitcher';
import styles from './Footer.module.scss';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCell}>
            <Link href={localePath(locale, '/')} className={styles.brand}>
              <BeamMark size={30} />
              <span className={styles.brandName}>{BRAND.name}</span>
            </Link>
            <p className={styles.tagline}>{dict.footer.tagline}</p>
            <div className={styles.socials}>
              <a
                href={SOCIAL.instagram}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.common.instagram}
                data-track="instagram_click"
              >
                <InstagramIcon size={19} />
              </a>
              <a
                href={SOCIAL.youtube}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.common.youtube}
                data-track="youtube_click"
              >
                <YoutubeIcon size={19} />
              </a>
            </div>
          </div>

          <div>
            <h2 className={styles.colTitle}>{dict.footer.servicesTitle}</h2>
            <ul className={styles.list}>
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={localePath(locale, servicePath(slug))} className={styles.link}>
                    {dict.services[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.colTitle}>{dict.footer.siteTitle}</h2>
            <ul className={styles.list}>
              <li>
                <Link href={localePath(locale, routePath.home)} className={styles.link}>
                  {dict.nav.home}
                </Link>
              </li>
              {primaryNav.map((item) => (
                <li key={item.key}>
                  <Link href={localePath(locale, item.href)} className={styles.link}>
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.colTitle}>{dict.footer.contactTitle}</h2>
            <address className={styles.address}>
              <a href={PHONE_TEL_HREF} className={styles.phone} data-track="phone_click">
                {PHONE_DISPLAY}
              </a>
              <span>
                {ADDRESS.streetAddress[locale]}
                <br />
                {ADDRESS.addressLocality[locale]}, {ADDRESS.addressRegion[locale]}
              </span>
              <a
                href={MAPS.googleDirections}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
              >
                {dict.common.directions}
              </a>
              {/* Hours are shown only when real ones are configured. */}
              <span className={styles.hours}>
                {OPENING_HOURS.length
                  ? OPENING_HOURS.map((h) => `${h.days.join(', ')} ${h.opens}–${h.closes}`).join(' · ')
                  : dict.common.hoursUnknown}
              </span>
            </address>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.fineprint}>
            <span>
              © {year} {BRAND.name}. {dict.footer.rights}
            </span>
            <span>{dict.footer.builtNote}</span>
          </div>
          <div>
            <h2 className={styles.colTitle}>{dict.footer.languagesTitle}</h2>
            <LanguageList locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}
