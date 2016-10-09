import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ConfirmDialog from '../../ui/Dialog/ConfirmDialog';
import {ModalTypes} from '../../../constant';
import AddApplianceDialog from '../../container/Appliance/AddApplianceDialog'

const MODAL_COMPONENTS = {
  [ModalTypes.CONFIRM]: ConfirmDialog,
  [ModalTypes.ADD_APPLIANCE]: AddApplianceDialog
};

class ModalRoot extends React.Component {

  static propTypes = {
    type: PropTypes.symbol,
    props: PropTypes.object,
    callback: PropTypes.object,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    var state = {};
    if (nextProps.callback) {
      Object.keys(nextProps.callback).forEach(function (key) {
        let actions = nextProps.callback[key];
        state[key] = () => {
          for (let i = 0; i < actions.length; i++) {
            nextProps.dispatch(actions[i]);
          }
        };
      });
    }
    this.setState(state);
  }
  render() {
    if (!this.props.type) {
      return null;
    } else {
      const SpecificModal = MODAL_COMPONENTS[this.props.type];
      return <SpecificModal {...this.props.props} {...this.state}/>
    }
  }
}

export default connect()(ModalRoot);
