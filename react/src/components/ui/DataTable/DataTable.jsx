import React, {PropTypes} from 'react'
import {
  Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
}
  from 'material-ui/Table';
import {Card, CardTitle} from 'material-ui/Card';
import lodash from 'lodash'

class DataTable extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    fixedHeader: PropTypes.bool,
    fixedFooter: PropTypes.bool,
    stripedRows: PropTypes.bool,
    showRowHover: PropTypes.bool,
    selectable: PropTypes.bool,
    multiSelectable: PropTypes.bool,
    enableSelectAll: PropTypes.bool,
    deselectOnClickaway: PropTypes.bool,
    showCheckboxes: PropTypes.bool,
    rowHeight: PropTypes.number
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
    rowHeight: 48
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var height = (this.props.rowHeight * (this.props.data.length + 1)) + 'px';
    var numberOfColumn = Object.keys(this.props.data[0]).length + '';
    this.setState({height: height, numberOfColumn: numberOfColumn});
  }

  renderHeaderRow = () => {
    return (
      <TableRow>
        {Object.keys(this.props.data[0]).map((key, index) => (
          <TableHeaderColumn key={index} tooltip={lodash.startCase(key)}>{lodash.startCase(key)}</TableHeaderColumn>
        ))}
      </TableRow>
    );
  };

  renderRow = (row, index) => {
    return (
      <TableRow key={index} selected={row.selected}>
        {Object.keys(row).map((key, i) => (
          <TableRowColumn key={i}>{row[key]}</TableRowColumn>
        ))}
      </TableRow>
    );
  };

  render() {
    return (
      <div>
        <Card>
          <CardTitle title={this.props.title}/>
          <Table
            height={this.state.height}
            fixedHeader={this.props.fixedHeader}
            fixedFooter={this.props.fixedFooter}
            selectable={this.props.selectable}
            multiSelectable={this.props.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.props.showCheckboxes}
              adjustForCheckbox={this.props.showCheckboxes}
              enableSelectAll={this.props.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn colSpan={this.state.numberOfColumn} style={{textAlign: 'center'}}>
                  Supper header
                </TableHeaderColumn>
              </TableRow>
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
            <TableFooter adjustForCheckbox={this.props.showCheckboxes}>
              <TableRow>
                <TableRowColumn colSpan={this.state.numberOfColumn} style={{textAlign: 'center'}}>
                  Super Footer
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </div>
    );
  }
}

export default DataTable;
