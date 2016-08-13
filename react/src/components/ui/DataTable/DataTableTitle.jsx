import React, {PropTypes} from 'react';
import {CardTitle} from 'material-ui/Card';

class DataTableAction extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CardTitle title={this.props.title}>
        {this.props.children}
      </CardTitle>
    );
  }
}

export default DataTableAction;
