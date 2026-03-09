import type { StoreAPIType, Toast } from './types';
import uuid from '../utils/uuid';
import sleep from '../utils/sleep';

// ⚠️ SAME ISSUES AS DIALOG STORE:
// 1. Module-level mutable state - not reactive
// 2. No event system - requires polling in n-toast.tsx
// 3. Mutation without notification
// 4. Will cause same polling pattern as dialogs
// TODO: Refactor to reactive store with event emitter
const toasts: Toast[] = [];

const api: StoreAPIType = {
  get toasts() {
    return toasts;
  },

  add: (toast) => {
    const id = uuid('toast-');

    toasts.push({ ...toast, id });
  },

  async removeAll() {
    // ⚠️ MUTATION PATTERN: Direct array mutation
    // Components won't know this changed unless polling
    toasts.forEach((toast) => (toast.removed = true));

    await sleep(400);

    toasts.length = 0;
  },

  async remove(id: string) {
    const index = toasts.findIndex((toast) => toast.id === id);

    if (index > -1) {
      toasts[index].removed = true;

      await sleep(400);

      toasts.splice(index, 1);
    }
  },
};

export default api;
