import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    Watch,
    h,
  } from '@stencil/core';
import { SortOrder, NTableColumnConfigAlign, SORT_ORDER_CYCLE } from '../types';
import { ICON_BASE, SORT_INDEX } from './theme';
    
  @Component({
    tag: 'n-table-header',
    shadow: true,
  })
  export class NTableHeader {
    @Prop() prop!: string;
    @Prop() label!: string;
    @Prop() sortable: boolean = false;
    @Prop() align: NTableColumnConfigAlign = 'center';
    @Prop() sortOrder: SortOrder = 'none';
    @Prop() sortIndex?: number;
  
    @State() internalOrder: SortOrder = 'none';
  
    @Event() sortChange!: EventEmitter<{
      prop: string;
      order: SortOrder;
    }>;
  
    @Watch('sortOrder')
    handleExternalSortChange(newVal: SortOrder) {
      this.internalOrder = newVal;
    }
  
    componentWillLoad() {
      this.internalOrder = this.sortOrder;
    }
  
    private toggleSort = () => {
      if (!this.sortable) return;

      this.internalOrder = SORT_ORDER_CYCLE[this.internalOrder];
  
      this.sortChange.emit({
        prop: this.prop,
        order: this.internalOrder,
      });
    };
  
    private renderIcon() {
      if (!this.sortable) return null;

      if (this.internalOrder === 'asc') return <span class={ICON_BASE}>▲</span>;
      if (this.internalOrder === 'desc') return <span class={ICON_BASE}>▼</span>;

      return null;
    }
  
    render() {
      return (
        <th
          tabindex={0}
          style={{ textAlign: this.align }}
          class={{
            'cursor-pointer': this.sortable,
          }}
          onClick={this.toggleSort}
        >
          {this.label || (this.prop ? this.prop : '')}
          {this.renderIcon()}
  
          {this.sortIndex && (
            <span class={`${SORT_INDEX} text-neutral-quaternary`}>
              {this.sortIndex}
            </span>
          )}
        </th>
      );
    }
  }
  