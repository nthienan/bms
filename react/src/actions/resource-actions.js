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
    }
  };
};

export const getResourceLinksSuccess = (resourceLinks) => {
  return {
    type: ActionTypes.RESOURCE.LOAD_LINKS_SUCCESS,
    data: resourceLinks
  };
};

export const getResourceLinksError= (error) => {
  return {
    type: ActionTypes.RESOURCE.LOAD_LINKS_ERROR,
    error: error
  };
};
