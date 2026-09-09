import Link from 'next/link';
import type { ReactNode } from 'react';

import { localePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { BeamField } from '@/components/ui/BeamField';
import styles from './PageHeader.module.scss';

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Shared masthead for inner pages: breadcrumb trail, H1 and lead. The trail is
 * the same array that feeds BreadcrumbList in the page's structured data, so
 * what a crawler reads and what a visitor sees cannot diverge.
 */
export function PageHeader({
  locale,
  dict,
  trail,
  title,
  lead,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  /** Ancestors only — the current page is added from `title`. */
  trail: Crumb[];
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className={styles.header}>
      <BeamField className={styles.field} />

      <div className={styles.inner}>
        <nav aria-label={dict.nav.breadcrumb}>
          <ol className={styles.crumbs}>
            {trail.map((crumb) => (
              <li key={crumb.path} className={styles.crumb}>
                <Link href={localePath(locale, crumb.path)} className={styles.crumbLink}>
                  {crumb.name}
                </Link>
              </li>
            ))}
            <li className={`${styles.crumb} ${styles.current}`} aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <h1 className={styles.title}>{title}</h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {children ? <div className={styles.actions}>{children}</div> : null}
      </div>
    </header>
  );
}
