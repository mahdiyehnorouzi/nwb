import {
    Component,
    Prop,
    State,
    Element,
    Event,
    EventEmitter,
    Watch,
    h,
  } from '@stencil/core';
  
  @Component({
    tag: 'n-accordion',
    shadow: false,
  })
  export class NAccordion {
    @Element() el!: HTMLElement;
  
    @Prop() accordionTitle: string = '';
    @Prop() disabled: boolean = false;
    @Prop() hasDivider: boolean = false;
    @Prop() elevation: boolean = false;
  
    @Prop({ attribute: 'accordion-index', reflect: true }) accordionIndex: number = -1;
    @Prop({ attribute: 'accordion-active', mutable: true, reflect: true }) accordionActive: string = 'false';
    @Prop({ attribute: 'accordion-group-id', reflect: true }) accordionGroupId: string = '';
  
    @Event({ bubbles: true }) accordionToggleClick!: EventEmitter<number>;
  
    @State() isActive: boolean = false;
  
    componentWillLoad() {
      this.isActive = this.accordionActive === 'true';
    }
  
    componentDidUpdate() {
      this.isActive = this.accordionActive === 'true';
    }
  
    @Watch('accordionActive')
    handleActiveChange(newValue: string) {
      this.isActive = newValue === 'true';
    }
  
    private handleClick = () => {
      if (!this.disabled && this.accordionIndex >= 0) {
        this.accordionToggleClick.emit(this.accordionIndex);
      }
    };
  
    render() {
      return (
        <div
          class={{
            'w-full bg-neutral-primary overflow-hidden': true,
            'shadow-medium': this.elevation,
            'bg-neutral-primary-disable opacity-25': this.disabled,
          }}
          id={`accordion-item-${this.accordionIndex}`}
          aria-label="accordion-item"
        >
          <div
            class={{
              'p-2 hover:bg-neutral-primary-hover h-10 flex justify-end items-center': true,
              'border-b border-neutral-secondary': this.hasDivider,
              'cursor-pointer': !this.disabled,
              '!cursor-default': this.disabled,
            }}
            onClick={this.handleClick}
          >
            <div class="w-full select-none">
              <slot name="header">
                <div class="flex items-center">
                  <span class="text-c1 font-bold">{this.accordionTitle}</span>
                </div>
              </slot>
            </div>
  
            <span
              class={{
                'transition-transform': true,
                'rotate-180': this.isActive,
              }}
            >
              ▼
            </span>
          </div>
  
          <div
            class={{
              'transition-all duration-300 overflow-hidden': true,
              'max-h-[500px]': this.isActive,
              'max-h-0': !this.isActive,
            }}
          >
            {this.isActive && (
              <div class="w-full">
                <slot />
              </div>
            )}
          </div>
        </div>
      );
    }
  }
  