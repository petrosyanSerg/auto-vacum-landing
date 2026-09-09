import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';
import type { AnalyticsEvent } from '@/lib/analytics/events';

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  children: ReactNode;
  className?: string;
  /** Picked up by the delegated listener in SiteBehaviour. */
  track?: AnalyticsEvent;
}

function classes({ variant = 'outline', size = 'md', block, className }: CommonProps) {
  return [
    styles.button,
    styles[variant],
    size === 'lg' ? styles.lg : size === 'sm' ? styles.sm : null,
    block ? styles.block : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

type LinkProps = CommonProps & {
  href: string;
  /** Internal links route through next/link; external and tel: links do not. */
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;

export function ButtonLink(props: LinkProps) {
  const { href, external, variant, size, block, children, className, track, ...rest } = props;
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  const cls = classes({ variant, size, block, className, children });

  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        data-track={track}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} data-track={track} {...rest}>
      {children}
    </Link>
  );
}

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export function Button(props: NativeButtonProps) {
  const { variant, size, block, children, className, track, type = 'button', ...rest } = props;
  return (
    <button
      type={type}
      className={classes({ variant, size, block, className, children })}
      data-track={track}
      {...rest}
    >
      {children}
    </button>
  );
}

export const buttonStyles = styles;
