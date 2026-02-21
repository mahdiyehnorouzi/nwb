export type ButtonToggleColor = 'gray' | 'green' | 'grayGreen';
export type ButtonToggleSize = 'small' | 'middle';
export type ButtonToggleRounded = 'full' | 'medium';

export const BUTTON_TOGGLE_ROUNDED = {
    FULL: 'full',
    MEDIUM: 'medium',
  } as const;

export type ToggleEl = HTMLElement & {
  index: number;
  active: boolean;
  disabled: boolean;
  color: ButtonToggleColor;
  size: ButtonToggleSize;
  rounded: ButtonToggleRounded;
  tabIndex: number;
  focus: () => void;
};