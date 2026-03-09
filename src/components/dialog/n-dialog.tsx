import { Component, State, h } from '@stencil/core';
import { useDialog } from './useDialog';
import type { DialogProps } from './types';

@Component({
  tag: 'n-dialog',
  shadow: false,
})
export class NDialog {
  @State() dialogs: DialogProps[] = [];
  private watchInterval?: number;

  componentWillLoad() {
    this.updateDialogs();
    this.watchDialogs();
  }

  componentDidLoad() {
    const dialogStore = useDialog();
    // ANTI-PATTERN: Exposing store on window object
    // This breaks SSR and pollutes global namespace
    if (typeof window !== 'undefined') {
      (window as any).nwbDialogStore = dialogStore;
      (window as any).useDialog = () => dialogStore;
      try {
        window.dispatchEvent(new CustomEvent('nwb-dialog-store-ready', { detail: dialogStore }));
      } catch (_) {}
    }
  }

  disconnectedCallback() {
    // TODO: Clear window globals to prevent memory leaks
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
    }
  }

  private updateDialogs() {
    const dialogStore = useDialog();
    const currentDialogs = dialogStore.dialogs;
    this.dialogs = [...currentDialogs];
  }

  private watchDialogs() {
    //  CRITICAL PERFORMANCE ISSUE: Polling every 50ms
    // Problems:
    // 1. Wastes CPU cycles continuously
    // 2. Drains battery on mobile devices
    // 3. Not scalable - 20 checks per second per component
    // 4. Can cause UI jank if comparison is expensive
    //
    // RECOMMENDED FIX:
    // 1. Use Stencil's @Watch decorator with reactive store
    // 2. Implement observer pattern in store with subscribe/notify
    // 3. Use CustomEvent from store to component
    // 4. Consider @stencil/store package for reactive state
    //
    // Example fix:
    //   const store = createStore({ dialogs: [] });
    //   store.on('change', () => this.dialogs = store.state.dialogs);
    this.watchInterval = window.setInterval(() => {
      const dialogStore = useDialog();
      const currentDialogs = dialogStore.dialogs;

      // Expensive string comparison on every poll
      const currentIds = currentDialogs
        .map(d => d.id)
        .sort()
        .join(',');
      const existingIds = this.dialogs
        .map(d => d.id)
        .sort()
        .join(',');

      if (currentIds !== existingIds || currentDialogs.length !== this.dialogs.length) {
        this.updateDialogs();
      }
    }, 50); // FIX: Remove polling, use event-driven updates
  }

  render() {
    return (
      <div>
        {this.dialogs.map((dialog) => (
          <n-dialog-item
            key={dialog.id}
            dialogId={dialog.id}
            zIndex={dialog.zIndex}
            index={dialog.index}
            dialogDirection={dialog.direction || 'rtl'}
            content={dialog.content}
            dialogTitle={dialog.title}
            expandableLabel={dialog.expandableLabel}
            expandable={dialog.expandable}
            defaultExpanded={dialog.defaultExpanded}
            expandedContent={dialog.expandedContent}
            footer={dialog.footer}
            bodyClass={dialog.bodyClass}
            wrapperClass={dialog.wrapperClass}
            footerClass={dialog.footerClass}
            multiple={dialog.multiple}
            referenceElementRef={dialog.referenceElementRef}
            placement={dialog.placement}
            headerLess={dialog.headerLess}
            afterClose={dialog.afterClose}
            afterOpen={dialog.afterOpen}
          />
        ))}
      </div>
    );
  }
}
