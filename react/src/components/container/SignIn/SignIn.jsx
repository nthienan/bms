import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FormDialog from '../../ui/Dialog/FormDialog';
import Link from 'react-router/lib/Link';

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

  handleLogin = (user) => {
    console.log(user);
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
    return (
      [
        <RaisedButton label="Sign In" primary type="submit"
                      fullWidth={true}
        />,
        <div style={divStyle}>
          Don't have an account?
          <Link to="/sign-up"> Sign up</Link>
        </div>
      ]
    );
  }

  render() {
    const {handleSubmit, submitting, pristine}  = this.props;
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
    initialValues: {
      loginName: '',
      password: ''
    },
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.errorMessage
  }
}

export default reduxForm({
  form: 'signIn',
}, mapStateToProps)(SignIn);
