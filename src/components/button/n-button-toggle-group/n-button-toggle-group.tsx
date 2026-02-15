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
    ROUNDED,
} from './theme';
import { ButtonToggleColor, ButtonToggleRounded, ButtonToggleSize } from './type';
  
  @Component({
    tag: 'n-button-toggle-group',
    shadow: false,
  })
  export class NButtonToggleGroup {
    @Element() el!: HTMLElement;
  
    @Prop({ mutable: true }) modelValue: number = 0;
    @Prop() disabled: boolean = false;
    @Prop() color: ButtonToggleColor = 'green';
    @Prop() size: ButtonToggleSize = 'small';
    @Prop() rounded: ButtonToggleRounded = 'full';
  
    @Event() modelValueChange: EventEmitter<number>;
  
    @State() buttons: HTMLElement[] = [];
  
    componentDidLoad() {
      this.registerButtons();
    }
  
    @Watch('modelValue')
    handleChange(newValue: number) {
      this.modelValueChange.emit(newValue);
      this.updateChildren();
    }
  
    private registerButtons() {
      this.buttons = Array.from(
        this.el.querySelectorAll('n-button-toggle')
      ) as HTMLElement[];
  
      this.updateChildren();
    }
  
    private updateChildren() {
      this.buttons.forEach((btn, index) => {
        btn.setAttribute('data-index', index.toString());
        btn.setAttribute(
          'data-active',
          (index === this.modelValue).toString()
        );
        btn.setAttribute('data-disabled', this.disabled.toString());
        btn.setAttribute('data-color', this.color);
        btn.setAttribute('data-size', this.size);
        btn.setAttribute('data-rounded', this.rounded);
      });
    }
  
    @Listen('toggleClick')
    onToggleClick(event: CustomEvent<number>) {
      if (this.disabled) return;
  
      this.modelValue = event.detail;
    }
  
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
        <div role="group" class={this.getClasses()}>
          <slot />
        </div>
      );
    }
  }
  