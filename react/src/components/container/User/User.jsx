import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../../actions/user-actions';
import DataTable from '../../ui/DataTable/DataTable';

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

  componentWillMount(){
    this.props.loadUser();
  }

  renderUserList() {
    return (
      <div className="us-user">
        <DataTable data={this.props.users.data._embedded.users}
                   title="Users"
                   column={this.props.users.column}
        />
      </div>
    );
  }

  render() {
    if (this.props.users.data._embedded.users
      && this.props.users.data._embedded.users.length != 0) {
      return this.renderUserList();
    } else {
      return <div>Nothing to show</div>;
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
