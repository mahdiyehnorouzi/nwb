import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'n-loading',
  shadow: false,
})
export class NLoading {
  @Prop() size: number = 10;

  render() {
    const sizeNum = Number(this.size) || 10;
    const px = sizeNum * 2;
    return (
      <Host class="inline-flex shrink-0" style={{ width: `${px}px`, height: `${px}px` }}>
        <svg
          class="animate-spin w-full h-full"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </Host>
    );
  }
}
