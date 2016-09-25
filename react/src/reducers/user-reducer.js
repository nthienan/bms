import ActionTypes from '../actions/action-types';

const initState = {
  column: {firstName: 'First Name', lastName: 'Last Name', username: 'Username'},
  data: {
    '_embedded': {'users': []}
  },
  selectedUsers: null
};

export default function (state = initState, action) {
  switch (action.type) {
    case ActionTypes.USER.LOAD_SUCCESS:
      return {...initState, data: action.userData};
    default:
      return state;
  }
}
