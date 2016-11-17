import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ConfirmDialog from '../../ui/Dialog/ConfirmDialog';
import {ModalTypes} from '../../../constant';
import ApplianceForm from '../Appliance/ApplianceForm'

const MODAL_COMPONENTS = {
  [ModalTypes.CONFIRM]: ConfirmDialog,
  [ModalTypes.APPLIANCE_FORM]: ApplianceForm
};

class ModalRoot extends React.Component {

  static propTypes = {
    type: PropTypes.symbol,
    props: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.type) {
      return null;
    } else {
      const SpecificModal = MODAL_COMPONENTS[this.props.type];
      return <SpecificModal {...this.props.props}/>
    }
  }
}

export default connect()(ModalRoot);
