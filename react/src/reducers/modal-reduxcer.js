import ActionTypes from '../actions/action-types';

const initialState = {
  type: null,
  props: {},
  callback: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MODAL.SHOW:
      return {
        type: action.modal.type,
        props: action.modal.props,
        callback: action.modal.callback
      };
    case ActionTypes.MODAL.HIDE:
      return initialState;
    default:
      return state
  }
};
