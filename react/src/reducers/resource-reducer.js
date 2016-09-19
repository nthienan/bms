import ActionTypes from '../actions/action-types';

export default function (state = {}, action) {
  switch (action.type) {
    case ActionTypes.RESOURCE.LOAD_LINKS_SUCCESS:
      console.log('Url success: ', action.data);
      return action.data;

    case ActionTypes.RESOURCE.LOAD_LINKS_ERROR:
      console.log('Url error: ', action.error);
      return state;

    case ActionTypes.REQUEST.CALL_ERROR:
      console.log('Call request error: ', action.error);
      return state;

    default:
      return state
  }
};
