export const BASE = 'text-neutral-primary p-2';

export const WRAPPER_BASE = 'fixed inset-0 z-200';
export const BACKDROP_BASE = 'absolute inset-0 transition-opacity';
export const SHEET_CONTAINER_BASE = 'absolute left-0 right-0 bottom-0 w-full transition-transform rounded-t-lg overflow-hidden';
export const HANDLE_BUTTON_BASE = 'w-full flex items-center justify-center py-2';
export const HANDLE_SPAN_BASE = 'block h-1 w-12 rounded-full';

export const getWrapperClasses = (visible: boolean) =>
  visible ? 'pointer-events-auto' : 'pointer-events-none';

export const getBackdropClasses = (visible: boolean) =>
  visible ? 'opacity-100' : 'opacity-0';

export const getSheetClasses = (visible: boolean) =>
  visible ? 'translate-y-0' : 'translate-y-full';

export const getBackdropStyles = (duration: number) => ({
  transitionDuration: `${duration}ms`,
  background: 'var(--vsbs-backdrop-bg, #1e1d1db3)',
});

export const getSheetStyles = (duration: number, maxHeight?: string) => ({
  transitionDuration: `${duration}ms`,
  background: 'var(--vsbs-background, #fff)',
  borderColor: 'var(--vsbs-border-color, transparent)',
  maxWidth: 'var(--vsbs-max-width, 100%)',
  maxHeight,
  paddingLeft: 'var(--vsbs-padding-x, 0)',
  paddingRight: 'var(--vsbs-padding-x, 0)',
  touchAction: 'pan-y' as const,
});

export const getHandleStyles = () => ({
  background: 'var(--vsbs-handle-background, #d8d8d8)',
});

// Class generation helpers
export const getHeaderClass = (baseClass?: string, headerClass?: string) => {
  let cls = BASE;
  if (baseClass?.length) cls = baseClass;
  if (headerClass?.length) cls = `${cls} ${headerClass}`;
  return cls;
};

export const getContentClass = (
  baseClass?: string,
  contentClass?: string,
  hasFooterSlot: boolean = false,
  removeFooterPadding: boolean = false,
) => {
  let cls = BASE;
  if (baseClass?.length) cls = baseClass;
  if (contentClass?.length) cls = `${cls} ${contentClass}`;

  if (!hasFooterSlot) {
    cls = `${cls} ${removeFooterPadding ? '!pb-0' : '!pb-10'}`;
  }

  return cls;
};

export const getFooterClass = (
  baseClass?: string,
  footerClass?: string,
  removeFooterPadding: boolean = false,
) => {
  let cls = BASE;
  if (baseClass?.length) cls = baseClass;
  if (footerClass?.length) cls = `${cls} ${footerClass}`;
  cls = `${cls} ${removeFooterPadding ? '!pb-0' : '!pb-10'}`;
  return cls;
};
