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
import lodash from 'lodash';

class DataTableBody extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
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
   * Default constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  _calculateHeight(rowHeight, maxHeight, numberOfRow, numberOfColumn) {
    var height = (rowHeight * (numberOfRow + 1));
    if (height > maxHeight) {
      height = maxHeight;
    }
    var heightAsStr = height + 'px';
    this.setState({height: heightAsStr, numberOfColumn: numberOfColumn});
  }

  /**
   * Calculate height of component before rendering.
   */
  componentWillMount() {
    var numberOfColumn = Object.keys(this.props.data[0]).length + '';
    this._calculateHeight(this.props.rowHeight, this.props.maxHeight, this.props.data.length, numberOfColumn);
  }

  componentWillReceiveProps(nextProps) {
    var numberOfColumn = Object.keys(nextProps.data[0]).length + '';
    this._calculateHeight(nextProps.rowHeight, nextProps.maxHeight, nextProps.data.length, numberOfColumn);
  }

  /**
   * Render header row base on first element of data properties
   * @returns {XML}
   */
  renderHeaderRow() {
    return (
      <TableRow>
        {Object.keys(this.props.data[0]).map((key, index) => (
          this.renderHeaderColumn(key, index)
        ))}
      </TableRow>
    );
  }

  /**
   * Render header column base on properties of first element of data
   * @param {String} key
   * @param {Number} index
   * @returns {TableHeaderColumn} TableHeaderColumn
   */
  renderHeaderColumn(key, index) {
    if (key !== 'selected') {
      return <TableHeaderColumn key={index} tooltip={lodash.startCase(key)}>{lodash.startCase(key)}</TableHeaderColumn>;
    }
  }

  renderRow(row, index) {
    return (
      <TableRow key={index} selected={row.selected}>
        {Object.keys(row).map((key, i) => (
          this.renderColumn(row, key, index)
        ))}
      </TableRow>
    );
  }

  /**
   * Render columns for each row
   * @param {Object} row row data
   * @param {String} key key of column
   * @param {Number} index index of column
   * @returns {XML}
   */
  renderColumn(row, key, index) {
    if (key !== 'selected') {
      return <TableRowColumn key={index}>{row[key]}</TableRowColumn>;
    }
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
          {this.props.data.map((row, index) => (
            this.renderRow(row, index)
          ))}
        </TableBody>
        <TableFooter>
          {this.props.children}
        </TableFooter>
      </Table>
    );
  }
}

export default DataTableBody;
