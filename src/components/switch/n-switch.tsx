import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    h,
    Watch,
  } from '@stencil/core';
  
import { THUMB_BASE, INPUT_BASE } from './theme';
import { LabelPosition } from './type';
  
  @Component({
    tag: 'n-switch',
    shadow: false,
  })
  export class NSwitch {
    @Prop({ mutable: true }) modelValue?: boolean;
    @Prop() disabled: boolean = false;
    @Prop() loading: boolean = false;
    @Prop() label: string = '';
    @Prop() labelPosition: LabelPosition = LabelPosition.End;
  
    @Event() modelValueChange: EventEmitter<boolean>;
    
    @State() hovered: boolean = false;
    @State() active: boolean = false;
  
    private id = `switch-${Math.random().toString(36).slice(2)}`;
  
    componentWillLoad() {
      this.active = Boolean(this.modelValue);
    }
  
    @Watch('modelValue')
    syncFromOutside(newValue: boolean) {
      this.active = Boolean(newValue);
    }
  
    private onInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.active = target.checked;
      this.modelValueChange.emit(this.active);
    };
  
    private getTrackClasses() {
      return [
        'w-full h-full p-0.5 rounded-full transition-colors duration-200',
        !this.disabled && !this.active && 'bg-neutral-secondary',
        !this.disabled && this.active && 'bg-brand-primary',
        !this.disabled && this.active && this.hovered && 'bg-brand-primary-press',
        this.disabled && !this.active && 'bg-neutral-primary-disable',
        this.disabled && this.active && 'bg-brand-secondary-disable',
      ]
        .filter(Boolean)
        .join(' ');
    }
  
    private getThumbClasses() {
      return [
        THUMB_BASE,
        this.active && 'translate-x-6',
        this.hovered && !this.disabled && 'ring-8 ring-brand-primary-hover',
        this.disabled && 'bg-neutral-secondary-press ring-0',
      ]
        .filter(Boolean)
        .join(' ');
    }
  
    private getInputClasses() {
      return [
        INPUT_BASE,
        this.disabled && 'cursor-not-allowed',
        this.loading && 'cursor-wait',
      ]
        .filter(Boolean)
        .join(' ');
    }
  
    render() {
      return (
        <div class="flex gap-3 items-center">
          <div
            class={`relative shrink-0 w-14 h-8 ${
              this.labelPosition === 'start' ? 'order-2' : ''
            }`}
          >
            <div dir="ltr" class={this.getTrackClasses()}>
              <div class={this.getThumbClasses()}>
                {this.loading && (
                  <n-loading
                    class="text-neutral-secondary"
                    size={14}
                  />
                )}
              </div>
            </div>
  
            <input
              id={this.id}
              class={this.getInputClasses()}
              type="checkbox"
              role="switch"
              checked={this.active}
              aria-checked={this.active ? 'true' : 'false'}
              disabled={this.disabled || this.loading}
              aria-disabled={
                this.disabled || this.loading ? 'true' : 'false'
              }
              onMouseEnter={() => (this.hovered = true)}
              onMouseLeave={() => (this.hovered = false)}
              onInput={this.onInput}
            />
          </div>
  
          <label
            htmlFor={this.id}
            class={`text-c1 ${
              this.labelPosition === 'start' ? 'order-1' : ''
            }`}
          >
            <slot>{this.label}</slot>
          </label>
        </div>
      );
    }
  }
  