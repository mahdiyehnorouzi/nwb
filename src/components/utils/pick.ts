export default function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const newObject = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      newObject[key] = obj[key];
    }
  }

  return newObject;
}
