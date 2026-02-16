import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    Element,
    h,
} from '@stencil/core';

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
    shadow: true,
})
export class NInput {
    @Element() el!: HTMLElement;

    @Prop() modelValue: string | number = '';
    @Prop() disabled: boolean = false;
    @Prop() type: InputType = 'text';

    @Prop() label: string = '';
    @Prop() showError: boolean = false;
    @Prop() error: string = '';
    @Prop() clearable: boolean = false;
    @Prop() rows: number = 3;

    @Prop() forceEnDigit: boolean = true;
    @Prop() size: Size = 'middle';

    @Prop() min: number = -Infinity;
    @Prop() max: number = Infinity;
    @Prop() step: number = 1;
    @Prop() changeValueOnMouseWheel: boolean = true;

    @State() hasFocus: boolean = false;

    private inputRef?: HTMLInputElement | HTMLTextAreaElement;

    @Event() updateModelValue!: EventEmitter<string | number>;

    get hasError() {
        return Boolean(this.error);
    }

    get isNumericInput() {
        return this.type === 'tel' || this.type === 'number';
    }

    get classes() {
        return {
            input: [INPUT_BASE].join(' '),
            container: [
                CONTAINER_BASE,
                SIZES[this.size],
                !this.disabled && CONTAINER_STATE.normal,
                !this.disabled && !this.hasError && this.hasFocus && INPUT_STATE.selected,
                this.hasError && INPUT_STATE.invalid,
                !this.disabled && !this.hasError && !this.hasFocus && INPUT_STATE.normal,
            ]
                .filter(Boolean)
                .join(' '),
        };
    }

    componentDidLoad() {
        document.addEventListener('click', this.handleClickOutside);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    private handleClickOutside = (event: MouseEvent) => {
        if (!this.el.contains(event.target as Node)) {
            this.hasFocus = false;
        }
    };

    private handleInput = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;

        if (this.forceEnDigit) {
            this.updateModelValue.emit(this.convertNumbersToEnglish(value));
            return;
        }

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

        if (event.code === Keys.ArrowUp) {
            event.preventDefault();
            this.incrementInputNumber();
        }

        if (event.code === Keys.ArrowDown) {
            event.preventDefault();
            this.decrementInputNumber();
        }
    };

    private handleWheel = (event: WheelEvent) => {
        if (!this.hasFocus || !this.changeValueOnMouseWheel) return;

        event.preventDefault();
        event.deltaY < 0
            ? this.incrementInputNumber()
            : this.decrementInputNumber();
    };

    private convertNumbersToEnglish(value: string) {
        return value.replace(/[۰-۹]/g, (d) =>
            String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        );
    }

    render() {
        return (
            <div>
                <div
                    class={this.classes.container}
                    onClick={() => this.inputRef?.focus()}
                    onWheel={this.handleWheel}
                >
                    <slot name="prefix" />

                    {this.type === 'textarea' ? (
                        <textarea
                            ref={(el) => (this.inputRef = el as HTMLTextAreaElement)}
                            class={this.classes.input}
                            value={String(this.modelValue)}
                            disabled={this.disabled}
                            rows={this.rows}
                            aria-invalid={this.hasError}
                            onInput={this.handleInput}
                            onFocus={() => (this.hasFocus = true)}
                            onKeyDown={this.handleKeyDown}
                        />
                    ) : (
                        <input
                            ref={(el) => (this.inputRef = el as HTMLInputElement)}
                            class={this.classes.input}
                            type={this.type}
                            value={String(this.modelValue)}
                            disabled={this.disabled}
                            aria-invalid={this.hasError}
                            onInput={this.handleInput}
                            onFocus={() => (this.hasFocus = true)}
                            onKeyDown={this.handleKeyDown}
                        />
                    )}

                    {this.hasError ? (
                        <negar-error-light-icon size={24} />
                    ) : (
                        this.clearable &&
                        this.modelValue && (
                            <negar-close-bold-icon
                                size={24}
                                onClick={this.clearInput}
                            />
                        )
                    )}

                    <slot name="postfix" />
                </div>

                {!this.error && <slot />}
                <slot name="error" />
            </div>
        );
    }
}
