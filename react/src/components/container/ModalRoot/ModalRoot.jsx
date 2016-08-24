import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ConfirmDialog from '../../ui/Dialog/ConfirmDialog/ConfirmDialog';
import ActionTypes from '../../../actions/action-types';
import {ModalTypes} from '../../../constant'

const MODAL_COMPONENTS = {
  [ModalTypes.CONFIRM]: ConfirmDialog
};

class ModalRoot extends React.Component {

  static propTypes = {
    type: PropTypes.string,
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

  onYes = () => {
    this.props.dispatch({type: ActionTypes.MODAL.HIDE, payload: {}});
    this.props.dispatch({type: ActionTypes.APPLIANCE.DELETE_SELECTED, payload: {}});
  };

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
