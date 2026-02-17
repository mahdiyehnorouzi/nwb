import { Component, Prop, State, Method, h } from '@stencil/core';
import { Position, Toast } from './types';
import uuid from '../utils/uuid';

  @Component({
    tag: 'n-toast',
    shadow: true,
  })
export class NToast {
  @Prop() offset: number = 0;
  @Prop() queued: boolean = false;
  @Prop() position: Position = Position.Bottom;

  @State() toasts: Toast[] = [];

  @Method()
  async addToast(toast: Toast) {
    const toastWithId = {
      ...toast,
      id: toast.id || uuid('toast-'),
    };
    this.toasts = [...this.toasts, toastWithId];
  }

  @Method()
  async clearAll() {
    this.toasts = [];
  }

  private remove = (id: string) => {
    this.toasts = this.toasts.map(t =>
      t.id === id ? { ...t, removed: true } : t
    );

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 400);
  };

  private removeAll = () => {
    this.toasts = [];
  };

  render() {
    const containerClasses = [
      'fixed z-200 w-full px-4',
      this.position === Position.Bottom ? 'bottom-0' : 'top-0',
      'left-1/2 -translate-x-1/2',
      !this.queued ? 'space-y-2' : '',
    ].filter(Boolean).join(' ');

    return (
      <div class={containerClasses}>
        {this.toasts.map((toast, index) => (
          <n-toast-item
            {...toast}
            toastId={toast.id || `toast-${index}`}
            index={index}
            depth={this.toasts.length}
            queued={this.queued}
            position={toast.position ?? this.position}
            offset={toast.offset ?? this.offset}
            enabled={index === this.toasts.length - 1}
            removed={toast.removed || false}
            onRemove={(e: CustomEvent<string>) =>
              this.remove(e.detail)
            }
            onRemoveAll={() => this.removeAll()}
          />
        ))}
      </div>
    );
  }
}
