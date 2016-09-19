const logMiddleware = store => next => action => {
  console.log(new Date(), action);
  next(action);
};

export default logMiddleware;
