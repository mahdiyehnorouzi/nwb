import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  h,
  Element,
  Listen,
  Watch,
} from '@stencil/core';
import { 
  BUTTON_TOGGLE_GROUP_BASE, 
  BUTTON_TOGGLE_GROUP_THEME, 
  SIZES, 
  ROUNDED 
} from './theme';
import { BUTTON_TOGGLE_ROUNDED } from './type';
import type { 
  ButtonToggleColor, 
  ButtonToggleSize, 
  ButtonToggleRounded, 
  ToggleEl 
} from './type';
import { BUTTON_COLOR, BUTTON_SIZE } from '../_shared/button.types';


@Component({
  tag: 'n-button-toggle-group',
  shadow: false,
})
export class NButtonToggleGroup {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) modelValue: number = 0;

  @Prop() disabled: boolean = false;
  @Prop() color: ButtonToggleColor = BUTTON_COLOR.GREEN;
  @Prop() size: ButtonToggleSize = BUTTON_SIZE.SMALL;
  @Prop() rounded: ButtonToggleRounded = BUTTON_TOGGLE_ROUNDED.FULL;

  @Event() modelValueChange: EventEmitter<number>;

  @State() toggles: ToggleEl[] = [];

  componentDidLoad() {
    this.registerToggles();
  }

  @Watch('modelValue')
  onModelValueChange(newValue: number) {
    this.modelValueChange.emit(newValue);
    this.applyStateToChildren();
  }

  @Watch('disabled')
  @Watch('color')
  @Watch('size')
  @Watch('rounded')
  onConfigChange() {
    this.applyStateToChildren();
  }

  private registerToggles = () => {
    const found = Array.from(this.el.querySelectorAll('n-button-toggle')) as unknown as ToggleEl[];
    this.toggles = found;
    this.applyStateToChildren();
  };

  private applyStateToChildren() {
    this.toggles.forEach((toggle, index) => {
      toggle.index = index;
      toggle.active = index === this.modelValue;
  
      toggle.disabled = this.disabled;
      toggle.color = this.color;
      toggle.size = this.size;
      toggle.rounded = this.rounded;
  
      toggle.tabIndex = index === this.modelValue ? 0 : -1;
    });
  }

  @Listen('toggleSelect')
  onToggleSelect(event: CustomEvent<number>) {
    if (this.disabled) return;
    this.modelValue = event.detail;
  }

  private moveFocus(nextIndex: number) {
    const max = this.toggles.length - 1;
    if (max < 0) return;

    const clamped = Math.max(0, Math.min(nextIndex, max));
    this.modelValue = clamped;

    requestAnimationFrame(() => {
      this.toggles[clamped]?.focus?.();
    });
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    const key = e.key;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;

    e.preventDefault();

    if (key === 'Home') return this.moveFocus(0);
    if (key === 'End') return this.moveFocus(this.toggles.length - 1);

    const dir = key === 'ArrowRight' ? 1 : -1;
    this.moveFocus(this.modelValue + dir);
  };

  private getClasses() {
    return [
      BUTTON_TOGGLE_GROUP_BASE,
      BUTTON_TOGGLE_GROUP_THEME[this.color],
      SIZES[this.size],
      ROUNDED[this.rounded],
    ]
      .filter(Boolean)
      .join(' ');
  }

  render() {
    return (
      <div
        role="radiogroup"
        class={this.getClasses()}
        aria-disabled={this.disabled}
        onKeyDown={this.onKeyDown}
      >
        <slot onSlotchange={this.registerToggles} />
      </div>
    );
  }
}