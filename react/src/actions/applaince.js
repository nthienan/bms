import ActionTypes from '../actions/action-types';

export const selectedAppliance = (appliances) => {
  return {
    type: ActionTypes.APPLIANCE.SELECTED,
    payload: appliances
  }
};

export const deleteSelectedAppliance = () => {
  return {
    type: ActionTypes.APPLIANCE.DELETE_SELECTED,
    payload: {
      confirm: {
        message: 'Are you sure you want to delete these selected appliances?'
      }
    }
  }
};
