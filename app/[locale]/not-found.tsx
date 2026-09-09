import Link from 'next/link';
import { defaultLocale, localePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { PHONE_DISPLAY, PHONE_TEL_HREF } from '@/config/business';
import styles from './not-found.module.scss';

/**
 * Rendered outside a resolved locale, so it falls back to Armenian and offers
 * the two things a lost visitor can still use: the home page and the phone.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{dict.works.empty}</h1>
      <div className={styles.actions}>
        <Link href={localePath(defaultLocale, '/')} className={styles.link}>
          {dict.common.backHome}
        </Link>
        <a href={PHONE_TEL_HREF} className={styles.phone} data-track="phone_click">
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
