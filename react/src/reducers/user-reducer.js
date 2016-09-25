import ActionTypes from '../actions/action-types';

const initState = {
  column: [],
  data: {
    '_embedded': {'users': []}
  }
};

export default function (state = initState, action) {
  switch (action.type) {
    case ActionTypes.USER.LOAD_SUCCESS:
      return initState;
    default:
      return state;
  }
}
