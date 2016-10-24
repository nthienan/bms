import React, {Component, PropTypes} from 'react';
import DataTable from '../../ui/DataTable/DataTable';
import NoResultBackground from '../../ui/Background/NoResultBackground';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showNewApplianceForm, loadAppliances} from '../../../actions/appliance-actions';
import FloatingAddButton from '../../ui/Button/FloatingAddButton/FloatingAddButton';

class Appliance extends Component {

  static propTypes = {
    appliances: PropTypes.object.isRequired,
    getResourceLinks: PropTypes.func,
    loadAppliances: PropTypes.func,
    columns: PropTypes.object,
    showNewApplianceForm: PropTypes.func
  };

  static defaultProps = {
    columns: {
      hostname: 'Hostname',
      ipv4Address: 'IPv4 Address',
      note: 'Note',
      owners: 'Owners'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      pageSize: [
        {lable: '5 rows/page', value: 5},
        {lable: '10 rows/page', value: 10},
        {lable: '20 rows/page', value: 20, selected: true},
        {lable: '50 rows/page', value: 50},
        {lable: '100 rows/page', value: 100},
        {lable: '200 rows/page', value: 200},
      ]
    }
  }

  componentWillMount() {
    let pageSize = 5;
    this.state.pageSize.map(e => {
      if(e.selected) {
        pageSize = e.value;
      }
    });
    this.props.loadAppliances({
      page: this.props.appliances.page.number,
      size: pageSize,
      sort: 'hostname'
    });
  }

  handleMovePage = (nextPage) => {
    let pageSize = 5;
    this.state.pageSize.map(e => {
      if(e.selected) {
        pageSize = e.value;
      }
    });
    this.setState({...this.state, page: nextPage - 1});
    this.props.loadAppliances({
      page: nextPage - 1,
      size: pageSize,
      sort: 'hostname'
    });
  };

  handlePageSizeClick = (pageSize) => {
    let pageSizeArr = this.state.pageSize.map(e => {
      e.selected = e.value === pageSize;
      return e;
    });
    this.setState({...this.state, pageSize: [...pageSizeArr]});
    this.props.loadAppliances({
      page: 0,
      size: pageSize,
      sort: 'hostname'
    });
  };

  handleReload = () => {
    let pageSize = 5;
    this.state.pageSize.map(e => {
      if(e.selected) {
        pageSize = e.value;
      }
    });
    this.props.loadAppliances({
      page: this.state.page,
      size: pageSize,
      sort: 'hostname'
    });
  };

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
      return {note: app.note, hostname: app.hostname, ipv4Address: app.ipv4Address, owners}
    });

    return (
      <div>
        <DataTable data={apps}
                   title="Appliances"
                   column={this.props.columns}
                   onReload={this.handleReload}
                   handlePageClick={this.handleMovePage}
                   handlePageSizeClick={this.handlePageSizeClick}
                   total={this.props.appliances.page.totalElements}
                   page={this.props.appliances.page.number + 1}
                   pageSize={this.state.pageSize}
        />
        <FloatingAddButton onClick={this.props.showNewApplianceForm}/>
      </div>
    );
  }

  render() {
    if (this.props.appliances._embedded.appliances
      && this.props.appliances._embedded.appliances.length != 0) {
      return this.renderApplianceList();
    } else {
      return (
        <div>
          <NoResultBackground/>
          <FloatingAddButton onClick={this.props.showNewApplianceForm}/>
        </div>
      );
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
    loadAppliances: loadAppliances,
    showNewApplianceForm: showNewApplianceForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Appliance);
