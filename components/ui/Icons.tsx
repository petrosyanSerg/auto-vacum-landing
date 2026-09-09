/**
 * Inline icons. Drawn on a 24-unit grid with a 1.6 stroke so they sit at the
 * same optical weight as the type. Decorative by default — every icon here is
 * accompanied by a visible or screen-reader label at the call site.
 */
type IconProps = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false as const,
});

export function PhoneIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export function PinIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 21c4-4.6 6-7.8 6-10.4A6 6 0 0 0 6 10.6C6 13.2 8 16.4 12 21Z" />
      <circle cx="12" cy="10.4" r="2.2" />
    </svg>
  );
}

export function InstagramIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PlayIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8.5 6 3.5-6 3.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 12h15" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}

export function ChevronIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
    </svg>
  );
}

export function CloseIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function GlobeIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.2 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.2-3.3-8.5S9.8 5.9 12 3.5Z" />
    </svg>
  );
}

/**
 * The workshop mark: a straight line of light crossing a panel, kinked where a
 * dent sits. The whole trade, in eleven points.
 */
export function BeamMark({ className, size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      focusable={false}
      className={className}
    >
      <rect x="0.75" y="0.75" width="26.5" height="26.5" rx="3.25" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
      <path
        d="M4 9.5h20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M4 14.5h5.5l2.4 3.6 2.6-7.2 2.4 3.6H24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 19.5h20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
