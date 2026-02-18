export type UseGroupStateOptions = {
  initialState: number | number[];
  syncStateFrom: number | number[];
  multiple: boolean;
};

export type UseGroupStateReturn = {
  isActive: (index: number) => boolean;
  toggle: (index: number) => number | number[];
  onStateChange: (callback: (value: number | number[]) => void) => void;
};

export default function useGroupState({
  initialState,
  syncStateFrom,
  multiple,
}: UseGroupStateOptions): UseGroupStateReturn {
  let state: number | number[] = initialState;
  let stateChangeCallbacks: Array<(value: number | number[]) => void> = [];

  const isActive = (index: number): boolean => {
    if (multiple) {
      return (state as number[]).includes(index);
    }
    return state === index;
  };

  const toggle = (index: number): number | number[] => {
    if (multiple) {
      const stateArray = state as number[];
      const exists = stateArray.includes(index);
      state = exists
        ? stateArray.filter(i => i !== index)
        : [...stateArray, index];
    } else {
      state = state === index ? -1 : index;
    }

    if (Array.isArray(syncStateFrom)) {
      if (multiple) {
        state = syncStateFrom as number[];
      }
    } else {
      if (!multiple) {
        state = syncStateFrom as number;
      }
    }

    stateChangeCallbacks.forEach(callback => callback(state));

    return state;
  };

  const onStateChange = (callback: (value: number | number[]) => void) => {
    stateChangeCallbacks.push(callback);
  };

  return {
    isActive,
    toggle,
    onStateChange,
  };
}
