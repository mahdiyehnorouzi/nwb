export default {
  title: 'Components/Bottom Sheet',
};

export const Basic = () => {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button type="button" id="open-sheet" style="padding: 10px 16px; cursor: pointer;">
      Open bottom sheet
    </button>
    <n-bottom-sheet id="story-sheet" hash-based="false">
      <div slot="header" style="font-weight: 600;">Demo sheet</div>
      <div style="padding: 8px 0;">
        <p style="margin: 0 0 12px;">Sheet body — backdrop and swipe apply per props.</p>
        <div style="height: 120px; background: var(--n-bg-secondary); border-radius: 8px; padding: 12px;">
          Scrollable content area placeholder
        </div>
      </div>
      <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
        <button type="button" id="close-sheet" style="padding: 8px 12px;">Close</button>
      </div>
    </n-bottom-sheet>
  `;

  queueMicrotask(() => {
    const sheet = wrap.querySelector('#story-sheet');
    const openBtn = wrap.querySelector('#open-sheet');
    const closeBtn = wrap.querySelector('#close-sheet');
    openBtn.addEventListener('click', () => sheet.open());
    closeBtn.addEventListener('click', () => sheet.close());
  });

  return wrap;
};
