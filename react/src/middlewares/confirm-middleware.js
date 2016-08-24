const confirmMiddleware = store => next => action => {
  if (action.payload.confirm) {
    if (confirm(action.payload.confirm.message)) {
      next(action);
    }
  } else {
    next(action);
  }
};

export default confirmMiddleware;
