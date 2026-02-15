const sampleUsers = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York', status: 'Active', department: 'Engineering', salary: '$75,000' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'San Francisco', status: 'Active', department: 'Design', salary: '$70,000' },
  { id: 3, name: 'Bob Johnson', age: 45, city: 'Chicago', status: 'Inactive', department: 'Marketing', salary: '$80,000' },
  { id: 4, name: 'Alice Brown', age: 29, city: 'Los Angeles', status: 'Active', department: 'Engineering', salary: '$78,000' },
  { id: 5, name: 'Charlie Wilson', age: 38, city: 'Seattle', status: 'Active', department: 'Sales', salary: '$65,000' }
];

const extendedUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-234-567-8901', company: 'Tech Corp', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-234-567-8902', company: 'Design Inc', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1-234-567-8903', company: 'Marketing LLC', role: 'Manager' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1-234-567-8904', company: 'Tech Corp', role: 'Engineer' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '+1-234-567-8905', company: 'Sales Co', role: 'Sales Rep' }
];

export default {
  title: 'Components/Table',
  component: 'n-table',
  argTypes: {
    striped: {
      control: 'boolean',
    },
    selectable: {
      control: 'boolean',
    },
    fixedHeader: {
      control: 'boolean',
    },
    sortMultiple: {
      control: 'boolean',
    },
  },
};

const BasicTemplate = ({ striped, selectable, fixedHeader, sortMultiple }) => `
  <div style="max-height: 400px; overflow: auto;">
    <n-table
      ${striped ? 'striped' : ''}
      ${selectable ? 'selectable' : ''}
      ${fixedHeader ? 'fixed-header' : ''}
      ${sortMultiple ? 'sort-multiple' : ''}
    >
      <n-table-column prop="name" label="Name" sortable></n-table-column>
      <n-table-column prop="age" label="Age" sortable></n-table-column>
      <n-table-column prop="city" label="City"></n-table-column>
      <n-table-column prop="status" label="Status"></n-table-column>
    </n-table>
  </div>
  <script>
    // Set data after component is rendered
    setTimeout(() => {
      const table = document.querySelector('n-table');
      if (table) {
        table.data = ${JSON.stringify(sampleUsers)};
      }
    }, 100);
  </script>
`;

const ExtendedTemplate = ({ striped, selectable, fixedHeader, sortMultiple }) => `
  <div style="max-height: 400px; overflow: auto;">
    <n-table
      ${striped ? 'striped' : ''}
      ${selectable ? 'selectable' : ''}
      ${fixedHeader ? 'fixed-header' : ''}
      ${sortMultiple ? 'sort-multiple' : ''}
    >
      <n-table-column prop="name" label="Name" sortable></n-table-column>
      <n-table-column prop="email" label="Email"></n-table-column>
      <n-table-column prop="phone" label="Phone"></n-table-column>
      <n-table-column prop="company" label="Company"></n-table-column>
      <n-table-column prop="role" label="Role"></n-table-column>
    </n-table>
  </div>
  <script>
    setTimeout(() => {
      const table = document.querySelector('n-table');
      if (table) {
        table.data = ${JSON.stringify(extendedUsers)};
      }
    }, 100);
  </script>
`;

export const Basic = BasicTemplate.bind({});
Basic.args = {
  striped: false,
  selectable: false,
  fixedHeader: false,
  sortMultiple: false,
};

export const Striped = BasicTemplate.bind({});
Striped.args = {
  striped: true,
  selectable: false,
  fixedHeader: false,
  sortMultiple: false,
};

export const Selectable = BasicTemplate.bind({});
Selectable.args = {
  striped: false,
  selectable: true,
  fixedHeader: false,
  sortMultiple: false,
};

export const FixedHeader = ExtendedTemplate.bind({});
FixedHeader.args = {
  striped: true,
  selectable: false,
  fixedHeader: true,
  sortMultiple: false,
};

export const SortMultiple = BasicTemplate.bind({});
SortMultiple.args = {
  striped: false,
  selectable: false,
  fixedHeader: false,
  sortMultiple: true,
};

export const WithIndex = () => `
  <div style="max-height: 300px; overflow: auto;">
    <n-table>
      <n-table-column type="index" label="#" width="60"></n-table-column>
      <n-table-column prop="name" label="Name" sortable></n-table-column>
      <n-table-column prop="age" label="Age" sortable></n-table-column>
      <n-table-column prop="city" label="City"></n-table-column>
    </n-table>
  </div>
  <script>
    setTimeout(() => {
      const table = document.querySelector('n-table');
      if (table) {
        table.data = ${JSON.stringify(sampleUsers.slice(0, 3))};
      }
    }, 100);
  </script>
`;

export const Compact = () => `
  <n-table>
    <n-table-column prop="id" label="ID" width="80"></n-table-column>
    <n-table-column prop="name" label="Name"></n-table-column>
    <n-table-column prop="status" label="Status" width="100" align="center"></n-table-column>
  </n-table>
  <script>
    setTimeout(() => {
      const table = document.querySelector('n-table');
      if (table) {
        table.data = [
          { id: '001', name: 'Wireless Mouse', status: 'Active' },
          { id: '002', name: 'Bluetooth Keyboard', status: 'Active' },
          { id: '003', name: 'USB Cable', status: 'Inactive' },
          { id: '004', name: 'HDMI Adapter', status: 'Active' }
        ];
      }
    }, 100);
  </script>
`;

export const ColumnAlignments = () => `
  <div style="max-height: 300px; overflow: auto;">
    <n-table>
      <n-table-column prop="name" label="Left Aligned" align="left"></n-table-column>
      <n-table-column prop="age" label="Center Aligned" align="center"></n-table-column>
      <n-table-column prop="salary" label="Right Aligned" align="right"></n-table-column>
      <n-table-column prop="status" label="Default" sortable></n-table-column>
    </n-table>
  </div>
  <script>
    setTimeout(() => {
      const table = document.querySelector('n-table');
      if (table) {
        table.data = [
          { name: 'Left Text', age: 25, salary: '$50,000', status: 'Active' },
          { name: 'Center Text', age: 30, salary: '$60,000', status: 'Inactive' },
          { name: 'Right Text', age: 35, salary: '$70,000', status: 'Active' }
        ];
      }
    }, 100);
  </script>
`;