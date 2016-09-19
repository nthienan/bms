import request from '../libs/request';
import {getResourceLink} from '../libs/bms-resources';
import {getRootUrl} from '../config';
import ActionTypes from '../actions/action-types';

const apiMiddleware = store => next => action => {
  next(action);
  let url;
  switch (action.type) {
    case ActionTypes.API.REQUEST:
      if (!action.request.url) {
        let resources = store.getState().resources;
        action.request.url = getResourceLink(action.request.resource, resources);
      }
      return request(action.request);
    case ActionTypes.API.REQUEST_RESOURCE:
      action.request.url = getRootUrl();
      return request(action.request);
    default:
      return null;
  }
};

export default apiMiddleware;
