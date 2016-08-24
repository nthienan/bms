import ActionTypes from './action-types';
import {hideModal} from './modal-actions';
import {ModalTypes} from '../constant';

export const selectedAppliance = (appliances) => {
  return {
    type: ActionTypes.APPLIANCE.SELECTED,
    payload: appliances
  }
};

export const deleteSelectedAppliance = () => {
  return {
    type: ActionTypes.MODAL.SHOW,
    payload: {
      type: ModalTypes.CONFIRM,
      props: {
        open: true,
        message: 'Are you sure you want to delete these selected appliances?'
      },
      callback: {
        handleYes: [{
          type: ActionTypes.APPLIANCE.DELETE_SELECTED,
          payload: {}
        },
          hideModal()],
        handleNo: [hideModal()]
      }
    }
  }
};
