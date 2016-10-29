import ActionTypes from '../actions/action-types';

const initState = {errorMessage: '', authenticated: false};

export default function (state = initState, action) {
  switch (action.type) {

    case ActionTypes.AUTH.SIGN_IN.SUCCESS:
      return {...state, errorMessage: '', authenticated: true};

    case ActionTypes.AUTH.SIGN_OUT.SUCCESS:
      return {...state, errorMessage: '', authenticated: false};

    case ActionTypes.AUTH.SIGN_IN.FAILURE:
      return {...state, errorMessage: action.payload.errorMessage};

    default:
      return state;
  }
};
