import { Component, Prop, h } from '@stencil/core';
import {
  BASE,
  SIZES,
  FILL_THEME,
  OUTLINE_THEME,
  FLAT_THEME,
  PLAIN_THEME,
  DISABLE_THEME,
  NOT_CLICKABLE,
} from './theme';

@Component({
  tag: 'n-button',
  shadow: false,
})
export class NButton {
  @Prop() size: 'mini' | 'xsmall' | 'small' | 'middle' | 'large' = 'middle';
  @Prop() variant: 'fill' | 'outline' | 'flat' | 'plain' = 'fill';
  @Prop() color: 'green' | 'red' | 'blue' | 'gray' = 'green';
  @Prop() loading: boolean = false;
  @Prop() disabled: boolean = false;

  private getClasses() {
    return [
      BASE,
      SIZES[this.size],
      DISABLE_THEME[this.variant],
      this.variant === 'fill' && FILL_THEME[this.color],
      this.variant === 'flat' && FLAT_THEME[this.color],
      this.variant === 'plain' && PLAIN_THEME[this.color],
      this.variant === 'outline' && OUTLINE_THEME[this.color],
      this.loading && NOT_CLICKABLE.default,
      this.size === 'mini' && 'rounded-xl',
    ]
      .filter(Boolean)
      .join(' ');
  }

  render() {
    return (
      <button
        class={this.getClasses()}
        disabled={this.disabled || this.loading}
      >
        <div class="inline-flex items-center justify-between">
          {this.loading ? (
            <n-loading size={10} class="mx-auto" />
          ) : (
            <>
              <slot name="icon" />
              <slot />
            </>
          )}
        </div>
      </button>
    );
  }
}
