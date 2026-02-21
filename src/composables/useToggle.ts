export function useToggle(initialValue = false): [boolean, (value?: boolean) => void] {
  let active = initialValue;

  const toggle = (value?: boolean): void => {
    active = value !== undefined ? Boolean(value) : !active;
  };

  return [active, toggle];
}
