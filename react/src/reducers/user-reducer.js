import ActionTypes from '../actions/action-types';

const initState = {
  isLoading: true,
  _embedded: {
    users: []
  },
  page: {
    number: 0,
    totalElements: 0
  },
  selectedAppliances: null
};

export default function (state = initState, action) {
  switch (action.type) {
    case ActionTypes.USER.LOAD_SUCCESS:
      return {...initState, ...action.userData, isLoading: false};
    default:
      return state;
  }
}
