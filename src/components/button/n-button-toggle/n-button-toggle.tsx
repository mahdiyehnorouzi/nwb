import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { BUTTON_TOGGLE_THEME, BUTTON_TOGGLE_BASE, SIZES, ROUNDED } from './theme';
import { BUTTON_TOGGLE_ROUNDED } from '../n-button-toggle-group/type';
import type { 
  ButtonToggleColor, 
  ButtonToggleSize, 
  ButtonToggleRounded 
} from '../n-button-toggle-group/type';
import { BUTTON_COLOR, BUTTON_SIZE } from '../_shared/button.types';

@Component({
  tag: 'n-button-toggle',
  shadow: false,
})
export class NButtonToggle {
  @Prop() index: number = 0;

  @Prop() active: boolean = false;

  @Prop() label: string = '';
  @Prop() badge: string = '';

  @Prop() color: ButtonToggleColor = BUTTON_COLOR.GREEN;
  @Prop() size: ButtonToggleSize = BUTTON_SIZE.SMALL;
  @Prop() rounded: ButtonToggleRounded = BUTTON_TOGGLE_ROUNDED.FULL; 

  @Prop() disabled: boolean = false;

  @Prop() focusTabIndex: number = -1;

  @Event({ bubbles: true }) toggleSelect: EventEmitter<number>;

  private onClick = () => {
    if (this.disabled) return;
    this.toggleSelect.emit(this.index);
  };

  private getClasses() {
    const theme = this.active
      ? BUTTON_TOGGLE_THEME.active[this.color]
      : BUTTON_TOGGLE_THEME.normal[this.color];

    return [
      BUTTON_TOGGLE_BASE,
      ROUNDED[this.rounded],
      SIZES[this.size],
      theme,
    ]
      .filter(Boolean)
      .join(' ');
  }

  render() {
    return (
      <button
        type="button"
        class={this.getClasses()}
        role="radio"
        aria-checked={this.active}
        aria-disabled={this.disabled}
        disabled={this.disabled}
        tabindex={this.focusTabIndex}
        onClick={this.onClick}
      >
        <slot name="icon" />

        <slot name="label">
          {this.label && (
            <span class="box-border flex items-center gap-1">
              {this.label}
            </span>
          )}
        </slot>

        {this.badge && (
          <slot name="badge">
            <span class="!bg-blue-primary text-white rounded-xl px-1 py-0 flex items-center">
              {this.badge}
            </span>
          </slot>
        )}
      </button>
    );
  }
}