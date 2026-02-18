import { Component, Prop, h } from '@stencil/core';
import { VARIANTS_THEME, WEIGHTS_THEME } from './theme';

export type TextVariant =
  | '3xl'
  | '2xl'
  | 'xl'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'subtitle'
  | 'caption1'
  | 'caption2'
  | 'overline';

export type TextTag =
  | 'a'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'i'
  | 'b'
  | 'small'
  | 'label';

@Component({
  tag: 'n-text',
  shadow: false,
})
export class NText {
  @Prop() variant: TextVariant = 'body';
  @Prop() tag: TextTag = 'span';
  @Prop() weight: 'regular' | 'medium' | 'bold' = 'regular';

  render() {
    const Tag = this.tag;
    const classes = [
      VARIANTS_THEME[this.variant],
      WEIGHTS_THEME[this.weight],
    ].join(' ');

    return (
      <Tag class={classes}>
        <slot />
      </Tag>
    );
  }
}
