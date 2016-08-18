import React, {PropTypes} from 'react';
import {Card} from 'material-ui/Card';
import DataTableTitle from './DataTableTitle';
import DataTableBody from './DataTableBody';
import CrudButtons from '../Button/CrudButtons/CrudButtons';

class DataTable extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    maxHeight: PropTypes.number,
    onRowSelected: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="da-datatable">
        <Card>
          <DataTableTitle title={this.props.title}>
            <div className="right-corner-action">
              <CrudButtons/>
            </div>
          </DataTableTitle>
          <DataTableBody data={this.props.data} maxHeight={this.props.maxHeight} onRowSelected={this.props.onRowSelected}/>
        </Card>
      </div>
    );
  }
}

export default DataTable;
