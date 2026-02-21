export type ButtonSize = 'mini' | 'xsmall' | 'small' | 'middle' | 'large'; 
export type ButtonVariant = 'fill' | 'outline' | 'flat' | 'plain';
export type ButtonColor = 'green' | 'red' | 'gray' | 'blue';

export type NativeButtonType = 'button' | 'submit' | 'reset';

export const BUTTON_SIZE = {
    MINI: 'mini',
    XSMALL: 'xsmall',
    SMALL: 'small',
    MIDDLE: 'middle',
    LARGE: 'large',
} as const;

export const BUTTON_VARIANT = {
    FILL: 'fill',
    OUTLINE: 'outline',
    FLAT: 'flat',
    PLAIN: 'plain',
} as const;

export const BUTTON_COLOR = {
    GREEN: 'green',
    RED: 'red',
    GRAY: 'gray',
    BLUE: 'blue',
} as const;

export const BUTTON_NATIVE_TYPE = {
    BUTTON: 'button',
    SUBMIT: 'submit',
    RESET: 'reset',
} as const;