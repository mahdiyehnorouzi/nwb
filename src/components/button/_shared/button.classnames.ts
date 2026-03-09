// NOTE: This is a simple className utility
// Consider: Use clsx or classnames library for more complex cases
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}
