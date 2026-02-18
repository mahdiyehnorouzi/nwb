type HashStackListener = (stack: string[]) => void;

let hashStack: string[] = window.location.hash.split('#');
const listeners = new Set<HashStackListener>();

function notify() {
  const snapshot = [...hashStack];
  listeners.forEach((l) => l(snapshot));
}

export default function useLocationHash() {
  const popHash = () => {
    const deletedHash = hashStack.pop();

    history.pushState(
      null,
      '',
      hashStack.length === 1 ? ' ' : `#${hashStack.at(-1)}`,
    );

    notify();
    return deletedHash;
  };

  const pushHash = (newHash: string) => {
    hashStack.push(newHash);
    history.pushState(null, '', `#${newHash}`);
    notify();
  };

  const getLastHash = () => {
    return hashStack.at(-1);
  };

  const getStack = () => [...hashStack];

  const subscribe = (listener: HashStackListener) => {
    listeners.add(listener);
    listener([...hashStack]);
    return () => {
      listeners.delete(listener);
    };
  };

  return {
    hashStack,

    popHash,
    pushHash,
    getLastHash,
    getStack,
    subscribe,
  };
}

