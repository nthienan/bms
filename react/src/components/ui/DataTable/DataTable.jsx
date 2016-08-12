import React, {PropTypes} from 'react'
import {Card} from 'material-ui/Card';
import DataTableAction from './DataTableAction'
import DataTableBody from './DataTableBody'

class DataTable extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="da-datatable">
        <Card>
          <DataTableAction title={this.props.title}/>
          <DataTableBody data={this.props.data}/>
        </Card>
      </div>
    );
  }
}

export default DataTable;
