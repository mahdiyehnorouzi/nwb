import type { ButtonColor, ButtonSize, ButtonVariant } from './button.types';
// High: `clsx` is declared in `devDependencies` in package.json but used
// here at runtime. Consumers installing the published package without dev deps
// will hit "Cannot find module 'clsx'". Move it to `dependencies`.
// TODO [BUILD]: relocate `clsx` to `dependencies` in package.json before next publish.
import clsx from 'clsx';
import {
  BUTTON_BASE,
  BUTTON_DISABLED_BY_VARIANT,
  BUTTON_THEME,
  NOT_CLICKABLE,
} from './button.styles';

export function getButtonClasses(params: {
  size: ButtonSize;
  variant: ButtonVariant;
  color: ButtonColor;
  loading?: boolean;
  extra?: string;
  baseClass: string;                 
  sizeClassMap: Record<ButtonSize, string>;
  miniRoundClass?: string;
}) {
  const {
    size,
    variant,
    color,
    loading,
    extra,
    baseClass,
    sizeClassMap,
    miniRoundClass,
  } = params;

  return clsx(
    BUTTON_BASE,
    baseClass,
    sizeClassMap[size],
    BUTTON_DISABLED_BY_VARIANT[variant],
    BUTTON_THEME[variant][color],
    loading && NOT_CLICKABLE,
    size === 'mini' && miniRoundClass,
    extra,
  );
}