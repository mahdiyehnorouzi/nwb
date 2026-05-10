/** Surface + shape; shadow comes from `elevation` on the host. */
const BOX_BASE = 'box-border rounded-xl bg-neutral-primary text-neutral-primary';

const ELEVATION_CLASS: Record<'none' | 'small' | 'medium' | 'large', string> = {
  none: '',
  small: 'shadow-small',
  medium: 'shadow-medium',
  large: 'shadow-large',
};

export { BOX_BASE, ELEVATION_CLASS };
