import { Component, Prop, h, Host } from '@stencil/core';
import {
  PROGRESS_HOST,
  PROGRESS_SVG,
  PROGRESS_CIRCLE,
} from './theme';

@Component({
  tag: 'n-progress',
  shadow: true,
})
export class NProgress {
  @Prop() percentage: number = 0;
  @Prop() backgroundColorCode!: string;
  @Prop() progressColorCode: string = 'white';
  @Prop() size: number = 10;

  private get dashOffset() {
    const safe = Math.min(100, Math.max(0, this.percentage));
    return 100 - safe;
  }

  render() {
    return (
      <Host class={PROGRESS_HOST}>
        <svg
          viewBox="0 0 120 120"
          class={PROGRESS_SVG}
          style={{
            width: `${this.size * 2}px`,
            height: `${this.size * 2}px`,
          }}
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={this.backgroundColorCode}
            stroke-width="12"
          />

          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={this.progressColorCode}
            stroke-width="12"
            pathLength="100"
            stroke-dasharray="100"
            stroke-dashoffset={this.dashOffset}
            class={PROGRESS_CIRCLE}
          />
        </svg>
      </Host>
    );
  }
}
