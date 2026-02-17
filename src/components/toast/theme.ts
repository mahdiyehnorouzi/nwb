import { ToastLevel, Variants } from "./types";

const TOAST_BASE =
  'flex items-start justify-between py-3 px-3 rounded-md shadow-mini border';

const TOAST_ITEM_CONTAINER = {
  top: 'relative transition-all transform -translate-y-[103vh] duration-150 ease-in-out flex justify-center',
  bottom:
    'relative transition-all transform translate-y-[20vh] duration-150 ease-in-out flex justify-center',
};

const TOAST_VARIANTS = {
  [Variants.Positive]: {
    normal:
      'bg-brand-secondary-disable border-brand-primary text-brand-primary',
    disabled:
      'bg-brand-secondary-disable border-brand-primary text-brand-primary',
  },
  [Variants.Negative]: {
    normal:
      'bg-critical-secondary border-critical-primary text-critical-secondary',
    disabled:
      'bg-critical-secondary border-critical-primary text-critical-secondary',
  },
  [Variants.Alert]: {
    normal: 'bg-warning-secondary border-warning-primary text-warning-primary',
    disabled:
      'bg-warning-secondary-hover border-warning-primary text-warning-primary',
  },
  [Variants.Neutral]: {
    normal: 'bg-neutral-primary border-neutral-quaternary text-neutral-primary',
    disabled:
      'bg-neutral-primary border-neutral-quaternary text-neutral-primary',
  },
};

const TOAST_CLOSE_BASE =
  'cursor-pointer w-5 h-5 rounded-full overflow-hidden flex items-center justify-center';

const TOAST_CLOSE_VARIANTS = {
  [Variants.Positive]: 'bg-brand-secondary-disable text-brand-primary',
  [Variants.Negative]: 'bg-critical-secondary text-critical-primary',
  [Variants.Neutral]: 'bg-neutral-secondary text-neutral-secondary',
  [Variants.Alert]: 'bg-warning-secondary text-warning-primary',
};

const PERCENTAGE_LOADER_COLOR = {
  [Variants.Positive]: '#066137',
  [Variants.Negative]: '#BF4E58',
  [Variants.Alert]: '#7D5B07',
  [Variants.Neutral]: '#333333',
};

// Simple icon placeholders since @negar/icons is not available
const DEFAULT_ICONS = {
    [Variants.Positive]: '✅',
    [Variants.Negative]: '❌',
    [Variants.Alert]: '⚠️',
    [Variants.Neutral]: 'ℹ️',
  };

// const DEFAULT_ICONS = {
//   [Variants.Positive]: NegarTickIcon,
//   [Variants.Negative]: NegarTickIcon,
//   [Variants.Alert]: NegarTickIcon,
//   [Variants.Neutral]: NegarTickIcon,
// };

const QUEUED_TOAST = {
  top: {
    [ToastLevel.Second]: 'scale-x-[0.90] !-translate-y-[100vh]',
    [ToastLevel.First]: 'scale-x-[0.95] !-translate-y-[99vh]',
  },
  bottom: {
    [ToastLevel.Second]: 'scale-x-[0.90] !-translate-y-4',
    [ToastLevel.First]: 'scale-x-[0.95] !-translate-y-2',
  },
  hidden: 'hidden',
};

export {
  TOAST_BASE,
  TOAST_VARIANTS,
  TOAST_CLOSE_BASE,
  TOAST_CLOSE_VARIANTS,
  PERCENTAGE_LOADER_COLOR,
  DEFAULT_ICONS,
  TOAST_ITEM_CONTAINER,
  QUEUED_TOAST,
};
