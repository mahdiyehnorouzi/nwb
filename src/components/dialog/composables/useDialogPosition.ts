import { UseDialogPositionParamsType, MoveDirection } from '../types';
import { BASE_OFFSET_LIMIT, NEW_DIALOG_OFFSET } from '../constants';
import * as UTILS from '../utils/position';
import { useDialogDirection } from './useDialogDirection';

export function useDialogPosition(params: UseDialogPositionParamsType): {
  x: number;
  y: number;
  direction: MoveDirection;
  isDragging: boolean;
  handleDialogResize: (oldDialogWidth: number, oldDialogHeight: number) => void;
  setPosition: (x: number, y: number) => void;
  setIsDragging: (value: boolean) => void;
} {
  const {
    index,
    wrapperRef,
    draggableRef,
    referenceElementRef,
    placement,
  } = params;

  let x = 0;
  let y = 0;
  let centerX = 0;
  let centerY = 0;
  let offset = referenceElementRef ? 0 : index * NEW_DIALOG_OFFSET;
  let isDialogRendered = false;
  let isDraggingDialog = false;

  const getWindowSize = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const getDialogSize = () => {
    if (!wrapperRef) {
      return { width: 0, height: 0 };
    }
    return {
      width: wrapperRef.offsetWidth || 0,
      height: wrapperRef.offsetHeight || 0,
    };
  };

  const getHeaderHeight = () => {
    if (!draggableRef) {
      return 0;
    }
    return draggableRef.offsetHeight || 0;
  };

  const referenceElement = referenceElementRef 
    ? (referenceElementRef.$el || referenceElementRef)
    : null;

  const { direction } = useDialogDirection({
    x,
    referenceElement: referenceElement as HTMLElement | undefined,
    placement,
    isDialogRendered,
  });

  const calcFinalHorizontalPosition = (xPos: number) => {
    const { width: windowWidth } = getWindowSize();
    const { width: dialogWidth } = getDialogSize();
    const rightOffsetLimit = windowWidth - dialogWidth - BASE_OFFSET_LIMIT;

    return UTILS.calcFinalHorizontalPositionBasedOnLimits({
      x: xPos,
      windowWidth,
      dialogWidth,
      leftOffsetLimit: BASE_OFFSET_LIMIT,
      rightOffsetLimit,
      direction,
    });
  };

  const calcFinalVerticalPosition = (yPos: number) => {
    const { height: windowHeight } = getWindowSize();
    const bottomOffsetLimit = windowHeight - getHeaderHeight();

    return UTILS.calcFinalVerticalPositionBasedOnLimits({
      y: yPos,
      topOffsetLimit: BASE_OFFSET_LIMIT,
      bottomOffsetLimit,
    });
  };

  const calcHorizontalPositionOnDialogResize = () => {
    const { width: dialogWidth } = getDialogSize();
    const { width: windowWidth } = getWindowSize();
    let newX;

    if (referenceElementRef && referenceElement && !isDialogRendered) {
      newX = UTILS.calcHorizontalPositionBasedOnReferenceElement({
        placement: placement,
        dialogWidth,
        referenceElement: referenceElement as HTMLElement,
      });
    } else if (!referenceElementRef) {
      if (placement) {
        const isLeft = placement.includes('left');
        const isRight = placement.includes('right');
        
        if (isLeft) {
          newX = BASE_OFFSET_LIMIT;
        } else if (isRight) {
          newX = windowWidth - dialogWidth - BASE_OFFSET_LIMIT;
        } else {
          newX = (windowWidth - dialogWidth) / 2;
        }
      } else {
        newX = (windowWidth - dialogWidth) / 2;
      }
    } else {
      newX = UTILS.calcHorizontalPositionBasedOnCenterCoordinate({
        centerX,
        prevDialogWidth: dialogWidth,
        offset,
      });
    }

    return calcFinalHorizontalPosition(newX);
  };

  const calcVerticalPositionOnDialogResize = () => {
    const { height: dialogHeight } = getDialogSize();
    const { height: windowHeight } = getWindowSize();
    let newY;

    if (referenceElementRef && referenceElement && !isDialogRendered) {
      newY = UTILS.calcVerticalPositionBasedOnReferenceElement({
        placement: placement,
        dialogHeight,
        referenceElement: referenceElement as HTMLElement,
      });
    } else if (!referenceElementRef) {
      if (placement) {
        const isTop = placement.includes('top');
        const isBottom = placement.includes('bottom');
        
        if (isTop) {
          newY = BASE_OFFSET_LIMIT;
        } else if (isBottom) {
          newY = windowHeight - dialogHeight - BASE_OFFSET_LIMIT;
        } else {
          newY = (windowHeight - dialogHeight) / 2;
        }
      } else {
        newY = (windowHeight - dialogHeight) / 2;
      }
    } else {
      newY = UTILS.calcVerticalPositionBasedOnCenterCoordinate({
        centerY,
        prevDialogHeight: dialogHeight,
        offset,
      });
    }

    return calcFinalVerticalPosition(newY);
  };

  const handleHorizontalPositionOnDialogResize = (oldDialogWidth: number) => {
    const { width: windowWidth } = getWindowSize();

    centerX = UTILS.calcCenterHorizontalPositionBasedOnDialog({
      x,
      windowWidth,
      dialogWidth: oldDialogWidth,
      direction,
    });

    x = calcHorizontalPositionOnDialogResize();
  };

  const handleVerticalPositionOnDialogResize = (oldDialogHeight: number) => {
    const { height: windowHeight } = getWindowSize();

    centerY = UTILS.calcCenterVerticalPositionBasedOnDialog({
      y,
      windowHeight,
      dialogHeight: oldDialogHeight,
    });

    y = calcVerticalPositionOnDialogResize();
  };

  const handleDialogResize = (oldDialogWidth: number, oldDialogHeight: number) => {
    if (referenceElementRef) {
      handleHorizontalPositionOnDialogResize(oldDialogWidth);
      handleVerticalPositionOnDialogResize(oldDialogHeight);
    } else {
      x = calcHorizontalPositionOnDialogResize();
      y = calcVerticalPositionOnDialogResize();
    }

    if (!isDialogRendered) {
      isDialogRendered = true;
      offset = 0;
    }
  };

  const setPosition = (xPos: number, yPos: number) => {
    x = calcFinalHorizontalPosition(xPos);
    y = calcFinalVerticalPosition(yPos);
  };

  const setIsDragging = (value: boolean) => {
    isDraggingDialog = value;
  };

  if (!referenceElementRef) {
  } else if (referenceElement && !isDialogRendered) {
    x = calcHorizontalPositionOnDialogResize();
    y = calcVerticalPositionOnDialogResize();
  }

  return {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get direction() {
      return direction;
    },
    get isDragging() {
      return isDraggingDialog;
    },
    handleDialogResize,
    setPosition,
    setIsDragging,
  };
}
