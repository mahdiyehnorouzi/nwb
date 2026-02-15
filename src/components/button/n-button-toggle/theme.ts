const BUTTON_TOGGLE_BASE =
  'inline-flex items-center justify-center gap-1 px-2 py-0.5 outline-none  !box-border';
const BUTTON_TOGGLE_THEME = {
  normal: {
    grayGreen:
      'bg-transparent text-neutral-secondary disabled:bg-neutral-secondary-disable disabled:text-neutral-secondary-disable disabled:cursor-not-allowed md:hover:enabled:text-neutral-secondary md:hover:enabled:bg-neutral-secondary active:bg-neutral-primary active:text-neutral-secondary-press',
    green:
      'bg-transparent text-brand-primary-press disabled:bg-brand-primary-disable disabled:text-neutral-secondary-disable disabled:cursor-not-allowed active:bg-brand-primary-press md:hover:enabled:bg-brand-primary-hover md:hover:enabled:text-brand-secondary-hover',
    gray: 'bg-transparent text-neutral-secondary disabled:bg-neutral-secondary-disable disabled:text-neutral-secondary-disable disabled:cursor-not-allowed md:hover:enabled:text-neutral-secondary md:hover:enabled:bg-neutral-secondary active:bg-neutral-primary active:text-neutral-secondary-press',
  },
  active: {
    grayGreen: 'bg-neutral-primary text-brand-primary',
    green: 'bg-brand-primary-press text-brand-primary-disable',
    gray: 'bg-neutral-primary text-neutral-secondary-press',
  },
};

const SIZES = {
  small: 'h-5',
  middle: 'h-7',
};

const ROUNDED = {
  full: 'rounded-3xl',
  medium: 'rounded-md',
};

export { BUTTON_TOGGLE_BASE, BUTTON_TOGGLE_THEME, SIZES, ROUNDED };
