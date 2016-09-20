import ActionTypes from './action-types';
import {hideModal} from './modal-actions';
import {ModalTypes, RequestMethods, Resources} from '../constant';

export const selectedAppliance = (appliances) => {
  return {
    type: ActionTypes.APPLIANCE.SELECTED,
    payload: appliances
  }
};

export const loadAppliances = () => {
  return {
    type: ActionTypes.APPLIANCE.LOAD,
    request: {
      resource: Resources.Appliances,
      param: {
        page: 0,
        size: 5,
        sort: 'name,desc'
      },
      header: {
        Accept: 'application/json'
      }
    },
    success: ActionTypes.APPLIANCE.LOAD_SUCCESS,
    error: ActionTypes.APPLIANCE.LOAD_ERROR
  }
};

export const deleteSelectedAppliance = () => {
  return {
    type: ActionTypes.MODAL.SHOW,
    modal: {
      type: ModalTypes.CONFIRM,
      props: {
        open: true,
        message: 'Are you sure you want to delete these selected appliances?'
      },
      callback: {
        handleYes: [{
          type: ActionTypes.APPLIANCE.DELETE_SELECTED
        },
          hideModal()],
        handleNo: [hideModal()]
      }
    }
  }
};