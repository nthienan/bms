const logMiddleware = store => next => action => {
  console.log('Dispatch: ', action);
  next(action);
};

export default logMiddleware;
