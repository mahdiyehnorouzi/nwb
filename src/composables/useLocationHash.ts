type HashStackListener = (stack: string[]) => void;
import { createStore } from '@stencil/store';

const isBrowser =
  typeof window !== 'undefined' && typeof window.location !== 'undefined';

const { state, onChange } = createStore({
  hashStack: (isBrowser ? window.location.hash.split('#') : ['']) as string[],
});

export default function useLocationHash() {
  const popHash = () => {
    const nextHashStack = [...state.hashStack];
    const deletedHash = nextHashStack.pop();
    state.hashStack = nextHashStack;

    if (typeof history !== 'undefined' && typeof history.pushState === 'function') {
      history.pushState(
        null,
        '',
        state.hashStack.length === 1 ? ' ' : `#${state.hashStack.at(-1)}`,
      );
    }
    return deletedHash;
  };

  const pushHash = (newHash: string) => {
    state.hashStack = [...state.hashStack, newHash];
    if (typeof history !== 'undefined' && typeof history.pushState === 'function') {
      history.pushState(null, '', `#${newHash}`);
    }
  };

  const getLastHash = () => {
    return state.hashStack.at(-1);
  };

  const getStack = () => [...state.hashStack];

  const subscribe = (listener: HashStackListener) => {
    listener([...state.hashStack]);
    return onChange('hashStack', (nextHashStack) => {
      listener([...nextHashStack]);
    });
  };

  return {
    // Medium: this captures `state.hashStack` by reference at call-time.
    // Because `popHash`/`pushHash` reassign `state.hashStack = [...]` rather
    // than mutating, consumers holding `result.hashStack` keep a stale
    // snapshot. Either expose this as a getter, drop it from the return, or
    // direct callers to `getStack()` / `subscribe()`.
    // TODO [ARCHITECTURE]: remove or convert `hashStack` field to a getter.
    hashStack: state.hashStack,

    popHash,
    pushHash,
    getLastHash,
    getStack,
    subscribe,
  };
}

