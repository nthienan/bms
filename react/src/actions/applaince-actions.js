import ActionTypes from './action-types';
import {hideModal} from './modal-actions';
import {ModalTypes, Resources} from '../constant';

export const selectedAppliance = (appliances) => {
  return {
    type: ActionTypes.APPLIANCE.SELECTED,
    selectedAppliances: appliances
  }
};

export const loadAppliances = (params = {page: 0, size: 10, sort: 'name,desc'}) => {
  return {
    type: ActionTypes.APPLIANCE.LOAD,
    request: {
      resource: Resources.Appliances,
      params: params,
      header: {
        Accept: 'application/json'
      }
    }
  }
};

export const loadAppliancesSuccess = (appliances) => {
  return {
    type: ActionTypes.APPLIANCE.LOAD_SUCCESS,
    data: appliances
  }
};

export const loadAppliancesError = (error) => {
  return {
    type: ActionTypes.APPLIANCE.LOAD_ERROR,
    error: error
  }
};

export const loadOwnersAppliance = (appliance) => {
  return {
    type: ActionTypes.APPLIANCE.LOAD_OWNERS,
    appliance
  }
};

export const loadOwnersApplianceSuccess = (applianceLink, owners) => {
  return {
    type: ActionTypes.APPLIANCE.LOAD_OWNERS_SUCCESS,
    applianceLink,
    owners
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
