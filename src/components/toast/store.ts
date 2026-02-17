import type { StoreAPIType, Toast } from './types';
import uuid from '../utils/uuid';
import sleep from '../utils/sleep';

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
