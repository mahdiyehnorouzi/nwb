import type { ButtonColor, ButtonSize, ButtonVariant } from './button.types';

// Could be improved: Move to theme package when migrating to monorepo
export const BUTTON_BASE =
  'duration-150 transition-colors border focus:outline-none disabled:cursor-not-allowed';

export const BUTTON_TEXT_BASE =
  'px-3 rounded-md flex items-center justify-center';

export const BUTTON_ICON_BASE =
  'rounded-md flex justify-center items-center';

export const BUTTON_SIZES_TEXT: Record<ButtonSize, string> = {
  mini: 'h-6 text-o',
  xsmall: 'h-8 text-o',
  small: 'h-10 text-b',
  middle: 'h-12 text-b',
  large: 'h-14 text-h2',
};

export const BUTTON_SIZES_ICON: Record<ButtonSize, string> = {
  mini: 'h-6 w-6 px-1',
  xsmall: 'h-8 w-8 px-1',
  small: 'h-10 w-10 px-2',
  middle: 'h-12 w-12 px-3',
  large: 'h-14 w-14 px-3',
};

export const BUTTON_DISABLED_BY_VARIANT: Record<ButtonVariant, string> = {
  fill: 'disabled:bg-disable-matt disabled:text-disable-matt',
  outline: 'disabled:border-disable-matt disabled:text-disable-bright',
  flat: 'disabled:bg-disable-matt disabled:text-disable-matt',
  plain: 'disabled:text-disable-bright',
};

type VariantTheme = Record<ButtonColor, string>;

export const BUTTON_THEME: Record<ButtonVariant, VariantTheme> = {
  fill: {
    green:
      'bg-brand-primary text-neutral-quaternary active:bg-brand-primary-press md:hover:enabled:bg-brand-primary-hover border-transparent',
    red:
      'bg-critical-primary text-neutral-quaternary active:bg-critical-primary-press md:hover:enabled:bg-critical-primary-hover border-transparent',
    gray:
      'bg-neutral-quinary text-neutral-primary active:bg-neutral-quinary-press md:hover:enabled:bg-neutral-quinary-hover border-transparent',
    blue:
      'bg-blue-primary text-neutral-quaternary active:bg-blue-primary-press md:hover:enabled:bg-blue-primary-hover border-transparent',
  },
  outline: {
    green:
      'text-brand-primary border-brand-primary active:text-brand-primary-press active:border-brand-primary-press md:hover:enabled:border-brand-primary-hover md:hover:enabled:text-brand-primary-hover',
    red:
      'text-critical-primary border-critical-primary active:text-critical-primary-press active:border-critical-primary-press md:hover:enabled:border-critical-primary-hover md:hover:enabled:text-critical-primary-hover',
    gray:
      'text-neutral-secondary border-neutral-quaternary active:text-neutral-secondary-press active:border-neutral-quaternary-press md:hover:enabled:border-neutral-quaternary-hover md:hover:enabled:text-neutral-secondary-hover',
    blue:
      'text-blue-primary border-blue-primary active:text-blue-primary-press active:border-blue-primary-press md:hover:enabled:border-blue-primary-hover md:hover:enabled:text-blue-primary-hover',
  },
  flat: {
    green:
      'bg-brand-secondary text-brand-quaternary md:hover:enabled:bg-brand-secondary-hover active:bg-brand-secondary-press border-transparent',
    red:
      'bg-critical-secondary text-critical-secondary md:hover:enabled:bg-critical-secondary-hover active:bg-critical-secondary-press border-transparent',
    gray:
      'bg-neutral-quinary text-neutral-primary md:hover:enabled:bg-neutral-quinary-hover active:bg-neutral-quinary-press border-transparent',
    blue:
      'bg-blue-secondary text-blue-primary md:hover:enabled:bg-blue-secondary-hover active:bg-blue-secondary-press border-transparent',
  },
  plain: {
    green: 'text-brand-primary active:text-brand-primary-press border-transparent',
    red: 'text-critical-primary active:text-critical-primary-press border-transparent',
    gray: 'text-neutral-primary active:text-neutral-primary-press border-transparent',
    blue: 'text-blue-primary active:text-blue-primary-press border-transparent',
  },
};

export const NOT_CLICKABLE = 'pointer-events-none cursor-not-allowed';