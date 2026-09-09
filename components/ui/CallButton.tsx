import { PHONE_DISPLAY, PHONE_TEL_HREF } from '@/config/business';
import { ButtonLink, buttonStyles } from './Button';
import { PhoneIcon } from './Icons';

/**
 * The one action this whole site exists to produce. It is solid-filled
 * everywhere it appears, which is why nothing else on the page ever is.
 */
export function CallButton({
  label,
  ariaLabel,
  size = 'lg',
  variant = 'solid',
  block,
  showNumber = true,
}: {
  /** Localised call-to-action text. Falls back to the number alone. */
  label?: string;
  ariaLabel: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
  block?: boolean;
  showNumber?: boolean;
}) {
  return (
    <ButtonLink
      href={PHONE_TEL_HREF}
      variant={variant}
      size={size}
      block={block}
      track="phone_click"
      aria-label={ariaLabel}
    >
      <PhoneIcon className={buttonStyles.icon} size={size === 'sm' ? 15 : 18} />
      {label ? <span>{label}</span> : null}
      {!label && showNumber ? <span className={buttonStyles.number}>{PHONE_DISPLAY}</span> : null}
    </ButtonLink>
  );
}
