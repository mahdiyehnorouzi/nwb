export default function waitFor(ms = 200) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
