import {takeLatest} from 'redux-saga';
import {take, put, call, fork, select} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import {Resources, RequestMethods} from '../constant';
import makeRequest from '../libs/rest-client';
import {toastr} from 'react-redux-toastr';
import {selectResourceLink} from '../selectors';
import {signInSuccess, signInFailed} from '../actions/auth-actions';
import {appAuthentication} from '../config';
import {push} from 'react-router-redux';
import {selectLocationBeforeAuth} from '../selectors';

export function* signInSage(action) {
  const authHeader = 'Basic ' + btoa(appAuthentication.id + ':' + appAuthentication.secret);
  let signReq = {
    method: RequestMethods.POST,
    url: yield select(selectResourceLink, Resources.Authentication),
    header: {
      Authorization: authHeader
    },
    params: {
      username: action.username,
      password: action.password,
      grant_type: 'password'
    }
  };
  try {
    const response = yield call(makeRequest, signReq);
    yield put(yield call(signInSuccess, response.body));
    const location = yield select(selectLocationBeforeAuth);
    if (location) {
      yield put(yield call(push, location))
    } else {
      yield put(yield call(push, '/'))
    }
  } catch (e) {
    yield put(yield call(signInFailed, 'The login name or password you entered is incorrect'))
  }
}

/*----------------------------------------------------------
 WATCH sagas
 ------------------------------------------------------------*/

export function* watchSignIn() {
  while (true) {
    yield* takeLatest(ActionTypes.AUTH.SIGN_IN, signInSage);
  }
}
