import React, {PropTypes} from 'react';
import FormDialog from '../../ui/Dialog/FormDialog';
import FlatButton from 'material-ui/FlatButton';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hideModal} from '../../../actions/modal-actions';
import {addAppliance, editAppliance} from '../../../actions/appliance-actions';
import TextField from 'material-ui/TextField';
import {FormTypes} from '../../../constant';
import objectPath from 'object-path';

/**
 * ApplianceForm class
 * Created by nthienan on 10/9/2016.
 */
class ApplianceForm extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    hideModal: PropTypes.func,
    style: PropTypes.object,
    textFieldStyle: PropTypes.object,
    addAppliance: PropTypes.func,
    editAppliance: PropTypes.func,
    formType: PropTypes.string.isRequired,
    appliance: PropTypes.object,
    owners: PropTypes.array
  };

  static defaultProps = {
    style: {
      left: {
        width: '50%',
        float: 'left',
        padding: 5
      },
      right: {
        marginLeft: '50%',
        padding: 5
      }
    },
    textFieldStyle: {
      margin: 0
    },
    formType: FormTypes.Add
  };

  constructor(props) {
    super(props);
    if (this.props.formType === FormTypes.Add) {
      this.state = {
        hostname: '',
        ipv4Address: '',
        owners: '',
        note: ''
      };
    } else {
      let users = '';
      for (let i = 0; i < this.props.owners.length; i++) {
        if (i !== this.props.owners.length - 1) {
          users += this.props.owners[i].username + ', ';
        } else {
          users += this.props.owners[i].username;
        }
      }
      this.state = {
        hostname: this.props.appliance.hostname,
        ipv4Address: this.props.appliance.ipv4Address,
        owners: users,
        note: this.props.appliance.note
      };
    }
  }


  handleSubmit = () => {
    this.props.hideModal();
    if (this.props.formType === FormTypes.Add) {
      this.props.addAppliance(this.state);
    } else {
      let appliance = {...this.props.appliance, ...this.state};
      objectPath.del(appliance, 'owners');
      this.props.editAppliance(appliance, this.state.owners);
    }
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  render() {
    let title = this.props.formType === FormTypes.Add ? 'New Appliance' : 'Edit Appliance';
    const buttons = [
      <FlatButton label="Submit" primary onTouchTap={this.handleSubmit}
                  tabIndex={5}
      />,
      <FlatButton label="Cancel" primary onTouchTap={this.handleCancel}
                  tabIndex={6}
      />
    ];
    let titleStyle = {
      paddingBottom: 5
    };
    let insideStyle = {margin: 5};
    return (
      <FormDialog open={this.props.open}
                  title={title}
                  titleStyle={titleStyle}
                  width="70%"
                  buttons={buttons}
      >
        <div style={this.props.style.left}>
          <div style={insideStyle}>
            <TextField floatingLabelText="Hostname" tabIndex={1}
                       ref="hostname"
                       value={this.state.hostname} fullWidth={true}
                       onChange={(e) => {
                         this.setState({...this.state, hostname: e.target.value})
                       }}
            />
            <TextField floatingLabelText="Owners" tabIndex={3}
                       fullWidth={true}
                       multiLine={true} rows={1} rowsMax={4}
                       value={this.state.owners}
                       onChange={(e) => {
                         this.setState({...this.state, owners: e.target.value})
                       }}
            />
          </div>
        </div>
        <div style={this.props.style.right}>
          <div style={insideStyle}>
            <TextField floatingLabelText="IPv4 Address" tabIndex={2}
                       value={this.state.ipv4Address} fullWidth={true}
                       onChange={(e) => {
                         this.setState({...this.state, ipv4Address: e.target.value})
                       }}
            />
            <TextField floatingLabelText="Note" tabIndex={4}
                       fullWidth={true}
                       multiLine={true} rows={1} rowsMax={4}
                       value={this.state.note}
                       onChange={(e) => {
                         this.setState({...this.state, note: e.target.value})
                       }}
            />
          </div>
        </div>
      </FormDialog>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hideModal,
    addAppliance,
    editAppliance
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplianceForm);
