import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FormDialog from '../../ui/Dialog/FormDialog';
import Link from 'react-router/lib/Link';
import {bindActionCreators} from 'redux';
import {signIn, authenticated} from '../../../actions/auth-actions';
import {connect} from 'react-redux';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import {replace} from 'react-router-redux';

/**
 * SignIn class
 * Created by nthienan on 10/25/2016.
 */
class SignIn extends React.Component {

  static propTypes = {
    signIn: PropTypes.func,
    authenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    open: PropTypes.bool,
    hideModal: PropTypes.func,
    style: PropTypes.object,
    previousLocation: PropTypes.object,
    formInfo: PropTypes.object,
    authenticatedFun: PropTypes.func,
    replace: PropTypes.func
  };

  static contextTypes = {
    router: PropTypes.object
  };

  static defaultProps = {
    style: {
      title: {
        backgroundColor: '#00bcd4',
        color: '#ffffff',
        textAlign: 'center'
      },
      body: {
        padding: '10px 24px',
      },
      footer: {
        borderTop: 0,
        padding: '8px 16px'
      }
    }
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.verifyAuthentication();
  }

  componentWillUpdate(nextProps) {
    this.verifyAuthentication();
  }

  verifyAuthentication() {
    if (localStorage.getItem('auth')) {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (auth['refresh_token']) {
        this.props.authenticatedFun(true);
        this.props.replace('/');
      }
    }
  }

  handleLogin = () => {
    if (this.props.formInfo.values) {
      const {loginName, password} = this.props.formInfo.values;
      this.props.signIn(loginName, password);
    }
  };

  renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
    <TextField floatingLabelFixed={true}
               floatingLabelText={label}
               fullWidth={true}
               errorText={touched && error}
               {...input}
               {...custom}
    />
  );

  renderFooter() {
    const divStyle = {
      padding: '15px 0',
      textAlign: 'center'
    };
    let footerArr = [
      <RaisedButton label="Sign In" primary fullWidth
                    onTouchTap={this.handleLogin}
      />,
      <div style={divStyle}>
        Don't have an account?
        <Link to="/sign-up"> Sign up</Link>
      </div>
    ];
    if (this.props.errorMessage && this.props.errorMessage !== '') {
      footerArr.splice(0, 0, this.renderError());
    }
    return footerArr;
  }

  renderError() {
    const errorMsgStyle = {
      fontStyle: 'italic',
      lineHeight: '1.6',
      fontSize: '15.5px',
      color: '#ffffff',
      padding: '5px',
      textAlign: 'center'
    };
    return (
      <ErrorMessage message={this.props.errorMessage}
                    textStyle={errorMsgStyle}
      />
    );
  }

  render() {
    return (
      <FormDialog open={true} title="WELCOME TO BMS" width="35%"
                  buttons={this.renderFooter()}
                  titleStyle={this.props.style.title}
                  bodyStyle={this.props.style.body}
                  footerStyle={this.props.style.footer}
                  autoScrollBodyContent={false}
      >
        <div>
          <Field name="loginName" component={this.renderTextField} label="Login Name"/>
        </div>
        <div>
          <Field name="password" component={this.renderTextField} label="Password"
                 type="password"
          />
        </div>
      </FormDialog>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.errorMessage,
    previousLocation: state.auth.location,
    formInfo: state.form.signIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn,
    authenticatedFun: authenticated,
    replace
  }, dispatch);
}

const signInForm = reduxForm({form: 'signIn'})(SignIn);
export default connect(mapStateToProps, mapDispatchToProps)(signInForm);
