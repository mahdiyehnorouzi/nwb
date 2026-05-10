export default {
  title: 'Components/Dialog',
};

/** Uses global dialog store (`useDialog`) once components are loaded. */
export const ProgrammaticOpen = () => {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <n-dialog></n-dialog>
    <button type="button" id="dlg-open" style="padding: 10px 16px; cursor: pointer;">
      Open dialog
    </button>
  `;

  queueMicrotask(() => {
    wrap.querySelector('#dlg-open').addEventListener('click', () => {
      const api = window.useDialog && window.useDialog();
      if (!api) {
        console.warn('useDialog not available');
        return;
      }
      api.add({
        title: 'Storybook',
        content: 'Dialog body from the shared store.',
      });
    });
  });

  return wrap;
};
