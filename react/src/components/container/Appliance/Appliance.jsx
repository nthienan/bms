import React, {Component, PropTypes} from 'react';
import DataTable from '../../ui/DataTable/DataTable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectedAppliance, deleteSelectedAppliance, loadAppliances} from '../../../actions/applaince-actions';

class Appliance extends Component {

  static propTypes = {
    appliances: PropTypes.object.isRequired,
    selectedAppliance: PropTypes.func,
    deleteSelectedAppliance: PropTypes.func,
    getResourceLinks: PropTypes.func,
    loadAppliances: PropTypes.func
  };

  static defaultProps = {
    hideRemove: true
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadAppliances({page: 0});
  }

  renderApplianceList() {
    return (
      <div className="ap-appliance">
        <DataTable data={this.props.appliances.data._embedded.appliances}
                   title="Appliances"
                   column={this.props.appliances.column}
                   onRowSelected={this.props.selectedAppliance}
                   onRemove={this.props.deleteSelectedAppliance}
                   onReload={this.props.loadAppliances}
        />
      </div>
    );
  }

  render() {
    if (this.props.appliances.data._embedded.appliances
      && this.props.appliances.data._embedded.appliances.length != 0) {
      return this.renderApplianceList();
    } else {
      return <div>Nothing to show</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    appliances: state.appliances
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectedAppliance: selectedAppliance,
    deleteSelectedAppliance: deleteSelectedAppliance,
    loadAppliances: loadAppliances
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Appliance);
