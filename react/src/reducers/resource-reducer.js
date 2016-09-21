import ActionTypes from '../actions/action-types';

export default function (state = {}, action) {
  switch (action.type) {
    case ActionTypes.RESOURCE.LOAD_LINKS_SUCCESS:
      return action.data;

    case ActionTypes.RESOURCE.LOAD_LINKS_ERROR:
      return state;

    case ActionTypes.REQUEST.CALL_ERROR:
      return state;

    default:
      return state
  }
};
