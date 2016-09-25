import ActionTypes from './action-types';

export const callRequestError = (error) => {
  return {
    type: ActionTypes.REQUEST.CALL_ERROR,
    error: error
  };
};
