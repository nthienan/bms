import React, {PropTypes} from 'react';
import FormDialog from '../../ui/Dialog/FormDialog';
import FlatButton from 'material-ui/FlatButton';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hideModal} from '../../../actions/modal-actions';

/**
 * AddApplianceDialog class
 * Created by nthienan on 10/9/2016.
 */
class AddApplianceDialog extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    hideModal: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    this.props.hideModal();
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  render() {
    const buttons = [
      <FlatButton label="Submit" primary onTouchTap={this.handleSubmit} />,
      <FlatButton label="Cancel" primary onTouchTap={this.handleCancel} />
    ];
    return (
      <FormDialog open={this.props.open} title="New Appliance:" width="70%"
                  buttons={buttons}
      >
        <div>KAka</div>;
      </FormDialog>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hideModal: hideModal
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddApplianceDialog);
