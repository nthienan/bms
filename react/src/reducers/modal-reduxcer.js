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
        type: action.payload.type,
        props: action.payload.props,
        callback: action.payload.callback
      };
    case ActionTypes.MODAL.HIDE:
      return initialState;
    default:
      return state
  }
};
