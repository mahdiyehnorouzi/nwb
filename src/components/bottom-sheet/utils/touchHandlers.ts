export interface TouchHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export interface TouchHandlersOptions {
  enabled: boolean;
  sheetRef: HTMLElement | undefined;
  duration: number;
  onSwipeClose: () => void;
}

export function createTouchHandlers({
  enabled,
  sheetRef,
  duration,
  onSwipeClose,
}: TouchHandlersOptions): TouchHandlers {
  let touchStartY: number | null = null;
  let touchDeltaY: number = 0;

  const onTouchStart = (e: TouchEvent) => {
    if (!enabled) return;
    if (!e.touches?.length) return;
    touchStartY = e.touches[0].clientY;
    touchDeltaY = 0;
    e.preventDefault();
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!enabled) return;
    if (touchStartY == null) return;
    const y = e.touches?.[0]?.clientY;
    if (typeof y !== 'number') return;
    touchDeltaY = Math.max(0, y - touchStartY);
    if (sheetRef) {
      sheetRef.style.transform = `translateY(${touchDeltaY}px)`;
      sheetRef.style.transition = 'none';
    }
    e.preventDefault();
  };

  const onTouchEnd = () => {
    if (!enabled) return;
    if (touchStartY == null) return;
    const delta = touchDeltaY;
    touchStartY = null;
    touchDeltaY = 0;

    if (sheetRef) {
      sheetRef.style.transition = `transform ${duration}ms ease`;
      sheetRef.style.transform = '';
    }

    if (delta > 80) {
      onSwipeClose();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
}
