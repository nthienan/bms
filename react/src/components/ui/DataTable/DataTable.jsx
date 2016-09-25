import React, {PropTypes} from 'react';
import {Card} from 'material-ui/Card';
import DataTableTitle from './DataTableTitle';
import DataTableBody from './DataTableBody';
import CrudButtons from '../Button/CrudButtons/CrudButtons';

/**
 * Class DataTable component.
 */
class DataTable extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    column: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    maxHeight: PropTypes.number,
    onRowSelected: PropTypes.func,
    hideRemove: PropTypes.bool,
    onSearch: PropTypes.func,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  };

  static defaultProps = {
    hideRemove: true
  };

  constructor(props) {
    super(props);
  }

  /**
   * Render component
   * @returns {XML} data table component
   */
  render() {
    return (
      <div className="da-datatable">
        <Card>
          <DataTableTitle title={this.props.title}>
            <div className="right-corner-action">
              <CrudButtons hideRemove={this.props.hideRemove}
                           onSearch={this.props.onSearch}
                           onReload={this.props.onReload}
                           onAdd={this.props.onAdd}
                           onRemove={this.props.onRemove}
              />
            </div>
          </DataTableTitle>
          <DataTableBody data={this.props.data} column={this.props.column}
                         maxHeight={this.props.maxHeight}
                         onRowSelected={this.props.onRowSelected}
          />
        </Card>
      </div>
    );
  }
}

export default DataTable;
