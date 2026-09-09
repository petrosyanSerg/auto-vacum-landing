'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import { defaultLocale, locales, localeMeta, localePath, type Locale } from '@/lib/i18n/config';
import { track } from '@/lib/analytics/events';
import { ChevronIcon, GlobeIcon } from '@/components/ui/Icons';
import styles from './LanguageSwitcher.module.scss';

/**
 * Strips the locale prefix so the visitor lands on the same document in the new
 * language rather than being dropped on the home page.
 */
function canonicalPath(pathname: string): string {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname || '/';
}

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? '/';
  const path = canonicalPath(pathname);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && wrapRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon size={16} />
        <span className={styles.code}>{locale}</span>
        <ChevronIcon size={14} className={styles.chevron} />
      </button>

      {open ? (
        <ul className={styles.menu} id={menuId}>
          {locales.map((target) => (
            <li key={target}>
              <Link
                href={localePath(target, path)}
                className={styles.option}
                hrefLang={localeMeta[target].htmlLang}
                lang={localeMeta[target].htmlLang}
                aria-current={target === locale}
                onClick={() => {
                  track('language_change', { from: locale, to: target });
                  setOpen(false);
                }}
              >
                <span>{localeMeta[target].label}</span>
                <span className={styles.optionCode}>{target}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** The same choice, laid out flat. Used inside the mobile menu and the footer. */
export function LanguageList({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? '/';
  const path = canonicalPath(pathname);

  return (
    <ul className={styles.inline}>
      {locales.map((target) => (
        <li key={target}>
          <Link
            href={localePath(target, path)}
            className={styles.inlineOption}
            hrefLang={localeMeta[target].htmlLang}
            lang={localeMeta[target].htmlLang}
            aria-current={target === locale}
            onClick={() => track('language_change', { from: locale, to: target })}
          >
            {localeMeta[target].label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
