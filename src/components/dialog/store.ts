import uuid from '../utils/uuid';
import type { StoreAPIType, DialogProps, DialogConsumerProps } from './types';

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

if (typeof window !== 'undefined') {
  (window as any).nwbDialogStore = api;
  (window as any).useDialog = () => api;
}
