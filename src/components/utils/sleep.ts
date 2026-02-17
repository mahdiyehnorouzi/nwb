export default function sleep(ms = 200) {
    return new Promise((resolve): void => {
      setTimeout(resolve, ms);
    });
  }
  