import { Component, Prop, h } from '@stencil/core';
import { 
  BUTTON_COLOR, 
  BUTTON_NATIVE_TYPE, 
  BUTTON_SIZE, BUTTON_VARIANT, 
} from '../_shared/button.types';
import type { 
  ButtonSize, 
  ButtonVariant, 
  NativeButtonType, 
  ButtonColor 
} from '../_shared/button.types';
import { getButtonClasses } from '../_shared/getButtonClasses';
import { BUTTON_ICON_BASE, BUTTON_SIZES_ICON } from '../_shared/button.styles';

@Component({
  tag: 'n-button-icon',
  shadow: false,
})
export class NButtonIcon {
  @Prop() size: ButtonSize = BUTTON_SIZE.MIDDLE;
  @Prop() variant: ButtonVariant = BUTTON_VARIANT.FILL;
  @Prop() color: ButtonColor = BUTTON_COLOR.GREEN;

  @Prop() loading = false;
  @Prop() disabled = false;
  @Prop() type: NativeButtonType = BUTTON_NATIVE_TYPE.BUTTON;

  render() {
    const isDisabled = this.disabled || this.loading;

    const classes = getButtonClasses({
      size: this.size,
      variant: this.variant,
      color: this.color,
      loading: this.loading,
      baseClass: BUTTON_ICON_BASE,
      sizeClassMap: BUTTON_SIZES_ICON,
      miniRoundClass: '!rounded-full',
    });

    return (
      <button
        type={this.type}
        class={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled ? 'true' : null}
        aria-busy={this.loading ? 'true' : null}
      >
        {this.loading ? <n-loading size={10} /> : <slot />}
      </button>
    );
  }
}