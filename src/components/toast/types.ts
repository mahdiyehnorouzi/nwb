export type Toast = {
  message: string;
  duration?: number;
  variant?: Variants;
  loading?: boolean;
  closable?: boolean;
  showIcon?: boolean;
  icon?: string;
  id?: string;
  position?: Position;
  offset?: number;
  removed?: boolean;
};

export enum Position {
  Top = 'top',
  Bottom = 'bottom',
}

export type NToastProps = {
    offset?: number;
    queued?: boolean;
    position?: Position;
  };

export type ToastSettings = {
  offset?: number;
  queued?: boolean;
  position?: Position;
};

export type StoreAPIType = {
  toasts: Toast[];
  add: (toast: Toast) => void;
  removeAll: () => void;
  remove: (id: string) => void;
};

export type UseToastReturnType = {
  alert: (toast: Toast) => void;
  positive: (toast: Toast) => void;
  negative: (toast: Toast) => void;
  neutral: (toast: Toast) => void;
};

export type UseToastOptions = {
  position?: Position;
  offset?: number;
};

export enum Variants {
  Positive = 'positive',
  Alert = 'alert',
  Negative = 'negative',
  Neutral = 'neutral',
}

export enum ToastLevel {
  First = 1,
  Second = 2,
}