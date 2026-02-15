export enum ColumnType {
    Default = 'default',
    Index = 'index',
  }
  
  export enum ColumnPadding {
    Medium = 'medium',
    Small = 'small',
  }
  
  export type SortOrder = 'asc' | 'desc' | 'none';
  
  export type SortBy = {
    prop: string;
    order: SortOrder;
  };
  
  export type NTableColumnConfigAlign = 'left' | 'center' | 'right';

  export type NTableColumnConfig = {
    prop?: string;
    label?: string;
    type?: ColumnType;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
  };
  
  export type NTableSelectionEvent = {
    selectedRows: any[];
  };
  
export type NTableSortEvent = {
  sortBy: SortBy[];
};

  export const SORT_ORDER_CYCLE: Record<SortOrder, SortOrder> = {
    none: 'asc',
    asc: 'desc',
    desc: 'none',
  };