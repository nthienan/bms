import React, {PropTypes} from 'react';
import DataTable from '../../ui/DataTable/DataTable'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectedAppliance} from '../../../actions/applaince';

class Appliance extends React.Component {

  static propTypes = {
    appliances: PropTypes.array.isRequired,
    selectedAppliance: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ap-appliance">
        <DataTable data={this.props.appliances} title="Appliances" onRowSelected={this.props.selectedAppliance}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appliances: state.appliances
  };
}

function mappDispatchToProps(dispatch) {
  return bindActionCreators({
    selectedAppliance: selectedAppliance
  }, dispatch);
}

export default connect(mapStateToProps, mappDispatchToProps)(Appliance);
