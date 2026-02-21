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
    if (typeof window !== 'undefined') {
      (window as any).nwbDialogStore = dialogStore;
      (window as any).useDialog = () => dialogStore;
      try {
        window.dispatchEvent(new CustomEvent('nwb-dialog-store-ready', { detail: dialogStore }));
      } catch (_) {}
    }
  }

  disconnectedCallback() {
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
    this.watchInterval = window.setInterval(() => {
      const dialogStore = useDialog();
      const currentDialogs = dialogStore.dialogs;
      
      const currentIds = currentDialogs.map(d => d.id).sort().join(',');
      const existingIds = this.dialogs.map(d => d.id).sort().join(',');
      
      if (currentIds !== existingIds || currentDialogs.length !== this.dialogs.length) {
        this.updateDialogs();
      }
    }, 50);
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
