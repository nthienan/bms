import {selectResourceLinks} from '../selectors';
import {getResourceLinks} from '../actions/resource-actions';
import makeRequest from '../libs/rest-client';
import ActionTypes from '../actions/action-types';

const resourceMiddleware = store => next => action => {
  if (action.type != ActionTypes.RESOURCE.LOAD_LINKS && action.request) {
    const resourceLinks = selectResourceLinks(store.getState());
    if (!resourceLinks || !resourceLinks._links) {
      const {request, success, error} = getResourceLinks();
      makeRequest(request).then(res => {
        if (!res.error) {
          store.dispatch({type: success, data: res.body});
          next(action);
        } else {
          store.dispatch({type: error, error: response});
        }
      }).catch(err => {
        store.dispatch({type: ActionTypes.REQUEST.CALL_ERROR, error: err})
      });
    }
  } else {
    next(action);
  }
};

export default resourceMiddleware;
