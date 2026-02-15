const BASE =
  'flex justify-center items-center rounded-md duration-150 transition-colors border focus:outline-none disabled:cursor-not-allowed';

const SIZES = {
  mini: 'h-6 w-6 px-1',
  xsmall: 'h-8 w-8 px-1',
  small: 'h-10 w-10 px-2',
  middle: 'h-12 w-12 px-3',
  large: 'h-14 w-14 px-3',
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
  gray: 'text-neutral-primary border-neutral-primary active:text-neutral-primary-press active:border-neutral-primary-press md:hover:enabled:border-neutral-primary-hover md:hover:enabled:text-neutral-primary-hover',
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

export {
  BASE,
  SIZES,
  FILL_THEME,
  OUTLINE_THEME,
  FLAT_THEME,
  PLAIN_THEME,
  DISABLE_THEME,
};
