import React, {Component, PropTypes} from 'react';
import DataTable from '../../ui/DataTable/DataTable';
import DataTableBody from '../../ui/DataTable/DataTableBody';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import NoResultBackground from '../../ui/Background/NoResultBackground';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showNewApplianceForm, loadAppliances} from '../../../actions/appliance-actions';
import FloatingAddButton from '../../ui/Button/FloatingAddButton/FloatingAddButton';
import {Link} from 'react-router';
import Airplay from 'material-ui/svg-icons/av/airplay';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

class Appliance extends Component {

  static propTypes = {
    appliances: PropTypes.object.isRequired,
    getResourceLinks: PropTypes.func,
    loadAppliances: PropTypes.func,
    column: PropTypes.object,
    showNewApplianceForm: PropTypes.func
  };

  static defaultProps = {
    column: {
      hostname: 'Hostname',
      ipv4Address: 'IPv4 Address',
      note: 'Note',
      owners: 'Owners',
      actions: 'Actions'
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
      if (e.selected) {
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
      if (e.selected) {
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
      if (e.selected) {
        pageSize = e.value;
      }
    });
    this.props.loadAppliances({
      page: this.state.page,
      size: pageSize,
      sort: 'hostname'
    });
  };

  renderRow(row, index) {
    return (
      <TableRow key={index} selected={row.selected}>
        {Object.keys(this.props.column).map((key, i) => {
          if (key != 'actions') {
            return <TableRowColumn key={i}>{row[key]}</TableRowColumn>;
          }
          return (
            <TableRowColumn key={i}>
              <IconButton>
                <Airplay />
              </IconButton>
              <IconButton>
                <ModeEdit />
              </IconButton>
              <IconButton>
                <Delete />
              </IconButton>
            </TableRowColumn>);
        })}
      </TableRow>
    );
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
      return {note: app.note, hostname: app.hostname, ipv4Address: app.ipv4Address, owners}
    });

    return (
      <div>
        <DataTable title="Appliances"
                   onReload={this.handleReload}
        >
          <DataTableBody column={this.props.column}
                         total={this.props.appliances.page.totalElements}
                         page={this.props.appliances.page.number + 1}
                         handlePageClick={this.handleMovePage}
                         handlePageSizeClick={this.handlePageSizeClick}
                         pageSize={this.state.pageSize}
          >
            {apps.map((row, index) =>
              this.renderRow(row, index)
            )}
          </DataTableBody>
        </DataTable>
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
