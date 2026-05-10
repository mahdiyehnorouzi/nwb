/** Styles + components come from preview-head.html (`/build/nwb.css`, `/build/nwb.esm.js`) after `npm run build`. */

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: 'var(--n-bg-secondary)' },
        { name: 'canvas', value: 'var(--n-bg-primary)' },
      ],
    },
  },
  tags: ['autodocs'],

  loaders: [
    async () => {
      await waitForStencilRuntime();
      return {};
    },
  ],

  decorators: [
    (storyFn) => {
      const root = document.createElement('div');
      root.className = 'sb-root';
      root.style.padding = '1rem';
      root.style.minHeight = '120px';
      root.style.background = 'var(--n-bg-secondary)';
      root.style.color = 'var(--n-text-primary)';
      const inner = storyFn();
      if (typeof inner === 'string') {
        root.innerHTML = inner;
      } else if (inner instanceof Node) {
        root.appendChild(inner);
      }
      return root;
    },
  ],
};

export default preview;

/** Wait until lazy-loaded Stencil chunks registered at least one custom element. */
function waitForStencilRuntime(timeoutMs = 25000) {
  const start = Date.now();
  const probe = () =>
    typeof customElements !== 'undefined' &&
    (customElements.get('n-button') ||
      customElements.get('n-table') ||
      customElements.get('n-input') ||
      customElements.get('n-dialog'));

  return new Promise((resolve, reject) => {
    const tick = () => {
      if (probe()) return resolve();
      if (Date.now() - start > timeoutMs) {
        reject(
          new Error(
            'Stencil bundle not ready. Run `npm run build` then start Storybook (see package.json scripts).'
          )
        );
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}
