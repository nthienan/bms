import {selectResourceLinks} from '../selectors';
import {getResourceLinks, getResourceLinksSuccess, getResourceLinksError} from '../actions/resource-actions';
import makeRequest from '../libs/rest-client';
import ActionTypes from '../actions/action-types';
import {callRequestError} from '../actions/request-actions';

const resourceMiddleware = store => next => action => {
  if (action.type != ActionTypes.RESOURCE.LOAD_LINKS && action.request) {
    const resourceLinks = selectResourceLinks(store.getState());
    if (!resourceLinks || !resourceLinks._links) {
      const {request, success, error} = getResourceLinks();
      const successCallback = res => {
        store.dispatch(getResourceLinksSuccess(res.body));
        next(action);
      };
      const failureCallback = err => {
        store.dispatch(getResourceLinksError(err));
      };
      makeRequest(request, successCallback, failureCallback);
    } else {
      next(action);
    }
  } else {
    next(action);
  }
};

export default resourceMiddleware;
