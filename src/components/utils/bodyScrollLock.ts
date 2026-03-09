let bodyOverflowBefore: string | undefined;
let lockCount = 0;

export function lockBodyScroll() {
  if (typeof document === 'undefined') {
    return;
  }

  if (lockCount === 0) {
    bodyOverflowBefore = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  lockCount += 1;
}

export function unlockBodyScroll() {
  if (typeof document === 'undefined') {
    return;
  }

  if (lockCount === 0) {
    return;
  }

  lockCount -= 1;

  if (lockCount === 0) {
    if (bodyOverflowBefore != null) {
      document.body.style.overflow = bodyOverflowBefore;
    }
    bodyOverflowBefore = undefined;
  }
}
