import uuid from '../utils/uuid';
import type { StoreAPIType, DialogProps, DialogConsumerProps } from './types';

// TODO [ARCHITECTURE]: Refactor to event-driven architecture
// Current implementation uses mutable module-level state which:
// 1. Breaks SSR/SSG compatibility
// 2. Doesn't follow reactive patterns
// 3. Requires polling in components (see n-dialog.tsx)
// Recommended: Use Stencil Store or implement Observer pattern

// FIX [STATE MANAGEMENT]: Module-level state is not reactive
// Components must poll this state every 50ms to detect changes
// Consider: createStore pattern with subscribe/notify mechanism
const START_INDEX_OFFSET = -1;
const START_MULTI_DIALOG_Z_INDEX_OFFSET = 60;
const SINGLE_DIALOG_Z_INDEX = 190;

let dialogs: DialogProps[] = [];
let selectedDialogId: string | undefined;
let lastIndex = START_INDEX_OFFSET;
let lastMultiDialogZIndex = START_MULTI_DIALOG_Z_INDEX_OFFSET;

const api: StoreAPIType = {
  get lastMultiDialogZIndex() {
    return lastMultiDialogZIndex;
  },

  get selectedDialogId() {
    return selectedDialogId;
  },

  get dialogs() {
    return dialogs;
  },

  add: (dialog: DialogConsumerProps) => {
    const id = uuid('dialog-');

    lastIndex++;

    if (dialog.multiple) {
      lastMultiDialogZIndex++;
    }

    dialogs.push({
      ...dialog,
      id,
      index: lastIndex,
      zIndex: dialog.multiple
        ? lastMultiDialogZIndex
        : SINGLE_DIALOG_Z_INDEX,
    });

    return id;
  },

  selectNextDialog() {
    const sortedDialogsBasedOnZIndex = [...dialogs].sort(
      (firstDialog, secondDialog) =>
        firstDialog.zIndex > secondDialog.zIndex ? -1 : 1
    );

    if (sortedDialogsBasedOnZIndex.length) {
      api.focus(sortedDialogsBasedOnZIndex[0].id);
    }
  },

  remove(id = selectedDialogId) {
    if (id) {
      const index = dialogs.findIndex((dialog) => dialog.id === id);

      if (index > -1) {
        dialogs.splice(index, 1);

        if (id === selectedDialogId) {
          selectedDialogId = undefined;
        }

        api.selectNextDialog();
      }
    }
  },

  focus(id: string) {
    const dialog = dialogs.find((dialog) => dialog.id === id);

    if (dialog) {
      selectedDialogId = id;

      if (dialog.zIndex !== lastMultiDialogZIndex) {
        lastMultiDialogZIndex++;
        dialog.zIndex = lastMultiDialogZIndex;
      }
    }
  },

  removeAll() {
    dialogs = [];
    lastIndex = START_INDEX_OFFSET;
    lastMultiDialogZIndex = START_MULTI_DIALOG_Z_INDEX_OFFSET;
    selectedDialogId = undefined;
  },
};

export default api;

//  ANTI-PATTERN: Global namespace pollution
// Issues:
// 1. Breaks SSR - code will crash on server
// 2. No encapsulation - can be overwritten by other libraries
// 3. Memory leaks - no cleanup mechanism
// 4. Type safety lost with 'any' casting
// FIX: Remove window globals, use proper event system or Stencil Store
// Alternative: Custom elements can use CustomEvent for cross-component communication
if (typeof window !== 'undefined') {
  (window as any).nwbDialogStore = api;
  (window as any).useDialog = () => api;
}
