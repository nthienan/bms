import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../../actions/user-actions';
import DataTable from '../../ui/DataTable/DataTable';
import NoResultBackground from '../../ui/Background/NoResultBackground';
import CircularLoading from '../../ui/CircularLoading/CircularLoading';
import FloatingAddButton from '../../ui/Button/FloatingAddButton/FloatingAddButton';

/**
 * User container
 */
class User extends Component {

  static propTypes = {
    users: PropTypes.object.isRequired,
    loadUser: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUser();
  }

  renderUserList() {
    return (
      <div>
        <DataTable data={this.props.users.data._embedded.users}
                   title="Users"
                   total={104} limit={20} page={1}
                   column={this.props.users.column}
        />
        <FloatingAddButton />
      </div>
    );
  }

  render() {
    if (this.props.users.data._embedded.users
      && this.props.users.data._embedded.users.length != 0) {
      return this.renderUserList();
    } else {
      return (
        <div>
          <NoResultBackground/>
          <FloatingAddButton/>
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
