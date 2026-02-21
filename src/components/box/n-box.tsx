import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'n-box',
  shadow: false,
})
export class NBox {
  @Prop() elevation?: 'none' | 'small' | 'medium' | 'large' = 'none';

  private getElevationClass() {
    const elevationMap = {
      none: '',
      small: 'shadow-small',
      medium: 'shadow-medium',
      large: 'shadow-large',
    };
    return elevationMap[this.elevation];
  }

  render() {
    return (
      <div class={this.getElevationClass()}>
        <slot />
      </div>
    );
  }
}
