const BASE =
  'rounded-md px-3 flex items-center justify-center duration-150 transition-colors border focus:outline-none disabled:cursor-not-allowed';

const SIZES = {
  mini: 'h-6 text-o',
  xsmall: 'h-8 text-o',
  small: 'h-10 text-b',
  middle: 'h-12 text-b',
  large: 'h-14 text-h2',
};

const DISABLE_THEME = {
  fill: 'disabled:bg-disable-matt disabled:text-disable-matt',
  outline: 'disabled:border-disable-matt disabled:text-disable-bright',
  flat: 'disabled:bg-disable-matt disabled:text-disable-matt',
  plain: 'disabled:text-disable-bright',
};

const FILL_THEME = {
  green:
    'bg-brand-primary text-neutral-quaternary active:bg-brand-primary-press md:hover:enabled:bg-brand-primary-hover text-neutral-quaternary border-transparent',
  red: 'bg-critical-primary text-neutral-quaternary active:bg-critical-primary-press active:text-neutral-quaternary-press md:hover:enabled:bg-critical-primary-hover md:hover:enabled:text-neutral-quaternary-hover border-transparent',
  gray: 'bg-neutral-quinary text-neutral-primary active:bg-neutral-quinary-press active:text-neutral-primary-press md:hover:enabled:bg-neutral-quinary-hover md:hover:enabled:text-neutral-primary-hover border-transparent',
};

const OUTLINE_THEME = {
  green:
    'text-brand-primary border-brand-primary active:text-brand-primary-press active:border-brand-primary-press md:hover:enabled:border-brand-primary-hover md:hover:enabled:text-brand-primary-hover',
  red: 'text-critical-primary border-critical-primary active:text-critical-primary-press active:border-critical-primary-press md:hover:enabled:border-critical-primary-hover md:hover:enabled:text-critical-primary-hover',
  gray: 'text-neutral-secondary border-neutral-quaternary active:text-neutral-secondary-press active:border-neutral-quaternary-press md:hover:border-neutral-quaternary-hover md:hover:enabled:text-neutral-secondary-hover',
};

const FLAT_THEME = {
  green:
    'bg-brand-secondary text-brand-quaternary md:hover:enabled:bg-brand-secondary-hover md:hover:enabled:text-brand-quaternary active:bg-brand-secondary-press active:text-brand-quaternary-press border-transparent',
  red: 'bg-critical-secondary text-critical-secondary md:hover:enabled:bg-critical-secondary-hover md:hover:enabled:text-critical-secondary-hover active:bg-critical-secondary-press active:text-critical-secondary border-transparent',
  gray: 'bg-neutral-quinary text-neutral-primary md:hover:enabled:bg-neutral-quinary-hover md:hover:enabled:text-neutral-primary-hover active:bg-neutral-quinary-press active:text-neutral-primary border-transparent',
};

const PLAIN_THEME = {
  green:
    'text-brand-primary active:text-brand-primary-press border-transparent',
  red: 'text-critical-primary active:text-critical-primary-press border-transparent',
  gray: 'text-neutral-primary active:text-neutral-primary-press border-transparent',
};

const NOT_CLICKABLE = {
  default: 'pointer-events-none cursor-not-allowed',
};

export {
  BASE,
  SIZES,
  FILL_THEME,
  OUTLINE_THEME,
  FLAT_THEME,
  PLAIN_THEME,
  DISABLE_THEME,
  NOT_CLICKABLE,
};
