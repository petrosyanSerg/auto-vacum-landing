'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { localePath, type Locale } from '@/lib/i18n/config';
import { primaryNav } from '@/lib/i18n/routes';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { ADDRESS, MAPS, PHONE_DISPLAY, SOCIAL } from '@/config/business';
import { ButtonLink } from '@/components/ui/Button';
import { CallButton } from '@/components/ui/CallButton';
import { CloseIcon, InstagramIcon, MenuIcon, PinIcon, YoutubeIcon } from '@/components/ui/Icons';
import { LanguageList } from './LanguageSwitcher';

import headerStyles from './Header.module.scss';
import styles from './MobileNav.module.scss';

/**
 * Full-screen menu for narrow screens. It traps focus while open, closes on
 * Escape or on navigation, and returns focus to the button that opened it.
 * Body scrolling is locked so the page behind cannot drift under a thumb.
 */
export function MobileNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Back and forward while the panel is open should dismiss it. This is a
  // subscription to a browser event, not state derived from a render.
  useEffect(() => {
    const onPopState = () => setOpen(false);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const isCurrent = (href: string) => {
    const full = localePath(locale, href);
    return pathname === full;
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${headerStyles.menuButton} ${headerStyles.mobileOnly}`}
        aria-expanded={open}
        aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
        onClick={() => setOpen(true)}
      >
        <MenuIcon size={20} />
      </button>

      {open ? (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.menuLabel}
          ref={panelRef}
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest('a')) setOpen(false);
          }}
        >
          <div className={styles.bar}>
            <p className={styles.title}>{dict.nav.menuLabel}</p>
            <button
              type="button"
              className={styles.close}
              onClick={close}
              aria-label={dict.nav.closeMenu}
            >
              <CloseIcon size={20} />
            </button>
          </div>

          <div className={styles.body}>
            <nav aria-label={dict.nav.menuLabel}>
              <ul className={styles.links}>
                {primaryNav.map((item, index) => (
                  <li key={item.key}>
                    <Link
                      href={localePath(locale, item.href)}
                      className={styles.link}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                    >
                      <span className={styles.linkIndex}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {dict.nav[item.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.contactRow}>
              <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} block />
              <ButtonLink
                href={MAPS.googleDirections}
                variant="outline"
                track="directions_click"
                block
              >
                <PinIcon size={17} />
                {dict.common.directions}
              </ButtonLink>
              <address className={styles.address}>
                {ADDRESS.streetAddress[locale]}
                <br />
                {ADDRESS.addressLocality[locale]}
                <br />
                {PHONE_DISPLAY}
              </address>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>{dict.footer.contactTitle}</p>
              <div className={styles.contactRow}>
                <ButtonLink
                  href={SOCIAL.instagram}
                  variant="outline"
                  size="sm"
                  track="instagram_click"
                  block
                >
                  <InstagramIcon size={16} />
                  {dict.common.instagram}
                </ButtonLink>
                <ButtonLink
                  href={SOCIAL.youtube}
                  variant="outline"
                  size="sm"
                  track="youtube_click"
                  block
                >
                  <YoutubeIcon size={16} />
                  {dict.common.youtube}
                </ButtonLink>
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>{dict.nav.languageLabel}</p>
              <LanguageList locale={locale} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
