import ActionTypes from './action-types';

export const getResourceUrl = () => {
  return {
    type: ActionTypes.API.REQUEST_RESOURCE,
    payload: {
      request: {
        header: {
          Accept: 'application/json'
        }
      },
      success: ActionTypes.RESOURCE.LOAD_URL_SUCCESS,
      error: ActionTypes.RESOURCE.LOAD_URL_ERROR
    }
  };
};
