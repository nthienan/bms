import ActionTypes from './action-types';

export const getResourceLinks = () => {
  return {
    type: ActionTypes.RESOURCE.LOAD_LINKS,
    request: {
      header: {
        Accept: 'application/json'
      }
    },
    success: ActionTypes.RESOURCE.LOAD_LINKS_SUCCESS,
    error: ActionTypes.RESOURCE.LOAD_LINKS_ERROR
  };
};
