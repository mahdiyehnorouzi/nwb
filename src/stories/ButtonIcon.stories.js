export default {
  title: 'Components/Button Icon',
  component: 'n-button-icon',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['fill', 'outline', 'flat', 'plain'],
    },
    color: {
      control: { type: 'select' },
      options: ['green', 'red', 'gray', 'blue'],
    },
    size: {
      control: { type: 'select' },
      options: ['mini', 'xsmall', 'small', 'middle', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

const Template = ({ variant, color, size, disabled }) => `
  <n-button-icon
    variant="${variant}"
    color="${color}"
    size="${size}"
    ${disabled ? 'disabled' : ''}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 13l4 4L19 7"></path>
    </svg>
  </n-button-icon>
`;

export const Fill = Template.bind({});
Fill.args = {
  variant: 'fill',
  color: 'green',
  size: 'middle',
  disabled: false,
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  color: 'green',
  size: 'middle',
  disabled: false,
};

export const Flat = Template.bind({});
Flat.args = {
  variant: 'flat',
  color: 'green',
  size: 'middle',
  disabled: false,
};

export const Plain = Template.bind({});
Plain.args = {
  variant: 'plain',
  color: 'green',
  size: 'middle',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'fill',
  color: 'green',
  size: 'middle',
  disabled: true,
};

export const Sizes = () => `
  <div style="display: flex; gap: 1rem; align-items: end;">
    <n-button-icon size="mini" variant="fill" color="green">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    </n-button-icon>
    <n-button-icon size="xsmall" variant="fill" color="green">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    </n-button-icon>
    <n-button-icon size="small" variant="fill" color="green">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    </n-button-icon>
    <n-button-icon size="middle" variant="fill" color="green">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    </n-button-icon>
    <n-button-icon size="large" variant="fill" color="green">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    </n-button-icon>
  </div>
`;

export const Colors = () => `
  <div style="display: flex; gap: 1rem;">
    <n-button-icon variant="fill" color="green">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    </n-button-icon>
    <n-button-icon variant="fill" color="red">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </n-button-icon>
    <n-button-icon variant="fill" color="gray">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
      </svg>
    </n-button-icon>
  </div>
`;