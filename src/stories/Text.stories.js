export default {
  title: 'Components/Text',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['3xl', '2xl', 'xl', 'h1', 'h2', 'h3', 'body', 'subtitle', 'caption1', 'caption2', 'overline'],
    },
    tag: {
      control: { type: 'select' },
      options: ['span', 'p', 'h1', 'h2', 'h3', 'label'],
    },
    weight: {
      control: { type: 'select' },
      options: ['regular', 'medium', 'bold'],
    },
  },
};

const Template = ({ variant, tag, weight, slot }) => `
  <n-text variant="${variant}" tag="${tag}" weight="${weight}">
    ${slot}
  </n-text>
`;

export const Body = Template.bind({});
Body.args = {
  variant: 'body',
  tag: 'p',
  weight: 'regular',
  slot: 'Body text using n-text.',
};

export const Heading = Template.bind({});
Heading.args = {
  variant: 'h2',
  tag: 'h2',
  weight: 'bold',
  slot: 'Section heading',
};
