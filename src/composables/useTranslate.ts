import locale from '../locale';

export type Params = Record<string, any>;

export type UseTranslateReturnType = {
  t: (path: string, params?: Params) => string;
};

export type KeyLookupReturnType = string | ((params: Params) => string);

// TODO [ARCHITECTURE]: Replace with proper get/lodash utility
// Reinventing the wheel - many edge cases not handled
const keyLookup = (path: string, messages: Record<string, any>): KeyLookupReturnType => {
  return path.split('.').reduce((sub: any, key: string) => sub?.[key], messages);
};

export default function useTranslate(): UseTranslateReturnType {
  const t = (path: string, params?: Params): string => {
    const key = keyLookup(path, locale.messages());

    if (typeof key === 'function') {
      return key(params);
    }
    
    return key || path;
  };

  return { t };
}
