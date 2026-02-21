import { Component, Prop, h } from '@stencil/core';

export type ComponentType = {
  component: any;
  props: Record<string, any>;
};

@Component({
  tag: 'n-dynamic-component',
  shadow: false,
})
export class NDynamicComponent {
  @Prop() content!: ComponentType | string;
  @Prop() class?: string;

  render() {
    if (typeof this.content === 'string') {
      return (
        <n-text weight="bold" variant="caption1" class={this.class}>
          {this.content}
        </n-text>
      );
    }

    if (this.content && this.content.component) {
      const ComponentTag = this.content.component;
      const props = this.content.props || {};
      
      const finalProps = this.class 
        ? { ...props, class: props.class ? `${props.class} ${this.class}` : this.class }
        : props;
      
      if (typeof ComponentTag === 'string') {
        return h(ComponentTag, finalProps);
      }
      
      return h(ComponentTag, finalProps);
    }

    return null;
  }
}
