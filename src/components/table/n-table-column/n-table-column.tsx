import { Component, Prop, h } from '@stencil/core';
import { ColumnType, NTableColumnConfigAlign } from '../types';

@Component({
  tag: 'n-table-column',
})
export class NTableColumn {
  @Prop() prop?: string;
  @Prop() label?: string;
  @Prop() type: ColumnType = ColumnType.Default;
  @Prop() sortable: boolean = false;
  @Prop() align: NTableColumnConfigAlign = 'center';

  render() {
    return <slot />;
  }
}
