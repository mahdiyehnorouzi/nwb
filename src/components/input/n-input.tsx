import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    Element,
    h,
} from '@stencil/core';

import convertNumbersToEnglish from '../utils/convertNumbersToEnglish';

import {
    INPUT_BASE,
    INPUT_STATE,
    CONTAINER_BASE,
    CONTAINER_STATE,
    SIZES,
} from './theme';
import { InputType, Size, Keys } from './type';

@Component({
    tag: 'n-input',
    shadow: false,
})
export class NInput {
    @Element() el!: HTMLElement;

    @Prop({ mutable: true }) modelValue: string | number = '';
    @Prop() disabled: boolean = false;
    @Prop() type: InputType = 'text';

    @Prop() label: string = '';
    @Prop() labelPosition: 'top' | 'inline' = 'top';
    @Prop() placeholder: string = '';
    @Prop() showError: boolean = false;
    @Prop() error: string = '';
    @Prop() required: boolean = false;
    @Prop() requiredSign: boolean = true;
    @Prop() clearable: boolean = false;
    @Prop() rows: number | string = 3;
    @Prop() inputClass: string = '';

    @Prop() forceEnDigit: boolean = true;
    @Prop() size: Size = 'middle';

    @Prop() min: number = -Infinity;
    @Prop() max: number = Infinity;
    @Prop() step: number = 1;
    @Prop() changeValueOnMouseWheel: boolean = true;

    @State() hasFocus: boolean = false;

    private inputRef?: HTMLInputElement | HTMLTextAreaElement;
    private containerRef?: HTMLElement;
    private fieldId: string = '';

    @Event() updateModelValue!: EventEmitter<string | number>;

    get hasError() {
        return Boolean(this.error);
    }

    get isNumericInput() {
        return this.type === 'tel' || this.type === 'number';
    }

    get classes() {
        const input = [INPUT_BASE, this.inputClass].filter(Boolean);

        const containerClassParts: string[] = [
            CONTAINER_BASE,
            SIZES[this.size],
        ];


        if (!this.disabled && !this.hasError && this.hasFocus) {
            containerClassParts.push(CONTAINER_STATE.normal);
            containerClassParts.push(INPUT_STATE.selected);
        }

        if (this.hasError) {
            containerClassParts.push(INPUT_STATE.invalid);
        }

        if (!this.disabled && !this.hasError && !this.hasFocus) {
            containerClassParts.push(INPUT_STATE.normal);
        }

        return {
            input: input.join(' '),
            container: containerClassParts.join(' '),
        };
    }

    componentDidLoad() {
        if (typeof document !== 'undefined') {
            document.addEventListener('click', this.handleClickOutside);
        }
        
        const fieldElement = this.el.closest('n-field');
        if (fieldElement) {
            const inputSlot = fieldElement.querySelector('[slot="input"]');
            if (inputSlot) {
                this.fieldId = inputSlot.getAttribute('field-id') || '';
                if (this.inputRef && this.fieldId) {
                    this.inputRef.id = this.fieldId;
                }
            }
        }
    }

    disconnectedCallback() {
        if (typeof document !== 'undefined') {
            document.removeEventListener('click', this.handleClickOutside);
        }
    }

    private handleClickOutside = (event: MouseEvent) => {
        if (this.containerRef && !this.containerRef.contains(event.target as Node)) {
            this.hasFocus = false;
        }
    };

    private handleInput = (event: Event) => {
        const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;

        if (this.forceEnDigit) {
            const converted = convertNumbersToEnglish(value);
            this.modelValue = converted;
            this.updateModelValue.emit(converted);
            return;
        }

        this.modelValue = value;
        this.updateModelValue.emit(value);
    };

    private clearInput = (e: MouseEvent) => {
        e.stopPropagation();
        this.updateModelValue.emit('');
        this.inputRef?.focus();
    };

    private incrementInputNumber = () => {
        const newValue = Number(this.modelValue) + this.step;
        if (newValue <= this.max) {
            this.updateModelValue.emit(newValue);
        }
    };

    private decrementInputNumber = () => {
        const newValue = Number(this.modelValue) - this.step;
        if (newValue >= this.min) {
            this.updateModelValue.emit(newValue);
        }
    };

    private handleKeyDown = (event: KeyboardEvent) => {
        if (!this.isNumericInput) return;

        event.stopPropagation();

        const actions: Record<string, () => void> = {
            [Keys.ArrowDown]: this.decrementInputNumber,
            [Keys.ArrowUp]: this.incrementInputNumber,
        };

        if (actions[event.code]) {
            actions[event.code]();
        }
    };

    private handleWheel = (event: WheelEvent) => {
        if (!this.isNumericInput || !this.hasFocus || !this.changeValueOnMouseWheel) return;

        event.stopPropagation();
        event.preventDefault();

        event.deltaY < 0 ? this.incrementInputNumber() : this.decrementInputNumber();
    };

    render() {
        const hasPostfixSlot = !!this.el.querySelector('[slot="postfix"]');
        const rowsNum = typeof this.rows === 'string' ? parseInt(this.rows, 10) : this.rows;

        return (
            <n-field
                showError={this.showError}
                error={this.error}
                required={this.required}
                requiredSign={this.requiredSign}
                label={this.label}
                labelPosition={this.labelPosition}
            >
                <div
                    slot="input"
                    ref={(el) => (this.containerRef = el as HTMLElement)}
                    class={[
                        this.classes.container,
                        this.disabled ? INPUT_STATE.disabled : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => this.inputRef?.focus()}
                    onWheel={this.isNumericInput ? this.handleWheel : undefined}
                    onKeyDown={this.isNumericInput ? this.handleKeyDown : undefined}
                >
                    <slot name="prefix" />

                    {this.type === 'textarea' ? (
                        <textarea
                            ref={(el) => (this.inputRef = el as HTMLTextAreaElement)}
                            class={this.classes.input}
                            value={String(this.modelValue)}
                            disabled={this.disabled}
                            rows={rowsNum}
                            aria-invalid={this.hasError}
                            placeholder={this.placeholder || undefined}
                            onInput={this.handleInput}
                            onFocus={() => (this.hasFocus = true)}
                        />
                    ) : (
                        <input
                            ref={(el) => (this.inputRef = el as HTMLInputElement)}
                            class={this.classes.input}
                            type={this.type}
                            value={String(this.modelValue)}
                            disabled={this.disabled}
                            aria-invalid={this.hasError}
                            placeholder={this.placeholder || undefined}
                            onInput={this.handleInput}
                            onFocus={() => (this.hasFocus = true)}
                        />
                    )}

                    {(hasPostfixSlot || this.clearable || this.hasError) && (
                        <>
                            {this.hasError && !hasPostfixSlot && (
                                <negar-error-light-icon size={24} class="text-critical-primary" />
                            )}
                            {!this.hasError && this.clearable && this.modelValue && (
                                <negar-close-bold-icon
                                    size={24}
                                    class="text-neutral-tertiary cursor-pointer"
                                    onClick={this.clearInput}
                                />
                            )}
                            <slot name="postfix" />
                        </>
                    )}
                </div>

                {!this.error && <slot />}
                <slot name="error" />
            </n-field>
        );
    }
}
