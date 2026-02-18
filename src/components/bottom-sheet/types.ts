export type BottomSheetSnapPoint = number | `${number}%`;

export type BottomSheetCloseReason = 'backdrop' | 'swipe' | 'programmatic' | 'popstate';

export interface NBottomSheetClosingStartedDetail {
  reason: BottomSheetCloseReason;
}

