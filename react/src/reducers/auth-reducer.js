import ActionTypes from '../actions/action-types';

const initState = {
  errorMessage: '',
  authenticated: false,
  location: null
};

export default function (state = initState, action) {
  switch (action.type) {
    case ActionTypes.AUTH.AUTHENTICATED:
      return {...state, authenticated: action.authenticated};

    case ActionTypes.AUTH.SIGN_IN_SUCCESS:
      localStorage.setItem('auth', JSON.stringify(action.tokens));
      return {...state, errorMessage: '', authenticated: true};

    case ActionTypes.AUTH.SIGN_OUT_SUCCESS:
      return {...state, errorMessage: '', authenticated: false};

    case ActionTypes.AUTH.SIGN_IN_FAILURE:
      return {...state, authenticated: false, errorMessage: action.errorMessage};

    case ActionTypes.AUTH.SIGN_IN_DIRECTION:
      return {...state, location: action.currentLocation};

    default:
      return state;
  }
};
