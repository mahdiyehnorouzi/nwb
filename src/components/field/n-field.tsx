import { Component, Prop, State, h, Element } from '@stencil/core';
import uuid from '../utils/uuid';

@Component({
  tag: 'n-field',
  shadow: false,
})
export class NField {
  @Element() el!: HTMLElement;

  @Prop() showError: boolean = true;
  @Prop() error: string = '';
  @Prop() label: string = '';
  @Prop() labelPosition: 'top' | 'inline' = 'top';
  @Prop() required: boolean = false;
  @Prop() requiredSign: boolean = true;

  @State() fieldId: string = '';

  componentWillLoad() {
    this.fieldId = uuid('input-');
  }

  componentDidLoad() {
    const inputSlot = this.el.querySelector('[slot="input"]');
    if (inputSlot) {
      inputSlot.setAttribute('field-id', this.fieldId);
      const inputElement = inputSlot.querySelector('input, textarea');
      if (inputElement) {
        inputElement.id = this.fieldId;
      }
    }
  }

  render() {
    const showLabel = Boolean(this.label);
    const showRequiredSign = this.required && this.requiredSign;
    const hasError = Boolean(this.error);

    return (
      <div class="mb-2">
        <div class={this.labelPosition === 'inline' ? 'flex' : ''}>
          {showLabel && (
            <label
              class={[
                this.labelPosition === 'top' ? 'inline-block mb-2' : 'pt-3',
              ].join(' ')}
              htmlFor={this.fieldId}
            >
              <n-text weight="medium" variant="caption1">
                {this.label}
              </n-text>
              {showRequiredSign && (
                <n-text class="text-critical-primary ps-1">*</n-text>
              )}
            </label>
          )}

          <div
            class={[
              'relative w-full',
              this.labelPosition === 'inline' ? 'ms-2' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <slot name="input" />

            {this.showError && (
              <n-fade>
                <slot name="error">
                  {hasError && (
                    <n-text
                      weight="regular"
                      variant="caption2"
                      tag="p"
                      role="alert"
                      class="text-critical-primary mt-1"
                    >
                      {this.error}
                    </n-text>
                  )}
                </slot>
              </n-fade>
            )}
          </div>
        </div>
      </div>
    );
  }
}
