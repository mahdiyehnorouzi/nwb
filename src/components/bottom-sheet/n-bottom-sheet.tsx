import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import useLocationHash from '../../composables/useLocationHash';
import uuid from '../utils/uuid';
import waitFor from '../utils/waitFor';
import { lockBodyScroll, unlockBodyScroll } from '../utils/bodyScrollLock';

import {
  WRAPPER_BASE,
  BACKDROP_BASE,
  SHEET_CONTAINER_BASE,
  HANDLE_BUTTON_BASE,
  HANDLE_SPAN_BASE,
  getWrapperClasses,
  getBackdropClasses,
  getSheetClasses,
  getBackdropStyles,
  getSheetStyles,
  getHandleStyles,
  getHeaderClass,
  getContentClass,
  getFooterClass,
} from './theme';
import { computeSnapHeightPx } from './utils/snapPoints';
import { createTouchHandlers } from './utils/touchHandlers';
import type { BottomSheetCloseReason, BottomSheetSnapPoint, NBottomSheetClosingStartedDetail } from './types';

@Component({
  tag: 'n-bottom-sheet',
  styleUrl: 'n-bottom-sheet.css',
  shadow: false,
})
export class NBottomSheet {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) modelValue: boolean = false;

  @Prop() duration: number = 300;
  @Prop() blocking: boolean = true;

  @Prop() expandable: boolean = false;
  @Prop() closable: boolean = true;
  @Prop() canSwipeClose: boolean = true;
  @Prop() canBackdropClose: boolean = true;
  @Prop() hashBased: boolean = true;

  @Prop() height?: number;
  @Prop() snapPoints?: BottomSheetSnapPoint[];
  @Prop() initialSnapPoint?: number;

  @Prop() headerClass?: string;
  @Prop() contentClass?: string;
  @Prop() footerClass?: string;
  @Prop() removeFooterPadding: boolean = false;

  @Prop() afterOpen?: () => void;
  @Prop() afterClose?: () => void;

  @Event() updateModelValue!: EventEmitter<boolean>;
  @Event({ eventName: 'closing-started' }) closingStarted!: EventEmitter<NBottomSheetClosingStartedDetail>;
  @Event({ eventName: 'instinct-height' }) instinctHeight!: EventEmitter<number>;

  @State() rendered: boolean = false;
  @State() visible: boolean = false;
  @State() expanded: boolean = false;

  private bottomSheetId = uuid('bottom-sheet-');
  private sheetRef?: HTMLElement;
  private contentMeasureRef?: HTMLElement;

  private unsubscribeHash?: () => void;
  private popstateHandler?: () => void;

  private pendingCloseReason: BottomSheetCloseReason | null = null;
  private touchHandlers = createTouchHandlers({
    enabled: false,
    sheetRef: undefined,
    duration: 300,
    onSwipeClose: () => this.requestClose('swipe'),
  });

  private locationHash = useLocationHash();

  componentWillLoad() {
    if (this.modelValue) {
      this.rendered = true;
    }
  }

  componentDidLoad() {
    this.unsubscribeHash = this.locationHash.subscribe(() => {
      if (!this.hashBased) return;

      const lastHash = this.locationHash.getLastHash();
      const shouldListenPopstate = lastHash === this.bottomSheetId && this.closable;

      if (shouldListenPopstate && !this.popstateHandler) {
        this.popstateHandler = () => this.requestClose('popstate');
        window.addEventListener('popstate', this.popstateHandler);
      } else if (!shouldListenPopstate && this.popstateHandler) {
        window.removeEventListener('popstate', this.popstateHandler);
        this.popstateHandler = undefined;
      }
    });

    if (this.modelValue) {
      this.onOpenHandler();
    }
  }

  componentDidUpdate() {
    if (this.visible && this.sheetRef) {
      this.touchHandlers = createTouchHandlers({
        enabled: this.closable && this.canSwipeClose,
        sheetRef: this.sheetRef,
        duration: this.duration,
        onSwipeClose: () => this.requestClose('swipe'),
      });
    }
  }

  disconnectedCallback() {
    if (this.unsubscribeHash) this.unsubscribeHash();
    if (this.popstateHandler) window.removeEventListener('popstate', this.popstateHandler);
    if (this.blocking) {
      unlockBodyScroll();
    }
  }

  @Watch('modelValue')
  async onModelValueChange(next: boolean) {
    if (next) {
      await this.onOpenHandler();
    } else {
      const reason = this.pendingCloseReason ?? 'programmatic';
      this.pendingCloseReason = null;
      await this.onCloseHandler(reason);
    }
  }

  @Method()
  async open() {
    if (this.modelValue) return;
    this.modelValue = true;
    this.updateModelValue.emit(true);
  }

  @Method()
  async close() {
    if (!this.modelValue) return;
    this.requestClose('programmatic');
  }


  private getInstinctHeight(): number {
    const contentHeight = this.contentMeasureRef?.scrollHeight ?? 0;
    return Math.max(0, Math.round(contentHeight));
  }

  private emitInstinctHeight() {
    const h = this.getInstinctHeight();
    this.instinctHeight.emit(h);
  }

  private async onOpenHandler() {
    this.rendered = true;
    if (this.blocking) {
      lockBodyScroll();
    }

    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    this.visible = true;

    // Update touch handlers with current ref and enabled state
    this.touchHandlers = createTouchHandlers({
      enabled: this.closable && this.canSwipeClose,
      sheetRef: this.sheetRef,
      duration: this.duration,
      onSwipeClose: () => this.requestClose('swipe'),
    });

    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    this.emitInstinctHeight();

    if (this.hashBased) {
      this.locationHash.pushHash(this.bottomSheetId);
    }

    this.afterOpen?.();
  }

  private async onCloseHandler(reason: BottomSheetCloseReason) {
    this.closingStarted.emit({ reason });
    this.visible = false;
    await waitFor(this.duration);
    this.rendered = false;
    this.expanded = false;

    if (this.hashBased) {
      const lastHash = this.locationHash.getLastHash();
      if (lastHash === this.bottomSheetId) {
        this.locationHash.popHash();
      }
    }

    if (this.blocking) {
      unlockBodyScroll();
    }
    this.afterClose?.();
  }

  private requestClose(reason: BottomSheetCloseReason) {
    if (!this.closable) return;
    this.pendingCloseReason = reason;
    this.modelValue = false;
    this.updateModelValue.emit(false);
  }

  private onBackdropClick = () => {
    if (!this.closable) return;
    if (!this.canBackdropClose) return;
    this.requestClose('backdrop');
  };

  private onToggleExpand = () => {
    if (!this.expandable) return;
    this.expanded = !this.expanded;
  };


  render() {
    if (!this.rendered) return null;

    const instinctHeight = this.getInstinctHeight();
    const snapHeight = computeSnapHeightPx(
      this.snapPoints,
      this.height,
      this.expandable,
      instinctHeight,
      this.initialSnapPoint,
    );
    const hasFooterSlot = !!this.el.querySelector('[slot="footer"]');
    const hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    const sheetMaxHeight = this.expanded ? '100vh' : snapHeight ? `${snapHeight}px` : undefined;

    return (
      <Host>
        <div
          class={`${WRAPPER_BASE} ${getWrapperClasses(this.visible)}`}
          aria-hidden={this.visible ? 'false' : 'true'}
        >
          <div
            class={`${BACKDROP_BASE} ${getBackdropClasses(this.visible)}`}
            style={getBackdropStyles(this.duration)}
            onClick={this.onBackdropClick}
          />

          <div
            ref={(el) => (this.sheetRef = el as HTMLElement)}
            class={`${SHEET_CONTAINER_BASE} ${getSheetClasses(this.visible)}`}
            style={getSheetStyles(this.duration, sheetMaxHeight)}
            onTouchStart={this.touchHandlers.onTouchStart}
            onTouchMove={this.touchHandlers.onTouchMove}
            onTouchEnd={this.touchHandlers.onTouchEnd}
          >
            <div
              role="button"
              tabIndex={0}
              aria-label="Handle"
              class={`${HANDLE_BUTTON_BASE} cursor-pointer select-none`}
              onClick={this.onToggleExpand}
              onTouchStart={this.touchHandlers.onTouchStart}
              onTouchMove={this.touchHandlers.onTouchMove}
              onTouchEnd={this.touchHandlers.onTouchEnd}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.onToggleExpand();
                }
              }}
            >
              <span class={HANDLE_SPAN_BASE} style={getHandleStyles()} />
            </div>

            <div ref={(el) => (this.contentMeasureRef = el as HTMLElement)}>
              {hasHeaderSlot ? (
                <div class={getHeaderClass(undefined, this.headerClass)}>
                  <slot name="header" />
                </div>
              ) : null}

              <div class={`${getContentClass(undefined, this.contentClass, hasFooterSlot, this.removeFooterPadding)} overflow-auto`}>
                <slot />
              </div>

              {hasFooterSlot ? (
                <div class={getFooterClass(undefined, this.footerClass, this.removeFooterPadding)}>
                  <slot name="footer" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

