import React, {PropTypes} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class DataTableBody extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    column: PropTypes.object.isRequired,
    children: PropTypes.element,
    fixedHeader: PropTypes.bool,
    fixedFooter: PropTypes.bool,
    stripedRows: PropTypes.bool,
    showRowHover: PropTypes.bool,
    selectable: PropTypes.bool,
    multiSelectable: PropTypes.bool,
    enableSelectAll: PropTypes.bool,
    deselectOnClickaway: PropTypes.bool,
    showCheckboxes: PropTypes.bool,
    rowHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    onRowSelected: PropTypes.func
  };

  static defaultProps = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: true,
    selectable: true,
    multiSelectable: true,
    enableSelectAll: true,
    deselectOnClickaway: false,
    showCheckboxes: true,
    rowHeight: 48,
    maxHeight: 550
  };

  /**
   * Calculate height of component before rendering.
   */
  componentWillMount() {
    this._calculateHeight(this.props.rowHeight, this.props.maxHeight, this.props.data.length);
  }

  componentWillReceiveProps(nextProps) {
    this._calculateHeight(nextProps.rowHeight, nextProps.maxHeight, nextProps.data.length);
  }

  _calculateHeight(rowHeight, maxHeight, numberOfRow) {
    var height = (rowHeight * (numberOfRow + 1));
    if (height > maxHeight) {
      height = maxHeight;
    }
    var heightAsStr = height + 'px';
    this.setState({height: heightAsStr});
  }

  /**
   * Render header row base on first element of data properties
   * @returns {XML}
   */
  renderHeaderRow() {
    return (
      <TableRow>
        {
          Object.keys(this.props.column).map((field, idx) => {
            let value = this.props.column[field];
            return <TableHeaderColumn key={idx} tooltip={value}>{value}</TableHeaderColumn>
          })
        }
      </TableRow>
    );
  }

  renderRow(row, index) {
    return (
      <TableRow key={index} selected={row.selected}>
        {Object.keys(this.props.column).map((key, i) => {
            return <TableRowColumn key={i}>{row[key]}</TableRowColumn>;
        })}
      </TableRow>
    );
  }

  /**
   * Render component
   * @returns {XML}
   */
  render() {
    return (
      <Table
        height={this.state.height}
        fixedHeader={this.props.fixedHeader}
        fixedFooter={this.props.fixedFooter}
        selectable={this.props.selectable}
        multiSelectable={this.props.multiSelectable}
        onRowSelection={this.props.onRowSelected}
      >
        <TableHeader
          displaySelectAll={this.props.showCheckboxes}
          adjustForCheckbox={this.props.showCheckboxes}
          enableSelectAll={this.props.enableSelectAll}
        >
          {this.renderHeaderRow()}
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.props.showCheckboxes}
          deselectOnClickaway={this.props.deselectOnClickaway}
          showRowHover={this.props.showRowHover}
          stripedRows={this.props.stripedRows}
        >
          {this.props.data.map((row, index) =>
            this.renderRow(row, index)
          )}
        </TableBody>
        <TableFooter>
          {this.props.children}
        </TableFooter>
      </Table>
    );
  }
}

export default DataTableBody;
