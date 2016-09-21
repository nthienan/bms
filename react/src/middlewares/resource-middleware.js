import {selectResourceLinks} from '../selectors';
import {getResourceLinks, getResourceLinksSuccess, getResourceLinksError} from '../actions/resource-actions';
import makeRequest from '../libs/rest-client';
import ActionTypes from '../actions/action-types';
import {callRequestError} from '../actions/request-action';

const resourceMiddleware = store => next => action => {
  if (action.type != ActionTypes.RESOURCE.LOAD_LINKS && action.request) {
    const resourceLinks = selectResourceLinks(store.getState());
    if (!resourceLinks || !resourceLinks._links) {
      const {request, success, error} = getResourceLinks();
      makeRequest(request).then(res => {
        if (!res.error) {
          store.dispatch(getResourceLinksSuccess(res.body));
          next(action);
        } else {
          store.dispatch(getResourceLinksError(res));
        }
      }).catch(err => {
        store.dispatch(callRequestError(err));
      });
    }
  } else {
    next(action);
  }
};

export default resourceMiddleware;
