import React, {Component, PropTypes} from 'react';
import DataTable from '../../ui/DataTable/DataTable';
import NoResultBackground from '../../ui/Background/NoResultBackground';
import CircularLoading from '../../ui/CircularLoading/CircularLoading';
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
    this.columns = {
      name: 'Appliance Name',
      hostname: 'Hostname',
      ipv4Address: 'IPv4 Address',
      owners: 'Owners'
    };
  }

  componentWillMount() {
    this.props.loadAppliances();
  }

  renderApplianceList() {
    const apps = this.props.appliances._embedded.appliances.map(app => {
      let owners = '';
      if (app.owners) {
        for (let i = 0; i < app.owners._embedded.users.length; i++) {
          if (i !== app.owners._embedded.users.length - 1) {
            owners += app.owners._embedded.users[i].firstName + ', ';
          } else {
            owners += app.owners._embedded.users[i].firstName;
          }
        }
      }
      return {name: app.name, hostname: app.hostname, ipv4Address: app.ipv4Address, owners}
    });
    return (
      <div className="ap-appliance">
        <DataTable data={apps}
                   title="Appliances"
                   column={this.columns}
                   onRowSelected={this.props.selectedAppliance}
                   onRemove={this.props.deleteSelectedAppliance}
                   onReload={this.props.loadAppliances}
        />
      </div>
    );
  }

  render() {
    if (this.props.appliances.isLoading) {
      return <CircularLoading show={this.props.appliances.isLoading}/>;
    }
    if (this.props.appliances._embedded.appliances
      && this.props.appliances._embedded.appliances.length != 0) {
      return this.renderApplianceList();
    } else {
      return <NoResultBackground/>;
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
