import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    h,
    Element,
  } from '@stencil/core';
  
  import {
    BUTTON_TOGGLE_THEME,
    BUTTON_TOGGLE_BASE,
    SIZES,
    ROUNDED,
  } from './theme';
  
  @Component({
    tag: 'n-button-toggle',
    shadow: false,
  })
  export class NButtonToggle {
    @Element() el!: HTMLElement;
  
    @Prop() label: string = '';
    @Prop() badge: string = '';
  
    @State() index: number = 0;
    @State() isActive: boolean = false;
    @State() color: string = 'green';
    @State() size: string = 'small';
    @State() rounded: string = 'full';
    @State() disabled: boolean = false;
  
    @Event({ bubbles: true }) toggleClick: EventEmitter<number>;
  
    componentDidLoad() {
      this.index = Number(this.el.getAttribute('data-index'));
      this.syncFromParent();
    }
  
    componentDidRender() {
      this.syncFromParent();
    }
  
    private syncFromParent() {
      this.isActive = this.el.getAttribute('data-active') === 'true';
      this.color = this.el.getAttribute('data-color') || 'green';
      this.size = this.el.getAttribute('data-size') || 'small';
      this.rounded = this.el.getAttribute('data-rounded') || 'full';
      this.disabled = this.el.getAttribute('data-disabled') === 'true';
    }
  
    private activate() {
      if (this.disabled) return;
      this.toggleClick.emit(this.index);
    }
  
    private getClasses() {
      return [
        BUTTON_TOGGLE_BASE,
        ROUNDED[this.rounded],
        SIZES[this.size],
        this.isActive
          ? BUTTON_TOGGLE_THEME.active[this.color]
          : BUTTON_TOGGLE_THEME.normal[this.color],
      ]
        .filter(Boolean)
        .join(' ');
    }
  
    render() {
      return (
        <button
          type="button"
          class={this.getClasses()}
          aria-selected={this.isActive}
          tabindex={this.isActive ? 0 : -1}
          disabled={this.disabled}
          onClick={() => this.activate()}
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
  