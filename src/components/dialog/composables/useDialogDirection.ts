import { MoveDirection, UseDialogDirectionParamsType } from '../types';

export function useDialogDirection({
  x,
  referenceElement,
  placement,
  isDialogRendered,
}: UseDialogDirectionParamsType): { direction: MoveDirection } {
  let direction: MoveDirection = 'left';

  const windowWidth = window.innerWidth;
  const middleOfWindowWidth = windowWidth / 2;

  const calcDirection = (): MoveDirection => {
    if (referenceElement && !isDialogRendered) {
      return calcDirectionBasedOnReferenceElement();
    } else if (!referenceElement && placement) {
      return calcDirectionBasedOnPlacement();
    } else {
      return calcDirectionBasedOnDragPosition();
    }
  };

  const calcDirectionBasedOnPlacement = (): MoveDirection => {
    if (!placement) {
      return 'left';
    }
    
    if (placement.includes('right')) {
      return 'right';
    }
    return 'left';
  };

  const calcDirectionBasedOnReferenceElement = (): MoveDirection => {
    if (!referenceElement) {
      return 'left';
    }

    const isLeftPlacement = placement.includes('left');
    const isRightPlacement = placement.includes('right');
    const isCenterPlacement = !isLeftPlacement && !isRightPlacement;

    const referenceElementLeftOffset = referenceElement.offsetLeft || 0;
    const referenceElementWidth = referenceElement.offsetWidth || 0;

    if (
      (isLeftPlacement &&
        referenceElementLeftOffset > middleOfWindowWidth) ||
      (isRightPlacement &&
        referenceElementLeftOffset + referenceElementWidth >
          middleOfWindowWidth) ||
      (isCenterPlacement &&
        referenceElementLeftOffset + referenceElementWidth / 2 >
          middleOfWindowWidth)
    ) {
      return 'right';
    }

    return 'left';
  };

  const calcDirectionBasedOnDragPosition = (): MoveDirection => {
    if (direction === 'left' && x > middleOfWindowWidth) {
      return 'right';
    } else if (
      direction === 'right' &&
      x > middleOfWindowWidth
    ) {
      return 'left';
    }

    return direction;
  };

  direction = calcDirection();

  return {
    get direction() {
      return direction;
    },
  };
}
