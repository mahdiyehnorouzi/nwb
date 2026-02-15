export default {
  title: 'Components/Toggle Group',
  component: 'n-button-toggle-group',
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['green', 'gray', 'grayGreen'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'middle'],
    },
    rounded: {
      control: { type: 'select' },
      options: ['medium', 'full'],
    },
    modelValue: {
      control: 'number',
    },
  },
};

const Template = ({ color, size, rounded, modelValue }) => `
  <n-button-toggle-group
    color="${color}"
    size="${size}"
    rounded="${rounded}"
    model-value="${modelValue}"
  >
    <n-button-toggle label="All"></n-button-toggle>
    <n-button-toggle label="Active"></n-button-toggle>
    <n-button-toggle label="Completed"></n-button-toggle>
  </n-button-toggle-group>
`;

export const Green = Template.bind({});
Green.args = {
  color: 'green',
  size: 'middle',
  rounded: 'medium',
  modelValue: 0,
};

export const Gray = Template.bind({});
Gray.args = {
  color: 'gray',
  size: 'middle',
  rounded: 'medium',
  modelValue: 1,
};

export const GrayGreen = Template.bind({});
GrayGreen.args = {
  color: 'grayGreen',
  size: 'middle',
  rounded: 'medium',
  modelValue: 2,
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  color: 'green',
  size: 'small',
  rounded: 'medium',
  modelValue: 0,
};

export const FullRounded = Template.bind({});
FullRounded.args = {
  color: 'green',
  size: 'middle',
  rounded: 'full',
  modelValue: 1,
};

export const WithIcons = () => `
  <n-button-toggle-group color="green" model-value="0">
    <n-button-toggle>
      <span slot="icon">📋</span>
      <span>All Tasks</span>
    </n-button-toggle>
    <n-button-toggle>
      <span slot="icon">⏳</span>
      <span>Pending</span>
    </n-button-toggle>
    <n-button-toggle>
      <span slot="icon">✅</span>
      <span>Done</span>
    </n-button-toggle>
  </n-button-toggle-group>
`;

export const IconOnly = () => `
  <n-button-toggle-group color="grayGreen" model-value="1">
    <n-button-toggle>
      <span slot="icon">📊</span>
    </n-button-toggle>
    <n-button-toggle>
      <span slot="icon">📈</span>
    </n-button-toggle>
    <n-button-toggle>
      <span slot="icon">📉</span>
    </n-button-toggle>
  </n-button-toggle-group>
`;

export const DifferentSelections = () => `
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div>
      <h4 style="margin-bottom: 0.5rem;">First Selected</h4>
      <n-button-toggle-group color="green" model-value="0">
        <n-button-toggle label="Option 1"></n-button-toggle>
        <n-button-toggle label="Option 2"></n-button-toggle>
        <n-button-toggle label="Option 3"></n-button-toggle>
      </n-button-toggle-group>
    </div>

    <div>
      <h4 style="margin-bottom: 0.5rem;">Second Selected</h4>
      <n-button-toggle-group color="gray" model-value="1">
        <n-button-toggle label="Tab A"></n-button-toggle>
        <n-button-toggle label="Tab B"></n-button-toggle>
        <n-button-toggle label="Tab C"></n-button-toggle>
      </n-button-toggle-group>
    </div>

    <div>
      <h4 style="margin-bottom: 0.5rem;">Third Selected</h4>
      <n-button-toggle-group color="grayGreen" model-value="2">
        <n-button-toggle label="Choice X"></n-button-toggle>
        <n-button-toggle label="Choice Y"></n-button-toggle>
        <n-button-toggle label="Choice Z"></n-button-toggle>
      </n-button-toggle-group>
    </div>
  </div>
`;

export const AllColors = () => `
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div>
      <h4 style="margin-bottom: 0.5rem;">Green</h4>
      <n-button-toggle-group color="green" model-value="1">
        <n-button-toggle label="All"></n-button-toggle>
        <n-button-toggle label="Active"></n-button-toggle>
        <n-button-toggle label="Completed"></n-button-toggle>
      </n-button-toggle-group>
    </div>

    <div>
      <h4 style="margin-bottom: 0.5rem;">Gray</h4>
      <n-button-toggle-group color="gray" model-value="0">
        <n-button-toggle label="Small"></n-button-toggle>
        <n-button-toggle label="Medium"></n-button-toggle>
        <n-button-toggle label="Large"></n-button-toggle>
      </n-button-toggle-group>
    </div>

    <div>
      <h4 style="margin-bottom: 0.5rem;">GrayGreen</h4>
      <n-button-toggle-group color="grayGreen" model-value="2">
        <n-button-toggle label="Option 1"></n-button-toggle>
        <n-button-toggle label="Option 2"></n-button-toggle>
        <n-button-toggle label="Option 3"></n-button-toggle>
      </n-button-toggle-group>
    </div>
  </div>
`;