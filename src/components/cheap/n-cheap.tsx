import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

import {
    CHEAP_BASE,
    SIZES,
    PLAIN_THEME,
    OUTLINE_THEME,
    FILL_THEME,
    CHEAP_ICON_SIZES,
} from './theme';
import { CheapVariant, CheapSize, CheapColor } from './type';

@Component({
    tag: 'n-cheap',
    shadow: true,
})
export class NCheap {
    @Prop() modelValue?: boolean;
    @Prop() variant: CheapVariant = 'fill';
    @Prop() closable: boolean = true;
    @Prop() showIcon: boolean = false;
    @Prop() label: string | number = '';
    @Prop() size: CheapSize = 'middle';
    @Prop() color: CheapColor = 'gray';
    @Prop() selectable: boolean = false;

    @Event() close!: EventEmitter<void>;
    @Event() updateModelValue!: EventEmitter<boolean>;

    get rootClasses() {
        return [
            CHEAP_BASE,
            SIZES[this.size],
            this.variant === 'fill' && FILL_THEME[this.color],
            this.variant === 'plain' && PLAIN_THEME[this.color],
            this.variant === 'outline' && OUTLINE_THEME[this.color],
        ]
            .filter(Boolean)
            .join(' ');
    }

    private handleSelect = () => {
        if (this.selectable && !this.modelValue) {
            this.updateModelValue.emit(!this.modelValue);
        }
    };

    private handleClose = (e: MouseEvent) => {
        e.stopPropagation();
        this.close.emit();
    };

    render() {
        return (
            <div class={this.rootClasses}>
                <div class="inline-flex items-center" onClick={this.handleSelect}>
                    {this.showIcon && (
                        <div class="me-1 rtl:-mr-0.5 ltr:-ml-0.5">
                            <slot name="icon" />
                        </div>
                    )}

                    {this.label ? (
                        <n-text
                            variant={this.size === 'middle' ? 'caption1' : 'overline'}
                            weight="medium"
                        >
                            {this.label}
                        </n-text>
                    ) : (
                        <slot name="label" />
                    )}
                </div>

                {this.closable && (
                    <span
                        class="cursor-pointer ps-1 rtl:-ml-0.5 ltr:-mr-0.5"
                        onClick={this.handleClose}
                    >
                        <negar-close-bold-icon
                            size={CHEAP_ICON_SIZES[this.size]}
                        />
                    </span>
                )}
            </div>
        );
    }
}
