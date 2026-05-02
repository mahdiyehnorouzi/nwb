import uuid from '../utils/uuid';
import { createStore } from '@stencil/store';
import type { StoreAPIType, DialogProps, DialogConsumerProps } from './types';

const START_INDEX_OFFSET = -1;
const START_MULTI_DIALOG_Z_INDEX_OFFSET = 60;
const SINGLE_DIALOG_Z_INDEX = 190;

const { state, onChange } = createStore({
  dialogs: [] as DialogProps[],
  selectedDialogId: undefined as string | undefined,
  lastIndex: START_INDEX_OFFSET,
  lastMultiDialogZIndex: START_MULTI_DIALOG_Z_INDEX_OFFSET,
});

const api: StoreAPIType = {
  get lastMultiDialogZIndex() {
    return state.lastMultiDialogZIndex;
  },

  get selectedDialogId() {
    return state.selectedDialogId;
  },

  get dialogs() {
    return state.dialogs;
  },

  add: (dialog: DialogConsumerProps) => {
    const id = uuid('dialog-');
    state.lastIndex += 1;

    if (dialog.multiple) {
      state.lastMultiDialogZIndex += 1;
    }

    const nextDialog: DialogProps = {
      ...dialog,
      id,
      index: state.lastIndex,
      zIndex: dialog.multiple
        ? state.lastMultiDialogZIndex
        : SINGLE_DIALOG_Z_INDEX,
    };
    state.dialogs = [...state.dialogs, nextDialog];
    return id;
  },

  selectNextDialog() {
    const sortedDialogsBasedOnZIndex = [...state.dialogs].sort(
      (firstDialog, secondDialog) =>
        firstDialog.zIndex > secondDialog.zIndex ? -1 : 1
    );

    if (sortedDialogsBasedOnZIndex.length) {
      api.focus(sortedDialogsBasedOnZIndex[0].id);
    }
  },

  remove(id = state.selectedDialogId) {
    if (id) {
      const index = state.dialogs.findIndex((dialog) => dialog.id === id);

      if (index > -1) {
        state.dialogs = state.dialogs.filter((dialog) => dialog.id !== id);

        if (id === state.selectedDialogId) {
          state.selectedDialogId = undefined;
        }

        api.selectNextDialog();
      }
    }
  },

  focus(id: string) {
    const dialog = state.dialogs.find((item) => item.id === id);

    if (dialog) {
      state.selectedDialogId = id;

      if (dialog.zIndex !== state.lastMultiDialogZIndex) {
        state.lastMultiDialogZIndex += 1;
        state.dialogs = state.dialogs.map((item) =>
          item.id === id
            ? { ...item, zIndex: state.lastMultiDialogZIndex }
            : item
        );
      }
    }
  },

  removeAll() {
    state.dialogs = [];
    state.lastIndex = START_INDEX_OFFSET;
    state.lastMultiDialogZIndex = START_MULTI_DIALOG_Z_INDEX_OFFSET;
    state.selectedDialogId = undefined;
  },

  subscribe(listener) {
    listener([...state.dialogs]);
    return onChange('dialogs', (nextDialogs) => {
      // High: silently swallowing subscriber errors hides real bugs in
      // consuming components. At minimum log via `console.error(err)`; ideally
      // let exceptions propagate unless we have a measured failure mode.
      // TODO [ARCHITECTURE]: log or rethrow — don't drop listener errors.
      try {
        listener([...nextDialogs]);
      } catch {
        // ignore listener errors
      }
    });
  },
};

export default api;
