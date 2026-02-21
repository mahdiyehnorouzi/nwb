import store from './store';
import type { StoreAPIType } from './types';

export function useDialog(): StoreAPIType {
  return store;
}
