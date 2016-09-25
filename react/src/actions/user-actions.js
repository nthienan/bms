import ActionTypes from './action-types';
import {hideModal} from './modal-actions';
import {ModalTypes, Resources} from '../constant';

export const selectedUser = (userData) => {
  return {
    type: ActionTypes.USER.SELECTED,
    userData: userData
  }
};

export const loadUser = ({page = 0, size = 10, sort = 'createdDate,desc'}) => {
  return {
    type: ActionTypes.USER.LOAD,
    request: {
      resource: Resources.Users,
      param: {
        page: page,
        size: size,
        sort: sort
      },
      header: {
        Accept: 'application/json'
      }
    }
  }
};

export const loadUserSuccess = (userData) => {
  return {
    type: ActionTypes.USER.LOAD_SUCCESS,
    userData: userData
  }
};

export const loadUserError = (error) => {
  return {
    type: ActionTypes.USER.LOAD_ERROR,
    error: error
  }
};

export const deleteSelectedUsers = () => {
  return {
    type: ActionTypes.MODAL.SHOW,
    modal: {
      type: ModalTypes.CONFIRM,
      props: {
        open: true,
        message: 'Are you sure you want to delete these selected users?'
      },
      callback: {
        handleYes: [{
          type: ActionTypes.USER.DELETE_SELECTED
        },
          hideModal()],
        handleNo: [hideModal()]
      }
    }
  }
};
