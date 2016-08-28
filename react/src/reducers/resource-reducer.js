import ActionTypes from '../actions/action-types';

export default function (state = {}, action) {
  switch (action.type) {
    case ActionTypes.RESOURCE.LOAD_URL_SUCCESS:
      console.log('Url success: ', action.payload);
      return action.payload;

    case ActionTypes.RESOURCE.LOAD_URL_ERROR:
      console.log('Url error: ', action.payload);
      return state;

    default:
      return state
  }
};
