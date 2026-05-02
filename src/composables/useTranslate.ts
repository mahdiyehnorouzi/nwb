import locale from '../locale';
//  Medium: importing from full `lodash` (CJS) defeats tree-shaking and pulls
// the whole library into consumer bundles for a single 5-line `get`. Prefer
// `lodash-es/get`, the standalone `lodash.get` package, or inline this util.
// TODO [PERFORMANCE]: replace lodash dependency with a lighter alternative.
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
