export default {
  title: 'Components/Switch',
  component: 'n-switch',
  argTypes: {
    modelValue: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['start', 'end'],
    },
  },
};

const Template = ({ modelValue, disabled, loading, label, labelPosition }) => `
  <n-switch
    ${modelValue ? 'model-value' : ''}
    ${disabled ? 'disabled' : ''}
    ${loading ? 'loading' : ''}
    label="${label}"
    label-position="${labelPosition}"
  ></n-switch>
`;

export const Default = Template.bind({});
Default.args = {
  modelValue: false,
  disabled: false,
  loading: false,
  label: 'Default Switch',
  labelPosition: 'end',
};

export const Checked = Template.bind({});
Checked.args = {
  modelValue: true,
  disabled: false,
  loading: false,
  label: 'Checked Switch',
  labelPosition: 'end',
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: false,
  disabled: true,
  loading: false,
  label: 'Disabled Switch',
  labelPosition: 'end',
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  modelValue: true,
  disabled: true,
  loading: false,
  label: 'Disabled Checked',
  labelPosition: 'end',
};

export const Loading = Template.bind({});
Loading.args = {
  modelValue: false,
  disabled: false,
  loading: true,
  label: 'Loading Switch',
  labelPosition: 'end',
};

export const LoadingChecked = Template.bind({});
LoadingChecked.args = {
  modelValue: true,
  disabled: false,
  loading: true,
  label: 'Loading Checked',
  labelPosition: 'end',
};

export const LabelStart = Template.bind({});
LabelStart.args = {
  modelValue: false,
  disabled: false,
  loading: false,
  label: 'Label at Start',
  labelPosition: 'start',
};

export const WithoutLabel = () => `
  <div style="display: flex; gap: 1rem; align-items: center;">
    <n-switch></n-switch>
    <span style="color: #666;">No Label</span>
  </div>
`;

export const AllStates = () => `
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <h3>Basic States</h3>
    <n-switch label="Off"></n-switch>
    <n-switch model-value label="On"></n-switch>

    <h3>Disabled States</h3>
    <n-switch disabled label="Disabled Off"></n-switch>
    <n-switch disabled model-value label="Disabled On"></n-switch>

    <h3>Loading States</h3>
    <n-switch loading label="Loading Off"></n-switch>
    <n-switch loading model-value label="Loading On"></n-switch>

    <h3>Label Positions</h3>
    <n-switch model-value label="Label at End (Default)" label-position="end"></n-switch>
    <n-switch model-value label="Label at Start" label-position="start"></n-switch>
  </div>
`;