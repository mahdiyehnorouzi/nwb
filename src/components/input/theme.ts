const CONTAINER_BASE =
  'flex items-center leading-normal border border-neutral-primary-hover transition rounded-md p-3 bg-neutral-primary';

const CONTAINER_STATE = {
  normal: 'shadow-medium',
};

const INPUT_BASE =
  'bg-transparent appearance-none text-b w-full focus:outline-none';

const INPUT_STATE = {
  disabled:
    '!bg-neutral-primary-disable !border-neutral-primary-disable text-neutral-tertiary opacity-100',
  invalid:
    '!bg-neutral-primary !border-critical-primary text-neutral-primary hover:bg-neutral-primary-hover hover:border-critical-primary-hover',
  normal:
    '!bg-neutral-primary text-neutral-primary !border-neutral-secondary hover:bg-neutral-primary-hover hover:border-neutral-secondary-hover active:bg-neutral-primary-press active:border-neutral-primary-press',
  selected: '!border-brand-primary',
};

const SIZES = {
  mini: 'h-8',
  small: 'h-10',
  middle: 'h-12',
};

export { INPUT_BASE, INPUT_STATE, CONTAINER_BASE, CONTAINER_STATE, SIZES };
