import store from './store';
import type { StoreAPIType } from './types';

// NOTE: This is just a getter function for the store
// Real issue is in store.ts - see comments there
// TODO: Replace with proper reactive store creation
export function useDialog(): StoreAPIType {
  return store;
}
