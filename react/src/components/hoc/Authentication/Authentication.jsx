import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {goToSignIn, authenticated} from '../../../actions/auth-actions';

export default function (ComposedComponent) {

  class Authentication extends Component {

    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      location: PropTypes.object,
      goToSignIn: PropTypes.func.isRequired,
      authenticatedFun: PropTypes.func
    };

    static contextTypes = {
      router: PropTypes.object
    };

    constructor(props) {
      super(props)
    }

    componentWillMount() {
      this.handleAuthentication();
    }

    componentWillUpdate(nextProps) {
      this.handleAuthentication();
    }

    handleAuthentication() {
      if (!localStorage.getItem('auth')) {
        this.props.goToSignIn(this.props.location);
        this.context.router.push('/sign-in');
      } else {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth['refresh_token']) {
          this.props.goToSignIn(this.props.location);
          this.context.router.push('/sign-in');
        } else {
          this.props.authenticatedFun(true);
        }
      }
    }

    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />
      }
      return null;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      goToSignIn,
      authenticatedFun: authenticated
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}

