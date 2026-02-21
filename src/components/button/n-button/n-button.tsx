import { Component, Prop, h, Host } from '@stencil/core';
import type { ButtonColor, ButtonSize, ButtonVariant, NativeButtonType } from '../_shared/button.types';
import { BUTTON_SIZE, BUTTON_VARIANT, BUTTON_COLOR, BUTTON_NATIVE_TYPE } from '../_shared/button.types';
import { getButtonClasses } from '../_shared/getButtonClasses';
import { BUTTON_TEXT_BASE, BUTTON_SIZES_TEXT } from '../_shared/button.styles';

@Component({
  tag: 'n-button',
  shadow: false,
})
export class NButton {
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
      baseClass: BUTTON_TEXT_BASE,
      sizeClassMap: BUTTON_SIZES_TEXT,
      miniRoundClass: 'rounded-xl',
    });

    return (
      <Host>
        <button
          type={this.type}
          class={classes}
          disabled={isDisabled}
          aria-disabled={isDisabled ? 'true' : null}
          aria-busy={this.loading ? 'true' : null}
        >
          <span class="inline-flex items-center gap-2">
            {this.loading ? (
              <n-loading size={10} />
            ) : (
              <>
                <slot name="icon" />
                <slot />
              </>
            )}
          </span>
        </button>
      </Host>
    );
  }
}