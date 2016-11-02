import ActionTypes from './action-types';

export function signIn(username, password) {
  return {
    type: ActionTypes.AUTH.SIGN_IN,
    username,
    password
  };
}

export function signInSuccess(tokens) {
  return {
    type: ActionTypes.AUTH.SIGN_IN_SUCCESS,
    tokens
  };
}

export function signInFailed(errorMessage) {
  return {
    type: ActionTypes.AUTH.SIGN_IN_FAILURE,
    errorMessage
  };
}

export function goToSignIn(currentLocation) {
  return {
    type: ActionTypes.AUTH.SIGN_IN_DIRECTION,
    currentLocation
  };
}

export function authenticated(authenticated) {
  return {
    type: ActionTypes.AUTH.AUTHENTICATED,
    authenticated
  };
}
