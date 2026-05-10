import { Component, Prop, h } from '@stencil/core';
import { BOX_BASE, ELEVATION_CLASS } from './theme';

@Component({
  tag: 'n-box',
  shadow: false,
})
export class NBox {
  @Prop() elevation: 'none' | 'small' | 'medium' | 'large' = 'none';

  private getClassName() {
    const shadow = ELEVATION_CLASS[this.elevation] ?? '';
    return [BOX_BASE, shadow].filter(Boolean).join(' ');
  }

  render() {
    return (
      <div class={this.getClassName()}>
        <slot />
      </div>
    );
  }
}
