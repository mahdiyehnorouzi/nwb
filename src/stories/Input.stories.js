export default {
  title: 'Components/Input',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'number', 'textarea'],
    },
    size: {
      control: { type: 'select' },
      options: ['mini', 'small', 'middle'],
    },
  },
};

const Template = ({ label, placeholder, type, size, disabled, clearable }) => `
  <div style="max-width: 360px;">
    <n-input
      label="${label}"
      placeholder="${placeholder}"
      type="${type}"
      size="${size}"
      ${disabled ? 'disabled' : ''}
      ${clearable ? 'clearable' : ''}
    ></n-input>
  </div>
`;

export const Text = Template.bind({});
Text.args = {
  label: 'Label',
  placeholder: 'Type here…',
  type: 'text',
  size: 'middle',
  disabled: false,
  clearable: false,
};

export const Clearable = Template.bind({});
Clearable.args = {
  label: 'Search',
  placeholder: 'Clearable input',
  type: 'text',
  size: 'middle',
  disabled: false,
  clearable: true,
};

export const Textarea = () => `
  <div style="max-width: 420px;">
    <n-input label="Notes" type="textarea" rows="4" placeholder="Long text…"></n-input>
  </div>
`;
