import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';
import {RequestMethods} from '../constant';

const makeRequest = ({url, method = RequestMethods.GET, params, body, header}) => {
  let methodStr;
  switch (method) {
    case RequestMethods.POST:
      methodStr = 'POST';
      break;
    case RequestMethods.PUT:
      methodStr = 'PUT';
      break;
    case RequestMethods.DELETE:
      methodStr = 'DELETE';
      break;
    default:
      methodStr = 'GET';
      break;
  }
  let req = superagent(methodStr, url).use(superagentPromisePlugin);
  //set header
  if (header) {
    req.set(header)
  }
  //set param
  if (params) {
    req.query(params)
  }
  //set body
  if (body) {
    req.send(body)
  }
  return req;
};

export default makeRequest;
