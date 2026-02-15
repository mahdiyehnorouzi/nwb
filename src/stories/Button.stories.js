export default {
  title: 'Components/Button',
  component: 'n-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['fill', 'outline', 'flat', 'plain'],
    },
    color: {
      control: { type: 'select' },
      options: ['green', 'red', 'gray'],
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

const Template = ({ variant, color, size, disabled, children }) => `
  <div style="padding: 20px;">
    <n-button
      variant="${variant}"
      color="${color}"
      size="${size}"
      ${disabled ? 'disabled' : ''}
    >
      ${children}
    </n-button>
  </div>
`;

export const Fill = () => `
  <div style="padding: 20px; background: #f5f5f5; min-height: 100px;">
    <script>
      // Load components if not loaded
      if (!window.customElements.get('n-button')) {
        const script = document.createElement('script');
        script.src = '/build/nwb.esm.js';
        script.type = 'module';
        document.head.appendChild(script);
      }
    </script>
    <n-button variant="fill" color="green" size="middle">
      Fill Button
    </n-button>
  </div>
`;

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  color: 'green',
  size: 'middle',
  disabled: false,
  children: 'Outline Button',
};

export const Flat = Template.bind({});
Flat.args = {
  variant: 'flat',
  color: 'green',
  size: 'middle',
  disabled: false,
  children: 'Flat Button',
};

export const Plain = Template.bind({});
Plain.args = {
  variant: 'plain',
  color: 'green',
  size: 'middle',
  disabled: false,
  children: 'Plain Button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'fill',
  color: 'green',
  size: 'middle',
  disabled: false,
  children: '<span slot="icon">✅</span> With Icon',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'fill',
  color: 'green',
  size: 'middle',
  disabled: true,
  children: 'Disabled Button',
};

export const Sizes = () => `
  <div style="display: flex; gap: 1rem; align-items: end;">
    <n-button size="mini" variant="fill" color="green">Mini</n-button>
    <n-button size="xsmall" variant="fill" color="green">XSmall</n-button>
    <n-button size="small" variant="fill" color="green">Small</n-button>
    <n-button size="middle" variant="fill" color="green">Middle</n-button>
    <n-button size="large" variant="fill" color="green">Large</n-button>
  </div>
`;

export const Colors = () => `
  <div style="display: flex; gap: 1rem;">
    <n-button variant="fill" color="green">Green</n-button>
    <n-button variant="fill" color="red">Red</n-button>
    <n-button variant="fill" color="gray">Gray</n-button>
  </div>
`;