const CHEAP_BASE = 'inline-flex items-center rounded-3xl group px-3';

const FILL_THEME = {
  green:
    'bg-brand-secondary text-brand-quaternary hover:bg-brand-secondary-hover hover:text-brand-quaternary-hover active:bg-brand-secondary-press active:text-brand-quaternary-press border-transparent',
  blue: 'bg-blue-20 hover:bg-blue-30 active:bg-blue-40 text-blue-primary hover:text-blue-primary-hover active:text-blue-primary-press border-transparent',
  red: 'bg-critical-secondary text-critical-primary hover:bg-critical-secondary-hover hover:text-critical-primary-hover active:bg-critical-secondary-press active:text-critical-primary-press border-transparent',
  gray: 'bg-neutral-secondary text-neutral-quaternary hover:bg-neutral-secondary-hover hover:text-neutral-quaternary-hover active:bg-neutral-secondary-press active:text-neutral-quaternary-press border-transparent',
  yellow:
    'bg-warning-secondary text-warning-primary hover:bg-warning-secondary-hover hover:text-warning-primary-hover active:bg-warning-secondary-press active:text-warning-primary-press border-transparent',
};

const OUTLINE_THEME = {
  green:
    'bg-transparent text-brand-primary border border-brand-primary hover:text-brand-primary-hover hover:border-brand-primary-hover active:text-brand-primary-press active:border-brand-primary-press',
  red: 'bg-transparent text-critical-primary border border-critical-primary hover:text-critical-primary-hover hover:border-critical-primary-press active:text-critical-primary-press active:border-critical-primary-press',
  blue: 'bg-transparent text-blue-primary border border-blue-primary hover:text-blue-primary-hover hover:border-blue-primary-hover active:text-blue-primary-press active:border-blue-primary-press',
  gray: 'bg-transparent text-neutral-primary border border-neutral-tertiary hover:border-neutral-tertiary-hover hover:text-neutral-primary-hover active:border-neutral-tertiary-press active:text-neutral-primary-press',
  yellow:
    'bg-transparent text-warning-primary border border-warning-primary hover:text-warning-primary-hover hover:border-warning-primary-hover active:border-warning-primary-press active:text-warning-primary-press',
};

const PLAIN_THEME = {
  green:
    'bg-transparent text-brand-primary hover:text-brand-primary-hover hover:bg-neutral-secondary active:text-brand-primary-press active:bg-neutral-secondary-press',
  red: 'bg-transparent text-critical-primary hover:text-critical-primary-hover hover:bg-neutral-secondary active:text-critical-primary-press active:bg-neutral-secondary-press',
  blue: 'bg-transparent text-blue-primary hover:text-blue-primary-hover hover:bg-neutral-secondary active:text-blue-primary-press active:bg-neutral-secondary-press',
  gray: 'bg-transparent text-neutral-primary hover:text-neutral-primary-hover hover:bg-neutral-secondary active:text-neutral-primary-press active:bg-neutral-secondary-press',
  yellow:
    'bg-transparent text-warning-primary hover:text-warning-primary-hover hover:bg-neutral-secondary active:text-warning-primary-press active:bg-neutral-secondary-press',
};

const SIZES = {
  small: 'h-6 text-o',
  middle: 'h-8 text-c1',
};

const CHEAP_ICON_SIZES = {
  small: 16,
  middle: 20,
};

export {
  CHEAP_BASE,
  CHEAP_ICON_SIZES,
  SIZES,
  FILL_THEME,
  OUTLINE_THEME,
  PLAIN_THEME,
};
