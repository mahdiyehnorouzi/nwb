export type ButtonToggleColor = 'gray' | 'green' | 'grayGreen';
export type ButtonToggleSize = 'small' | 'middle';
export type ButtonToggleRounded = 'full' | 'medium';

export type PButtonToggleGroupProps = {
  modelValue: number;
  autoActivate: boolean;
  color: ButtonToggleColor;
  size: ButtonToggleSize;
  rounded: ButtonToggleRounded;
  disabled?: boolean;
};

export type ButtonToggleChangeEventDetail = {
  index: number;
};

export type ButtonToggleInternalState = {
  activeIndex: number;
  buttonsCount: number;
};
