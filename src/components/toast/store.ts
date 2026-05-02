import type { StoreAPIType, Toast } from './types';
import uuid from '../utils/uuid';
import sleep from '../utils/sleep';
import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  toasts: [] as Toast[],
});

const api: StoreAPIType = {
  get toasts() {
    return state.toasts;
  },

  add: (toast) => {
    const id = uuid('toast-');
    state.toasts = [...state.toasts, { ...toast, id }];
  },

  async removeAll() {
    state.toasts = state.toasts.map((toast) => ({ ...toast, removed: true }));

    await sleep(400);

    state.toasts = [];
  },

  async remove(id: string) {
    const index = state.toasts.findIndex((toast) => toast.id === id);

    if (index > -1) {
      state.toasts = state.toasts.map((toast) =>
        toast.id === id ? { ...toast, removed: true } : toast
      );

      await sleep(400);

      state.toasts = state.toasts.filter((toast) => toast.id !== id);
    }
  },

  subscribe(listener) {
    listener([...state.toasts]);
    return onChange('toasts', (nextToasts) => {
      // Medium: silently swallowing subscriber errors hides real bugs in
      // consuming components. Same pattern as dialog/store.ts — log or rethrow.
      // TODO [ARCHITECTURE]: log or rethrow — don't drop listener errors.
      try {
        listener([...nextToasts]);
      } catch {
        // ignore listener errors
      }
    });
  },
};

export default api;
