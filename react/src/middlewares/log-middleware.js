import dateFormat from 'dateformat';

const logMiddleware = store => next => action => {
  console.log(dateFormat(new Date(), 'dd/mm/yyyy HH:MM:ss:l'), action);
  next(action);
};

export default logMiddleware;
