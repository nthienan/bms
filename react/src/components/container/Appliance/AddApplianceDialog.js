import React, {PropTypes} from 'react';
import FormDialog from '../../ui/Dialog/FormDialog';
import FlatButton from 'material-ui/FlatButton';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hideModal} from '../../../actions/modal-actions';
import {addAppliance} from '../../../actions/appliance-actions';
import TextField from 'material-ui/TextField';

/**
 * AddApplianceDialog class
 * Created by nthienan on 10/9/2016.
 */
class AddApplianceDialog extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    hideModal: PropTypes.func,
    style: PropTypes.object,
    textFieldStyle: PropTypes.object,
    addAppliance: PropTypes.func
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
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      hostname: '',
      ipv4Address: '',
      owners: '',
      note: ''
    };
  }


  handleSubmit = () => {
    this.props.hideModal();
    this.props.addAppliance(this.state);
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  render() {
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
                  title="New Appliance"
                  titleStyle={titleStyle}
                  width="70%"
                  buttons={buttons}
      >
        <div style={this.props.style.left}>
          <div style={insideStyle}>
            <TextField floatingLabelText="Hostname" tabIndex={1}
                       ref="hostname"
                       value={this.state.hostname} fullWidth={true}
                       onChange={(e) => {this.setState({...this.state, hostname: e.target.value})}}
            />
            <TextField floatingLabelText="Owners" tabIndex={3}
                       fullWidth={true}
                       multiLine={true} rows={1} rowsMax={4}
                       value={this.state.owners}
                       onChange={(e) => {this.setState({...this.state, owners: e.target.value})}}
            />
          </div>
        </div>
        <div style={this.props.style.right}>
          <div style={insideStyle}>
            <TextField floatingLabelText="IPv4 Address" tabIndex={2}
                       value={this.state.ipv4Address} fullWidth={true}
                       onChange={(e) => {this.setState({...this.state, ipv4Address: e.target.value})}}
            />
            <TextField floatingLabelText="Note" tabIndex={4}
                       fullWidth={true}
                       multiLine={true} rows={1} rowsMax={4}
                       value={this.state.note}
                       onChange={(e) => {this.setState({...this.state, note: e.target.value})}}
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
    hideModal: hideModal,
    addAppliance: addAppliance
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddApplianceDialog);
