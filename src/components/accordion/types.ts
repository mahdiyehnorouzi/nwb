export type AccordionState = number | number[];

export interface NAccordionGroupProps {
  modelValue?: AccordionState;
}

export interface NAccordionProps {
  title?: string;
  disabled?: boolean;
  hasDivider?: boolean;
  elevation?: boolean;
}
