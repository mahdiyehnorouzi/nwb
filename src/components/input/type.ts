export enum Keys {
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
  }
  
  export type InputType =
    | 'tel'
    | 'text'
    | 'number'
    | 'search'
    | 'password'
    | 'textarea';
  
  export type NumericInputEventsType = {
    keydown: (event: KeyboardEvent) => void;
    wheel?: (event: WheelEvent) => void;
  };

  export type Size = 'mini' | 'small' | 'middle';