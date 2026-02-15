import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
  h,
} from '@stencil/core';

@Component({
  tag: 'n-table-row',
  shadow: true,
})
export class NTableRow {
  @Prop() row: any;
  @Prop() index: number = 0;
  @Prop() highlighted: boolean = false;
  @Prop() striped: boolean = false;
  @Prop() rowSplitter: boolean = true;
  @Prop() showLoading: boolean = false;
  @Prop() selectable: boolean = false;
  @Prop() isAllSelected: boolean = false;
  @Prop() isClickable: boolean = false;

  @State() checked: boolean = false;

  @Event() rowClick!: EventEmitter<any>;
  @Event() rowSelectionChange!: EventEmitter<any>;

  @Watch('isAllSelected')
  handleAllSelectedChange(newValue: boolean) {
    this.checked = newValue;
  }

  componentWillLoad() {
    this.checked = this.isAllSelected;
  }

  private handleClick = () => {
    if (this.selectable) {
      this.checked = !this.checked;
      this.rowSelectionChange.emit({
        row: this.row,
        checked: this.checked,
      });
      return;
    }

    if (this.isClickable) {
      this.rowClick.emit(this.row);
    }
  };

  render() {
    const isOdd = this.index % 2 !== 0;

    return (
      <tr
        tabindex={this.isClickable ? 0 : undefined}
        class={{
          'border-b border-neutral-secondary': true,
          'cursor-pointer': this.isClickable,
          'bg-neutral-secondary':
            this.striped && isOdd && !this.checked,
          'bg-brand-primary-press bg-opacity-20':
            this.highlighted,
          'bg-brand-quaternary-press bg-opacity-5':
            this.selectable && this.checked,
          'last:border-b-0': !this.showLoading,
        }}
        onClick={this.handleClick}
      >
        {this.selectable && (
          <td style={{ textAlign: 'center' }}>
            <input type="checkbox" checked={this.checked} />
          </td>
        )}

        <slot />
      </tr>
    );
  }
}
