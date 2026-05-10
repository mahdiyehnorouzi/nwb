export default {
  title: 'Components/Loading & Progress',
};

export const LoadingSizes = () => `
  <div style="display: flex; gap: 2rem; align-items: flex-end; flex-wrap: wrap;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <n-loading size="6"></n-loading>
      <span style="font-size: 12px;">size 6</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <n-loading size="10"></n-loading>
      <span style="font-size: 12px;">size 10 (default)</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <n-loading size="14"></n-loading>
      <span style="font-size: 12px;">size 14</span>
    </div>
  </div>
`;

export const ProgressExample = () => `
  <div style="max-width: 320px;">
    <n-progress percentage="40" size="12" progress-color-code="#18a15a" background-color-code="#e5e5e5"></n-progress>
  </div>
`;
