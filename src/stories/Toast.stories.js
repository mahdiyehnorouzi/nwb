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

const Template = ({ position, offset, queued }) => `
  <div style="padding: 20px; min-height: 300px; position: relative;">
    <div style="margin-bottom: 20px;">
      <button onclick="showToast('positive')" style="padding: 8px 16px; margin-right: 10px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">Show Success Toast</button>
      <button onclick="showToast('negative')" style="padding: 8px 16px; margin-right: 10px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Show Error Toast</button>
      <button onclick="showToast('alert')" style="padding: 8px 16px; margin-right: 10px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer;">Show Warning Toast</button>
      <button onclick="showToast('neutral')" style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Show Info Toast</button>
    </div>

    <n-toast
      position="${position}"
      offset="${offset}"
      ${queued ? 'queued' : ''}
      id="toast-demo"
    ></n-toast>

    <script>
      window.showToast = function(variant) {
        const messages = {
          positive: 'Operation completed successfully!',
          negative: 'An error occurred!',
          alert: 'Warning: Please check your input!',
          neutral: 'Information updated successfully.'
        };

        const toast = {
          message: messages[variant],
          variant: variant,
          duration: 3000,
          closable: true,
          showIcon: true
        };

        const toastContainer = document.getElementById('toast-demo');
        if (toastContainer) {
          toastContainer.addToast(toast);
        }
      };

      // Auto-show a demo toast
      setTimeout(() => {
        window.showToast('positive');
      }, 1000);
    </script>
  </div>
`;

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

export const Queued = () => `
  <div style="padding: 20px; min-height: 400px; position: relative;">
    <div style="margin-bottom: 20px;">
      <button onclick="showMultipleToasts()" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Show Multiple Toasts</button>
    </div>

    <n-toast position="bottom" offset="20" queued id="queued-demo"></n-toast>

    <script>
      window.showMultipleToasts = function() {
        const toastContainer = document.getElementById('queued-demo');
        const toasts = [
          { message: 'First toast', variant: 'positive', delay: 0 },
          { message: 'Second toast', variant: 'negative', delay: 500 },
          { message: 'Third toast', variant: 'alert', delay: 1000 },
          { message: 'Fourth toast', variant: 'neutral', delay: 1500 }
        ];

        toasts.forEach(toast => {
          setTimeout(() => {
            if (toastContainer) {
              toastContainer.addToast({
                ...toast,
                duration: 4000,
                closable: true,
                showIcon: true
              });
            }
          }, toast.delay);
        });
      };
    </script>
  </div>
`;