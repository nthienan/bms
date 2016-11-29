import ActionTypes from './action-types';
import {hideModal} from './modal-actions';
import {ModalTypes, Resources, FormTypes} from '../constant';

export const loadAppliances = (params = {page: 0, size: 10, sort: 'hostname,desc'}) => {
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

export const loadAppliancesById = (applianceId) => {
  return {
    type: ActionTypes.APPLIANCE.LOAD_BY_ID,
    applianceId
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

export const showNewApplianceForm = () => {
  return {
    type: ActionTypes.MODAL.SHOW,
    modal: {
      type: ModalTypes.APPLIANCE_FORM,
      props: {
        open: true,
        formType: FormTypes.Add
      }
    }
  }
};

export const showEditApplianceForm = (appliance, owners) => {
  return {
    type: ActionTypes.MODAL.SHOW,
    modal: {
      type: ModalTypes.APPLIANCE_FORM,
      props: {
        open: true,
        formType: FormTypes.Edit,
        appliance,
        owners
      }
    }
  }
};

export const addAppliance = (appliance) => {
  return {
    type: ActionTypes.APPLIANCE.ADD,
    appliance: appliance
  }
};

export const editAppliance = (appliance, owners) => {
  return {
    type: ActionTypes.APPLIANCE.EDIT,
    appliance,
    owners
  }
};

export const editApplianceSuccess = (appliance) => {
  return {
    type: ActionTypes.APPLIANCE.EDIT_SUCCESS,
    appliance
  }
};
