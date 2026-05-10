export default {
  title: 'Components/Field',
};

export const WithError = () => `
  <n-field label="Email" label-position="top" required error="Invalid email" show-error>
    <div slot="input">
      <n-input placeholder="you@example.com" type="text"></n-input>
    </div>
  </n-field>
`;

export const InlineLabel = () => `
  <n-field label="Name" label-position="inline" required>
    <div slot="input">
      <n-input placeholder="Jane" type="text"></n-input>
    </div>
  </n-field>
`;
