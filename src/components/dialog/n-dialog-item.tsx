import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Element,
  h,
} from '@stencil/core';
import dialogStore from './store';
import { useDialogPosition } from './composables/useDialogPosition';
import {
  DIALOG_WRAPPER,
  MULTI_DIALOG_WRAPPER,
  DIALOG_HEADER,
  MULTI_DIALOG_HEADER,
  DIALOG_EXPANDABLE,
  DIALOG_BASE,
} from './theme';
import type { DialogPlacement, ComponentType } from './types';

@Component({
  tag: 'n-dialog-item',
  shadow: false,
})
export class NDialogItem {
  @Element() el!: HTMLElement;

  @Prop({ attribute: 'dialog-id' }) dialogId!: string;
  @Prop() zIndex!: number;
  @Prop() index!: number;
  @Prop({ attribute: 'dialog-direction' }) dialogDirection: 'rtl' | 'ltr' = 'rtl';

  @Prop() content!: ComponentType | string;
  @Prop({ attribute: 'dialog-title' }) dialogTitle?: ComponentType | string;
  @Prop() expandableLabel?: ComponentType | string;
  @Prop() expandable: boolean = false;
  @Prop() defaultExpanded: boolean = false;
  @Prop() expandedContent?: ComponentType | string;
  @Prop() footer?: ComponentType | string;
  @Prop() bodyClass: string = '';
  @Prop() wrapperClass: string = '';
  @Prop() footerClass: string = '';
  @Prop() multiple: boolean = false;
  @Prop() referenceElementRef?: HTMLElement | any;
  @Prop() placement?: DialogPlacement;
  @Prop() headerLess: boolean = false;

  @Prop() afterClose?: () => void;
  @Prop() afterOpen?: () => void;

  @Event() afterCloseEvent!: EventEmitter<void>;
  @Event() afterOpenEvent!: EventEmitter<void>;
  @Event() updateExpanded!: EventEmitter<boolean>;
  @Event() positionError!: EventEmitter<{ dialogId: string; error: unknown }>;

  @State() expanded: boolean = false;
  @State() wrapperStyle: Record<string, string> = {};
  @State() bodyStyle: Record<string, string> = {};
  @State() isDragging: boolean = false;
  @State() positionErrorMessage?: string;

  private wrapperRef?: HTMLElement;
  private dialogRef?: HTMLElement;
  private headerRef?: HTMLElement;
  private positionHandler?: ReturnType<typeof useDialogPosition>;

  componentWillLoad() {
    this.expanded = this.defaultExpanded;
  }

  componentDidLoad() {
    if (this.afterOpen) {
      this.afterOpen();
      this.afterOpenEvent.emit();
    }
  }

  // High: `componentDidRender` fires after every render — including
  // re-renders triggered by `wrapperStyle`/`bodyStyle` updates inside
  // `updateStyles`. The `!this.positionHandler` guard works today, but if
  // `initializePosition` ever throws after assigning then unsetting the
  // handler, we re-enter on the next render. Use a one-shot flag
  // (e.g. `this.positionInitialized`) to make this strictly idempotent.
  // TODO [ARCHITECTURE]: replace truthy-handler check with explicit init flag.
  componentDidRender() {
    if (!this.positionHandler && this.wrapperRef && this.headerRef) {
      this.initializePosition();
    }
  }

  private initializePosition() {
    if (this.positionHandler) {
      return;
    }

    try {
      const targetRef = this.multiple ? this.wrapperRef : this.dialogRef || this.wrapperRef;

      if (!targetRef || !this.headerRef) {
        return;
      }

      this.positionHandler = useDialogPosition({
        index: this.index,
        wrapperRef: targetRef,
        draggableRef: this.headerRef,
        referenceElementRef: this.referenceElementRef,
        placement: this.placement,
        disableDragging: !this.multiple,
      });
      this.positionErrorMessage = undefined;

      if (!this.multiple && !this.referenceElementRef && this.positionHandler) {
        const width = this.dialogRef.offsetWidth || 0;
        const height = this.dialogRef.offsetHeight || 0;
        if (width > 0 && height > 0) {
          this.positionHandler.handleDialogResize(width, height);
          this.updateStyles();
        }
      } else {
        this.updateStyles();
      }
    } catch (error) {
      this.positionError.emit({ dialogId: this.dialogId, error });
      // ⚠️ WARNING: hardcoded English string surfaces in the rendered dialog.
      // The rest of the codebase routes user-facing strings through
      // `useTranslate()` / `locale`. RTL Persian users will see English here.
      // TODO [I18N]: route this string through useTranslate / locale.messages.
      this.positionErrorMessage = 'Dialog position could not be initialized.';
      console.error(`Error initializing dialog position for ${this.dialogId}:`, error);
    }
  }

  componentDidUpdate() {
    if (!this.positionHandler && this.wrapperRef && this.headerRef) {
      this.initializePosition();
    } else if (this.positionHandler) {
      if (!this.multiple && !this.referenceElementRef && this.dialogRef) {
        const width = this.dialogRef.offsetWidth || 0;
        const height = this.dialogRef.offsetHeight || 0;
        const { x, y } = this.positionHandler;
        if (width > 0 && height > 0 && x === 0 && y === 0) {
          this.positionHandler.handleDialogResize(width, height);
        }
      }
      this.updateStyles();
    }
  }

  disconnectedCallback() {
    if (this.afterClose) {
      this.afterClose();
      this.afterCloseEvent.emit();
    }
  }

  private updateStyles() {
    if (!this.positionHandler) return;

    try {
      const { x, y, direction, isDragging } = this.positionHandler;

      if (this.isDragging !== isDragging) {
        this.isDragging = isDragging;
      }

      if (this.multiple) {
        const newWrapperStyle = {
          [direction]: `${x}px`,
          top: `${y}px`,
          zIndex: String(this.zIndex),
        };

        if (JSON.stringify(this.wrapperStyle) !== JSON.stringify(newWrapperStyle)) {
          this.wrapperStyle = newWrapperStyle;
        }
      } else {
        const newWrapperStyle = {
          zIndex: String(this.zIndex),
        };

        if (JSON.stringify(this.wrapperStyle) !== JSON.stringify(newWrapperStyle)) {
          this.wrapperStyle = newWrapperStyle;
        }

        if (this.referenceElementRef) {
          const newBodyStyle = {
            [direction]: `${x}px`,
            top: `${y}px`,
            zIndex: String(this.zIndex),
            position: 'absolute',
          };
          if (JSON.stringify(this.bodyStyle) !== JSON.stringify(newBodyStyle)) {
            this.bodyStyle = newBodyStyle;
          }
        } else {
          if (Object.keys(this.bodyStyle).length > 0) {
            this.bodyStyle = {};
          }
        }
      }
    } catch (error) {
      this.positionError.emit({ dialogId: this.dialogId, error });
      // ⚠️ WARNING: hardcoded English — same i18n issue as initializePosition.
      // TODO [I18N]: route this string through useTranslate / locale.messages.
      this.positionErrorMessage = 'Dialog position update failed.';
      console.error('Error updating dialog styles:', error);
      this.wrapperStyle = {
        zIndex: String(this.zIndex),
      };
    }
  }

  private close = () => {
    dialogStore.remove(this.dialogId);
  };

  private handleExpand = () => {
    const newExpanded = !this.expanded;
    this.expanded = newExpanded;
    this.updateExpanded.emit(newExpanded);
  };

  private handleClick = () => {
    dialogStore.focus(this.dialogId);
  };

  private getClasses() {
    return {
      header: this.multiple ? MULTI_DIALOG_HEADER : DIALOG_HEADER,
      expandable: DIALOG_EXPANDABLE,
      wrapper: this.multiple ? MULTI_DIALOG_WRAPPER : DIALOG_WRAPPER,
      dialog: DIALOG_BASE,
    };
  }

  render() {
    const classes = this.getClasses();

    return (
      <n-fade>
        <div
          ref={el => {
            this.wrapperRef = el as HTMLElement;
          }}
          class={[classes.wrapper, this.wrapperClass, this.isDragging ? 'opacity-20' : ''].filter(Boolean).join(' ')}
          style={this.wrapperStyle}
          onMouseDown={this.handleClick}
        >
          <n-drop>
            <n-box elevation="medium">
              <div
                ref={el => (this.dialogRef = el as HTMLElement)}
                aria-labelledby={`${this.dialogId}-label`}
                class={[classes.dialog, this.bodyClass].filter(Boolean).join(' ')}
                style={this.bodyStyle}
                role="dialog"
                tabIndex={-1}
              >
                <div class="relative shrink-0">
                  <div ref={el => (this.headerRef = el as HTMLElement)} class={classes.header}>
                    {!this.headerLess && (
                      <>
                        <div
                          id={`${this.dialogId}-label`}
                          class={['flex-1', !this.expandable ? 'rtl:ml-4 ltr:mr-4' : '', this.isDragging ? 'invisible' : ''].filter(Boolean).join(' ')}
                        >
                          {this.expandable && (
                            <div class={classes.expandable} onClick={this.handleExpand}>
                              {this.expandableLabel && <n-dynamic-component content={this.expandableLabel} class={this.isDragging ? 'invisible' : ''} />}

                              <span class={['inline-block transition-transform ltr:hidden', this.expanded ? 'rotate-180' : ''].filter(Boolean).join(' ')}>▼</span>
                              <span class={['inline-block transition-transform rtl:hidden', this.expanded ? 'rotate-180' : ''].filter(Boolean).join(' ')}>▼</span>
                            </div>
                          )}
                          {!this.expandable && this.dialogTitle && <n-dynamic-component content={this.dialogTitle} />}
                        </div>

                        <button
                          type="button"
                          tabIndex={-1}
                          class="cursor-pointer focus:outline-none hover:opacity-70 transition-opacity text-neutral-primary text-xl leading-none w-6 h-6 flex items-center justify-center"
                          onClick={this.close}
                          aria-label="Close dialog"
                        >
                          ×
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div class={['p-4 flex gap-4 flex-1 overflow-hidden', this.isDragging ? 'invisible' : ''].filter(Boolean).join(' ')}>
                  {this.positionErrorMessage && (
                    <div class="mb-2 rounded border border-critical-primary bg-critical-secondary px-2 py-1 text-sm text-critical-primary">{this.positionErrorMessage}</div>
                  )}
                  <n-dynamic-component content={this.content} />

                  {this.expandable && this.expandedContent && this.expanded && (
                    <div>
                      <n-dynamic-component content={this.expandedContent} />
                    </div>
                  )}
                </div>

                {this.footer && (
                  <div class={['p-4 shrink-0', this.footerClass, this.isDragging ? 'invisible' : ''].filter(Boolean).join(' ')}>
                    <n-dynamic-component content={this.footer} />
                  </div>
                )}
              </div>
            </n-box>
          </n-drop>
        </div>
      </n-fade>
    );
  }
}
