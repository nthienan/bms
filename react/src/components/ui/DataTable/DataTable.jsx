import React, {PropTypes} from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import CrudButtons from '../Button/CrudButtons/CrudButtons';

/**
 * Class DataTable component.
 */
class DataTable extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    hideRemove: PropTypes.bool,
    onSearch: PropTypes.func,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    children: PropTypes.node
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
          {this.props.children}
        </Card>
      </div>
    );
  }
}

export default DataTable;
