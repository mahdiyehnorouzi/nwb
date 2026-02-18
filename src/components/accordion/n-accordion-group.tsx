import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    Element,
    Listen,
    Watch,
    h,
  } from '@stencil/core';
  
  @Component({
    tag: 'n-accordion-group',
    shadow: false,
  })
  export class NAccordionGroup {
    @Element() el!: HTMLElement;
  
    @Prop({ mutable: true }) modelValue: number | number[] = 0;
  
    @Event() updateModelValue!: EventEmitter<number | number[]>;
  
    @State() accordionState: number | number[] = 0;
    @State() updateTrigger: number = 0;
  
    private isMultiple = false;
  
    componentWillLoad() {
      this.accordionState = this.modelValue;
      this.isMultiple = Array.isArray(this.modelValue);
    }
  
    componentDidLoad() {
      this.updateAccordions();
    }
  
    @Watch('modelValue')
    handleModelValueChange(newValue: number | number[]) {
      this.accordionState = newValue;
      this.updateAccordions();
    }
  
    @Watch('accordionState')
    handleAccordionStateChange() {
      this.updateAccordions();
    }
  
    @Listen('accordionToggleClick')
    handleAccordionToggleClick(event: CustomEvent<number>) {
      const index = event.detail;
      this.toggle(index);
      event.stopPropagation();
    }
  
    private updateAccordions() {
      requestAnimationFrame(() => {
        const accordionElements = Array.from(
          this.el.querySelectorAll('n-accordion')
        ) as HTMLNAccordionElement[];
  
        accordionElements.forEach((accordion, index) => {
          const isActive = this.isActive(index);
          
          accordion.setAttribute('accordion-index', index.toString());
          accordion.setAttribute('accordion-active', isActive.toString());
          accordion.setAttribute('accordion-group-id', this.el.id || 'default');
          
          if ((accordion as any).accordionIndex !== index) {
            (accordion as any).accordionIndex = index;
          }
          const activeString = isActive.toString();
          if ((accordion as any).accordionActive !== activeString) {
            (accordion as any).accordionActive = activeString;
          }
        });
        
        this.updateTrigger++;
      });
    }
  
    private isActive = (index: number): boolean => {
      if (this.isMultiple) {
        return (this.accordionState as number[]).includes(index);
      }
      return this.accordionState === index;
    };
  
    private toggle = (index: number) => {
      if (this.isMultiple) {
        const state = [...(this.accordionState as number[])];
        const exists = state.includes(index);
  
        this.accordionState = exists
          ? state.filter(i => i !== index)
          : [...state, index];
      } else {
        this.accordionState =
          this.accordionState === index ? -1 : index;
      }
  
      this.modelValue = this.accordionState;
      this.updateModelValue.emit(this.accordionState);
      
      this.updateAccordions();
    };
  
    render() {
      return (
        <div
          role="group"
          aria-label="accordion-group"
          class="rounded-md border border-neutral-secondary overflow-hidden"
        >
          <slot />
        </div>
      );
    }
  }
  