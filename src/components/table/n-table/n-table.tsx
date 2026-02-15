import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    Element,
    Watch,
    h,
  } from '@stencil/core';
  
  import {
    ColumnType,
    ColumnPadding,
    SortBy,
    NTableColumnConfig,
  } from '../types';
  import { TABLE } from './theme';
  import { INDEX_BASE } from '../n-table-column/theme';
  
  @Component({
    tag: 'n-table',
    shadow: true,
  })
  export class NTable {
    @Element() el!: HTMLElement;
  
    @Prop() data: any[] = [];
    @Prop() striped: boolean = true;
    @Prop() selectable: boolean = false;
    @Prop() fixedHeader: boolean = false;
    @Prop() sortMultiple: boolean = false;
    @Prop() identifier: string = 'id';
    @Prop() cellPadding: ColumnPadding = ColumnPadding.Medium;
  
    @State() columns: NTableColumnConfig[] = [];
    @State() internalData: any[] = [];
    @State() selectedRows: any[] = [];
    @State() sortState: SortBy[] = [];
  
    @Event() selectionChange!: EventEmitter<any[]>;
    @Event() sortChange!: EventEmitter<SortBy[]>;
  
    componentWillLoad() {
      this.syncColumns();
      this.internalData = [...this.data];
    }
  
    @Watch('data')
    onDataChange() {
      this.internalData = [...this.data];
      this.applySorting();
    }
  
    private syncColumns() {
      const columnElements = Array.from(
        this.el.querySelectorAll('n-table-column')
      );
  
      this.columns = columnElements.map((col: any) => ({
        prop: col.prop,
        label: col.label,
        type: col.type,
        sortable: col.sortable,
        align: col.align,
      }));
    }
  
    private toggleSort(prop: string) {
      const existing = this.sortState.find(s => s.prop === prop);
  
      if (!this.sortMultiple) {
        this.sortState = [];
      }
  
      if (!existing) {
        this.sortState = [...this.sortState, { prop, order: 'asc' }];
      } else if (existing.order === 'asc') {
        existing.order = 'desc';
      } else {
        this.sortState = this.sortState.filter(s => s.prop !== prop);
      }
  
      this.applySorting();
      this.sortChange.emit(this.sortState);
    }
  
    private applySorting() {
      if (!this.sortState.length) {
        this.internalData = [...this.data];
        return;
      }
  
      this.internalData = [...this.data].sort((a, b) => {
        for (const sort of this.sortState) {
          const valA = a[sort.prop];
          const valB = b[sort.prop];
  
          if (valA < valB) return sort.order === 'asc' ? -1 : 1;
          if (valA > valB) return sort.order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  
    private toggleRow(row: any) {
      const exists = this.selectedRows.find(
        r => r[this.identifier] === row[this.identifier]
      );
  
      if (exists) {
        this.selectedRows = this.selectedRows.filter(
          r => r[this.identifier] !== row[this.identifier]
        );
      } else {
        this.selectedRows = [...this.selectedRows, row];
      }
  
      this.selectionChange.emit(this.selectedRows);
    }
  
    private isRowSelected(row: any) {
      return this.selectedRows.some(
        r => r[this.identifier] === row[this.identifier]
      );
    }
  
    render() {
      return (
        <div class="table-container">
          <table class={TABLE}>
            <thead class={this.fixedHeader ? 'sticky' : ''}>
              <tr>
                {this.selectable && <th></th>}
  
                {this.columns.map(col => (
                  <th
                    style={{ textAlign: col.align }}
                    onClick={() =>
                      col.sortable && col.prop
                        ? this.toggleSort(col.prop)
                        : null
                    }
                  >
                    {col.label}
                    {this.renderSortIcon(col.prop)}
                  </th>
                ))}
              </tr>
            </thead>
  
            <tbody>
              {this.internalData.map((row, index) => (
                <tr
                  class={{
                    striped: this.striped && index % 2 !== 0,
                    selected: this.isRowSelected(row),
                  }}
                  onClick={() =>
                    this.selectable
                      ? this.toggleRow(row)
                      : null
                  }
                >
                  {this.selectable && (
                    <td>
                      <input
                        type="checkbox"
                        checked={this.isRowSelected(row)}
                      />
                    </td>
                  )}
  
                  {this.columns.map(col => (
                    <td style={{ textAlign: col.align }}>
                      {col.type === ColumnType.Index
                        ? <span class={INDEX_BASE}>{index + 1}</span>
                        : row[col.prop]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  
    private renderSortIcon(prop?: string) {
      if (!prop) return null;
  
      const sort = this.sortState.find(s => s.prop === prop);
  
      if (!sort) return null;
  
      return (
        <span>
          {sort.order === 'asc' ? ' ▲' : ' ▼'}
        </span>
      );
    }
  }
  