const actionTypes = {
  APPLIANCE: {
    LOAD: '@bms/action-types/appliance/load',
    LOAD_BY_ID: '@bms/action-types/appliance/load-by-id',
    LOAD_SUCCESS: '@bms/action-types/appliance/load-success',
    LOAD_ERROR: '@bms/action-types/appliance/load-error',
    SELECTED: '@bms/action-types/appliance/selected',
    DELETE_SELECTED: '@bms/action-types/appliance/delete',
    LOAD_OWNERS: '@bms/action-types/appliance/load-owners',
    LOAD_OWNERS_SUCCESS: '@bms/action-types/appliance/load-owners-success',
    ADD: '@bms/action-types/appliance/add',
    EDIT: '@bms/action-types/appliance/edit',
    EDIT_SUCCESS: '@bms/action-types/appliance/edit-success'
  },
  USER: {
    LOAD: '@bms/action-types/user/load',
    LOAD_SUCCESS: '@bms/action-types/user/load-success',
    LOAD_ERROR: '@bms/action-types/user/load-error',
    SELECTED: '@bms/action-types/user/selected',
    DELETE_SELECTED: '@bms/action-types/user/delete-selected'
  },
  MODAL: {
    SHOW: '@bms/action-types/model/show',
    HIDE: '@bms/action-types/model/hide'
  },
  RESOURCE: {
    LOAD_LINKS: '@bms/action-types/resource/load-links',
    LOAD_LINKS_SUCCESS: '@bms/action-types/resource/load-links-success',
    LOAD_LINKS_ERROR: '@bms/action-types/resource/load-links-error'
  },
  REQUEST: {
    CALL_ERROR: '@bms/action-types/request/call-error'
  },
  ERROR: {
    RUNTIME: '@bms/action-types/error/runtime'
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
