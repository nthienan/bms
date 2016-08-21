import React, {PropTypes} from 'react';
import DataTable from '../../ui/DataTable/DataTable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectedAppliance, deleteSelectedAppliance} from '../../../actions/applaince';

class Appliance extends React.Component {

  static propTypes = {
    appliances: PropTypes.array.isRequired,
    selectedAppliance: PropTypes.func,
    hideRemove: PropTypes.bool,
    deleteSelectedAppliance: PropTypes.func
  };

  static defaultProps = {
    hideRemove: true
  };

  constructor(props) {
    super(props);
  }

  renderApplianceList() {
    return (
      <div className="ap-appliance">
        <DataTable data={this.props.appliances} title="Appliances" onRowSelected={this.props.selectedAppliance}
                   hideRemove={this.props.hideRemove}
                   onRemove={this.props.deleteSelectedAppliance}
        />
      </div>
    );
  }

  render() {
    if (this.props.appliances && this.props.appliances.length != 0) {
      return this.renderApplianceList();
    } else {
      return <div>Nothing to show</div>;
    }
  }
}

function mapStateToProps(state) {
  let hideRemove = true;
  for (let i = 0; i < state.appliances.length; i++) {
    if (state.appliances[i].selected) {
      hideRemove = false;
    }
  }
  return {
    appliances: state.appliances,
    hideRemove: hideRemove
  };
}

function mappDispatchToProps(dispatch) {
  return bindActionCreators({
    selectedAppliance: selectedAppliance,
    deleteSelectedAppliance: deleteSelectedAppliance
  }, dispatch);
}

export default connect(mapStateToProps, mappDispatchToProps)(Appliance);
