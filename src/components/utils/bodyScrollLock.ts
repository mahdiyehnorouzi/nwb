// STATE MANAGEMENT: Module-level mutable state
// Issue: Multiple components calling this creates unpredictable behavior
// Example: If Dialog and BottomSheet both use this, unlocking one unlocks all
// TODO: Refactor to reference counting or stack-based approach
let bodyOverflowBefore: string | undefined;

export function lockBodyScroll() {
  // TODO [SSR]: Add typeof document check - will crash on server
  if (bodyOverflowBefore == null) {
    bodyOverflowBefore = document.body.style.overflow;
  }
  document.body.style.overflow = 'hidden';
}

export function unlockBodyScroll() {
  // BUG: Last one to unlock wins
  // If component A locks, component B locks, component B unlocks:
  // - Body is unlocked even though A still needs it locked
  // - No reference counting
  if (bodyOverflowBefore != null) {
    document.body.style.overflow = bodyOverflowBefore;
    bodyOverflowBefore = undefined;
  }
}
