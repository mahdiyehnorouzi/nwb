import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'n-drop',
  shadow: false,
})
export class NDrop {
  @State() isVisible: boolean = false;
  @State() isLeaving: boolean = false;
  private leaveTimeout?: number;

  componentWillLoad() {
    this.isVisible = false;
  }

  componentDidLoad() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.isVisible = true;
      });
    });
  }

  disconnectedCallback() {
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
    }
  }

  render() {
    const baseClasses = 'transform transition-all';
    const enterActiveClass = 'ease-in duration-300';
    const leaveActiveClass = 'ease-out duration-300';
    
    let stateClasses = '';
    if (this.isLeaving) {
      stateClasses = `${leaveActiveClass} opacity-0 -translate-y-2`;
    } else if (this.isVisible) {
      stateClasses = `${enterActiveClass} opacity-100 translate-y-0`;
    } else {
      stateClasses = `${enterActiveClass} opacity-0 -translate-y-2`;
    }

    return (
      <div class={`${baseClasses} ${stateClasses}`}>
        <slot />
      </div>
    );
  }
}
