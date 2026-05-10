export default {
  title: 'Components/Box',
};

export const Elevations = () => `
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;">
    <n-box elevation="none" style="padding: 1rem; min-width: 120px;">none</n-box>
    <n-box elevation="small" style="padding: 1rem; min-width: 120px;">small</n-box>
    <n-box elevation="medium" style="padding: 1rem; min-width: 120px;">medium</n-box>
    <n-box elevation="large" style="padding: 1rem; min-width: 120px;">large</n-box>
  </div>
`;
