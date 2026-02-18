let bodyOverflowBefore: string | undefined;

export function lockBodyScroll() {
  if (bodyOverflowBefore == null) {
    bodyOverflowBefore = document.body.style.overflow;
  }
  document.body.style.overflow = 'hidden';
}

export function unlockBodyScroll() {
  if (bodyOverflowBefore != null) {
    document.body.style.overflow = bodyOverflowBefore;
    bodyOverflowBefore = undefined;
  }
}
