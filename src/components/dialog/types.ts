export type DialogPlacement =
  | 'bottom'
  | 'top'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';

export type DialogDirection = 'rtl' | 'ltr';

export type MoveDirection = 'left' | 'right';

export type ComponentType = {
  component: any;
  props: Record<string, any>;
};

export type DialogConsumerProps = {
  content?: ComponentType | string;
  title?: ComponentType | string;
  expandableLabel?: ComponentType | string;
  expandable?: boolean;
  expandedContent?: ComponentType | string;
  defaultExpanded?: boolean;
  footer?: ComponentType | string;
  bodyClass?: string;
  wrapperClass?: string;
  footerClass?: string;
  multiple?: boolean;
  referenceElementRef?: HTMLElement | any;
  placement?: DialogPlacement;
  afterClose?: () => void;
  afterOpen?: () => void;
  direction?: DialogDirection;
  onExpandedUpdate?: (value: boolean) => void;
  headerLess?: boolean;
};

export type DialogProps = DialogConsumerProps & {
  id: string;
  index: number;
  zIndex: number;
};

export type StoreAPIType = {
  lastMultiDialogZIndex: number;
  selectedDialogId: string | undefined;
  dialogs: DialogProps[];
  add: (dialog: DialogConsumerProps) => string;
  remove: (id?: string) => void;
  focus: (id: string) => void;
  selectNextDialog: () => void;
  removeAll: () => void;
  subscribe: (listener: (dialogs: DialogProps[]) => void) => () => void;
};

export type UseDialogPositionParamsType = {
  index: number;
  wrapperRef: HTMLElement;
  draggableRef: HTMLElement;
  referenceElementRef?: HTMLElement | any;
  placement?: DialogPlacement;
  disableDragging: boolean;
};

export type UseDialogDirectionParamsType = {
  x: number;
  referenceElement?: HTMLElement;
  isDialogRendered: boolean;
  placement?: DialogPlacement;
};
