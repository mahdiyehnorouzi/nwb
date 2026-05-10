export default {
  title: 'Components/Toast',
  component: 'n-toast',
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
    },
    offset: {
      control: 'number',
    },
    queued: {
      control: 'boolean',
    },
  },
};

const messages = {
  positive: 'Operation completed successfully!',
  negative: 'An error occurred!',
  alert: 'Warning: Please check your input!',
  neutral: 'Information updated successfully.',
};

function btn(label, bg, onClick) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.style.cssText =
    'padding: 8px 16px; margin-right: 10px; margin-bottom: 8px; color: white; border: none; border-radius: 4px; cursor: pointer;';
  b.style.background = bg;
  b.addEventListener('click', onClick);
  return b;
}

const Template = ({ position, offset, queued }) => {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding: 20px; min-height: 300px; position: relative;';

  const row = document.createElement('div');
  row.style.marginBottom = '20px';

  const nt = document.createElement('n-toast');
  nt.setAttribute('position', position);
  nt.setAttribute('offset', String(offset));
  if (queued) nt.setAttribute('queued', '');
  nt.id = 'toast-demo';

  const show = (variant) => {
    nt.addToast({
      message: messages[variant],
      variant,
      duration: 3000,
      closable: true,
      showIcon: true,
    });
  };

  row.appendChild(btn('Success', '#10b981', () => show('positive')));
  row.appendChild(btn('Error', '#ef4444', () => show('negative')));
  row.appendChild(btn('Warning', '#f59e0b', () => show('alert')));
  row.appendChild(btn('Info', '#6b7280', () => show('neutral')));

  wrap.appendChild(row);
  wrap.appendChild(nt);

  queueMicrotask(() => show('positive'));

  return wrap;
};

export const Default = Template.bind({});
Default.args = {
  position: 'bottom',
  offset: 20,
  queued: false,
};

export const TopPosition = Template.bind({});
TopPosition.args = {
  position: 'top',
  offset: 20,
  queued: false,
};

export const Queued = () => {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding: 20px; min-height: 400px; position: relative;';

  const nt = document.createElement('n-toast');
  nt.setAttribute('position', 'bottom');
  nt.setAttribute('offset', '20');
  nt.setAttribute('queued', '');
  nt.id = 'queued-demo';

  const multi = btn('Show multiple toasts', '#3b82f6', () => {
    const list = [
      { message: 'First toast', variant: 'positive', delay: 0 },
      { message: 'Second toast', variant: 'negative', delay: 500 },
      { message: 'Third toast', variant: 'alert', delay: 1000 },
      { message: 'Fourth toast', variant: 'neutral', delay: 1500 },
    ];
    list.forEach(({ message, variant, delay }) => {
      setTimeout(() => {
        nt.addToast({
          message,
          variant,
          duration: 4000,
          closable: true,
          showIcon: true,
        });
      }, delay);
    });
  });

  wrap.appendChild(multi);
  wrap.appendChild(nt);
  return wrap;
};
