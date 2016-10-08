import React, {PropTypes} from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import DataTableBody from './DataTableBody';
import CrudButtons from '../Button/CrudButtons/CrudButtons';

/**
 * Class DataTable component.
 */
class DataTable extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    column: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onRowSelected: PropTypes.func,
    hideRemove: PropTypes.bool,
    onSearch: PropTypes.func,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    handlePageSizeClick: PropTypes.func,
    handlePageClick: PropTypes.func,
    pageSize: PropTypes.array.isRequired
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
    const style = {
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      right: '0px',
      padding: '16px'
    };
    return (
      <div>
        <Card>
          <CardTitle title={this.props.title}>
            <div style={style}>
              <CrudButtons hideRemove={this.props.hideRemove}
                           onSearch={this.props.onSearch}
                           onReload={this.props.onReload}
                           onAdd={this.props.onAdd}
                           onRemove={this.props.onRemove}
              />
            </div>
          </CardTitle>
          <DataTableBody data={this.props.data} column={this.props.column}
                         onRowSelected={this.props.onRowSelected}
                         total={this.props.total} page={this.props.page}
                         handlePageClick={this.props.handlePageClick}
                         handlePageSizeClick={this.props.handlePageSizeClick}
                         pageSize={this.props.pageSize}
          />
        </Card>
      </div>
    );
  }
}

export default DataTable;
