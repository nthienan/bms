import request from '../libs/request';
import config from '../config'
import ActionTypes from '../actions/action-types';

const call = (action, next) => {
  request(action.payload.request).then((res) => {
    next({
      type: action.payload.success,
      payload: res.body
    });
  }).catch((err) => {
    next({
      type: action.payload.error,
      payload: err
    });
  });
};

const getResourceUrl = (resource, store) => {
  let state = store.getState().resources;
  if (state) {
    let template = state._links[resource].href;
    if (template) {
      return template.replace(template.substring(template.indexOf('{')), '');
    }
  }
  return null;
};

const apiMiddleware = store => next => action => {
  next(action);
  let url;
  switch (action.type) {
    case ActionTypes.API.REQUEST:
      if (action.payload.request.resource) {
        action.payload.request.url = getResourceUrl(action.payload.request.resource, store);
      }
      call(action, next);
      break;
    case ActionTypes.API.REQUEST_RESOURCE:
      action.payload.request.url = config.crossOrigin ? config.baseUrl + config.rootUrl : config.rootUrl;
      call(action, next);
      break;
    default:
      break
  }
};

export default apiMiddleware;
