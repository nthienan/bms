import ActionTypes from './action-types';
import {getRootUrl} from '../config';

export const getResourceLinks = () => {
  return {
    type: ActionTypes.RESOURCE.LOAD_LINKS,
    request: {
      url: getRootUrl(),
      header: {
        Accept: 'application/json'
      }
    },
    success: ActionTypes.RESOURCE.LOAD_LINKS_SUCCESS,
    error: ActionTypes.RESOURCE.LOAD_LINKS_ERROR
  };
};
