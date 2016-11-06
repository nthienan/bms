const actionTypes = {
  APPLIANCE: {
    LOAD: 'LOAD_APPLIANCE',
    LOAD_SUCCESS: 'LOAD_APPLIANCE_SUCCESS',
    LOAD_ERROR: 'LOAD_APPLIANCE_ERROR',
    SELECTED: 'SELECTED_APPLIANCE',
    DELETE_SELECTED: 'DELETE_APPLIANCE',
    LOAD_OWNERS: 'LOAD_OWNERS_APPLIANCE',
    LOAD_OWNERS_SUCCESS: 'LOAD_OWNERS_APPLIANCE_SUCCESS',
    ADD: 'ADD_APPLIANCE'
  },
  USER: {
    LOAD: 'LOAD_USER',
    LOAD_SUCCESS: 'LOAD_USER_SUCCESS',
    LOAD_ERROR: 'LOAD_USER_ERROR',
    SELECTED: 'SELECTED_USER',
    DELETE_SELECTED: 'DELETE_USER'
  },
  MODAL: {
    SHOW: 'SHOW_MODAL',
    HIDE: 'HIDE_MODAL'
  },
  RESOURCE: {
    LOAD_LINKS: 'LOAD_RESOURCE_LINKS',
    LOAD_LINKS_SUCCESS: 'LOAD_RESOURCE_LINKS_SUCCESS',
    LOAD_LINKS_ERROR: 'LOAD_RESOURCE_LINKS_ERROR'
  },
  REQUEST: {
    CALL_ERROR: 'CALL_REQUEST_ERROR'
  },
  ERROR: {
    RUNTIME: 'RUNTIME_ERROR'
  },
  AUTH: {
    AUTHENTICATED: '@bms/auth/authenticated',
    SIGN_IN: '@bms/auth/sign-in',
    SIGN_IN_SUCCESS: '@bms/auth/sign-in-success',
    SIGN_IN_FAILURE: '@bms/auth/sign-in-failure',
    SIGN_IN_DIRECTION: '@bms/auth/sign-in-direction',
    SIGN_OUT: '@bms/auth/sign-out',
    SIGN_OUT_SUCCESS: '@bms/auth/sign-out-success',
    SIGN_OUT_FAILURE: '@bms/auth/sign-out-failure'
  }
};
export default actionTypes;
