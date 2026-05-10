export default {
  title: 'Components/Cheap',
};

export const FillColors = () => `
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <n-cheap variant="fill" color="gray" label="Gray"></n-cheap>
    <n-cheap variant="fill" color="green" label="Green"></n-cheap>
    <n-cheap variant="fill" color="red" label="Red"></n-cheap>
    <n-cheap variant="fill" color="blue" label="Blue"></n-cheap>
    <n-cheap variant="fill" color="yellow" label="Yellow"></n-cheap>
  </div>
`;

export const OutlineColors = () => `
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <n-cheap variant="outline" color="green" label="Green"></n-cheap>
    <n-cheap variant="outline" color="gray" label="Gray"></n-cheap>
    <n-cheap variant="plain" color="blue" label="Plain blue"></n-cheap>
  </div>
`;
