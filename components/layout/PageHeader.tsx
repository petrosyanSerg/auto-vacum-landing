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
 * Shared masthead for inner pages: breadcrumb trail, H1 and lead.
 *
 * `trail` is the whole path including the current page, and it is the same
 * array the page hands to BreadcrumbList, so what a crawler reads and what a
 * visitor sees cannot diverge. The H1 stays a separate prop: a crumb is a short
 * label, a heading is a sentence.
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
  /** The whole path, ending with the current page. */
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
            {trail.map((crumb, index) =>
              index === trail.length - 1 ? (
                <li
                  key={crumb.path}
                  className={`${styles.crumb} ${styles.current}`}
                  aria-current="page"
                >
                  {crumb.name}
                </li>
              ) : (
                <li key={crumb.path} className={styles.crumb}>
                  <Link href={localePath(locale, crumb.path)} className={styles.crumbLink}>
                    {crumb.name}
                  </Link>
                </li>
              ),
            )}
          </ol>
        </nav>

        <h1 className={styles.title}>{title}</h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {children ? <div className={styles.actions}>{children}</div> : null}
      </div>
    </header>
  );
}
