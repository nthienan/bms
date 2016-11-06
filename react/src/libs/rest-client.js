import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';
import {RequestMethods} from '../constant';
import objectPath from 'object-path';
import {getAuthenticationUrl, appAuthentication} from '../config';

const makeRequest = ({url, method = RequestMethods.GET, params, body, header}, success, failure) => {
  const apiRequest = url.match(/api/);
  if (apiRequest) {
    if (!header) {
      header = {};
    }
    addOauth2Header(header);
  }
  let req = createRequest(url, method, params, body, header);
  return req.then(res => {
    return new Promise((resolve, reject) => {
      if (typeof success === 'function') {
        success(res);
      }
      resolve(res);
    });
  }, err => {
    return new Promise((resolve, reject) => {
      const isFunc = typeof failure === 'function';
      if (err && err.status === 401 && err.response.body.error === 'invalid_token') {
        refreshToken().then(res1 => {
          localStorage.setItem('auth', res1.text);
          addOauth2Header(header);
          let req1 = createRequest(url, method, params, body, header);
          req1.then(res2 => {
            if (typeof success === 'function') {
              success(res2);
            }
            resolve(res2);
          }, err2 => {
            if (isFunc) {
              failure(err2);
            }
            reject(err2);
          });
        }, err1 => {
          if (isFunc) {
            failure(err1);
          }
          reject(err1);
        });
      } else {
        if (isFunc) {
          failure(err);
        }
        reject(err);
      }
    });
  });
};

const createRequest = (url, method, params, body, header) => {
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
  if (header) {
    req.set(header);
  }
  if (params) {
    req.query(params);
  }
  if (body) {
    req.send(body);
  }
  return req;
};

const refreshToken = () => {
  let req = superagent('POST', getAuthenticationUrl()).use(superagentPromisePlugin);
  const authHeader = 'Basic ' + btoa(appAuthentication.id + ':' + appAuthentication.secret);
  const header = {
    Authorization: authHeader,
  };
  req.set(header);
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (auth) {
    const params = {
      grant_type: 'refresh_token',
      refresh_token: auth.refresh_token
    };
    req.query(params);
  }
  return req;
};

const addOauth2Header = (header) => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (auth) {
    const headerValue = auth['token_type'] + ' ' + auth['access_token'];
    objectPath.set(header, 'Authorization', headerValue);
  }
};


export default makeRequest;
