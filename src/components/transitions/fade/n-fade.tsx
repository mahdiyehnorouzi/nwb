import { Component, h } from '@stencil/core';

@Component({
  tag: 'n-fade',
  shadow: false,
})
export class NFade {
  render() {
    return (
      <div class="transition-all ease-in duration-100 opacity-100">
        <slot />
      </div>
    );
  }
}
