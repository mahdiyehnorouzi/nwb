import { Component, State, h } from '@stencil/core';
import dialogStore from './store';
import type { DialogProps } from './types';

@Component({
  tag: 'n-dialog',
  shadow: false,
})
export class NDialog {
  @State() dialogs: DialogProps[] = [];
  private unsubscribe?: () => void;

  componentWillLoad() {
    this.dialogs = [...dialogStore.dialogs];
    this.unsubscribe = dialogStore.subscribe((nextDialogs) => {
      this.dialogs = [...nextDialogs];
    });
  }

  componentDidLoad() {
    if (typeof window !== 'undefined') {
      // High: empty catch around `window.dispatchEvent` is dead
      // defensiveness — under realistic browser conditions this won't throw,
      // and if it ever does we want to know. Drop the try/catch.
      // TODO [ARCHITECTURE]: remove unnecessary try/catch.
      try {
        window.dispatchEvent(new CustomEvent('nwb-dialog-store-ready', { detail: dialogStore }));
      } catch (_) {}
    }
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = undefined;
    }
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
