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
import Pagination from '../Pagination/Pagination';

class DataTableBody extends React.Component {

  static propTypes = {
    column: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    fixedHeader: PropTypes.bool,
    fixedFooter: PropTypes.bool,
    stripedRows: PropTypes.bool,
    showRowHover: PropTypes.bool,
    selectable: PropTypes.bool,
    multiSelectable: PropTypes.bool,
    enableSelectAll: PropTypes.bool,
    deselectOnClickaway: PropTypes.bool,
    showCheckboxes: PropTypes.bool,
    onRowSelected: PropTypes.func,
    handlePageClick: PropTypes.func,
    handlePageSizeClick: PropTypes.func,
    pageSize: PropTypes.array.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: true,
    selectable: false,
    multiSelectable: true,
    enableSelectAll: true,
    deselectOnClickaway: false,
    showCheckboxes: false
  };

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

  /**
   * Render component
   * @returns {XML}
   */
  render() {
    return (
      <Table
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
          {this.props.children}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn colSpan={this.props.column.length}>
              <Pagination total={this.props.total} page={this.props.page}
                          handlePageClick={this.props.handlePageClick}
                          handlePageSizeClick={this.props.handlePageSizeClick}
                          pageSize={this.props.pageSize}
              />
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

export default DataTableBody;
