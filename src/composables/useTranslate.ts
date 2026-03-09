import locale from '../locale';
import get from 'lodash/get';

export type Params = Record<string, any>;

export type UseTranslateReturnType = {
  t: (path: string, params?: Params) => string;
};

export type KeyLookupReturnType = string | ((params: Params) => string);

export default function useTranslate(): UseTranslateReturnType {
  const t = (path: string, params?: Params): string => {
    const key = get(
      locale.messages() as Record<string, unknown>,
      path,
    ) as KeyLookupReturnType | undefined;

    if (typeof key === 'function') {
      return key(params);
    }
    
    return key || path;
  };

  return { t };
}
