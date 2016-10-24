import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../../actions/user-actions';
import DataTable from '../../ui/DataTable/DataTable';
import NoResultBackground from '../../ui/Background/NoResultBackground';
import FloatingAddButton from '../../ui/Button/FloatingAddButton/FloatingAddButton';

/**
 * User container
 */
class User extends Component {

  static propTypes = {
    users: PropTypes.object.isRequired,
    loadUser: PropTypes.func,
    columns: PropTypes.object
  };

  static defaultProps = {
    columns: {
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username'
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
    this.props.loadUser({
      page: this.props.users.page.number,
      size: pageSize,
      sort: 'firstName'
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
    this.props.loadUser({
      page: nextPage - 1,
      size: pageSize,
      sort: 'firstName'
    });
  };

  handlePageSizeClick = (pageSize) => {
    let pageSizeArr = this.state.pageSize.map(e => {
      e.selected = e.value === pageSize;
      return e;
    });
    this.setState({...this.state, pageSize: [...pageSizeArr]});
    this.props.loadUser({
      page: 0,
      size: pageSize,
      sort: 'firstName'
    });
  };

  handleReload = () => {
    let pageSize = 5;
    this.state.pageSize.map(e => {
      if(e.selected) {
        pageSize = e.value;
      }
    });
    this.props.loadUser({
      page: this.state.page,
      size: pageSize,
      sort: 'firstName'
    });
  };

  renderUserList() {
    return (
      <div>
        <DataTable data={this.props.users._embedded.users}
                   title="Users"
                   total={this.props.users.page.totalElements}
                   page={this.props.users.page.number + 1}
                   pageSize={this.state.pageSize}
                   column={this.props.columns}
                   handlePageClick={this.handleMovePage}
                   handlePageSizeClick={this.handlePageSizeClick}
                   onReload={this.handleReload}
        />
      </div>
    );
  }

  render() {
    if (this.props.users._embedded.users
      && this.props.users._embedded.users.length != 0) {
      return this.renderUserList();
    } else {
      return (
        <div>
          <NoResultBackground/>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadUser: UserActions.loadUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
