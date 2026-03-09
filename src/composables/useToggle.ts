//  ANTI-PATTERN: Non-reactive composable
// Issues:
// 1. Closure-based state doesn't integrate with Stencil's reactivity
// 2. No @State or @Watch triggers re-renders
// 3. Mimics React hooks but doesn't work the same way
// 4. Component won't re-render when toggle is called
//
// RECOMMENDED FIX:
// Don't use composables in Stencil - use @State in components directly:
//   @State() active: boolean = false;
//   toggle = () => { this.active = !this.active; };
//
// OR if shared logic is needed, return object methods:
//   export const createToggle = (initial: boolean) => ({
//     value: initial,
//     toggle(this: any) { this.value = !this.value; }
//   });
//
// TODO: Remove this composable or convert to proper Stencil pattern
export function useToggle(initialValue = false): [boolean, (value?: boolean) => void] {
  let active = initialValue;

  const toggle = (value?: boolean): void => {
    active = value !== undefined ? Boolean(value) : !active;
  };

  return [active, toggle];
}
