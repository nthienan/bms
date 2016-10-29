import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent) {

  class Authentication extends Component {

    static propTypes = {
      authenticated: PropTypes.bool.isRequired
    };

    static contextTypes = {
      router: PropTypes.object
    };

    constructor(props) {
      super(props)
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/sign-in');
      }
      if (typeof localStorage.getItem('accessToken') === 'undefined') {
        console.log('Log out');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/sign-in');
      }
      if (typeof localStorage.getItem('accessToken') === 'undefined') {
        console.log('Log out');
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

  return connect(mapStateToProps)(Authentication)
}

