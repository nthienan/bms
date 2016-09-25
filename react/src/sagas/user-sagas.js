import {takeLatest} from 'redux-saga';
import {take, put, call, fork, select} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';
import {selectResourceLink} from '../selectors';
import {callRequestError} from '../actions/request-action';
import {loadUserSuccess, loadUserError} from '../actions/user-actions';

export function* loadUserSaga(action) {
  try {
    action.request.url = yield select(selectResourceLink, action.request.resource);
    const response = yield call(makeRequest, action.request);
    if (!response.error) {
      yield put(yield call(loadUserSuccess, response.body));

    } else {
      yield put(yield call(loadUserError, response));
    }
  } catch (e) {
    yield put(yield call(callRequestError, e));
  }
}

export function* watchLoadUser() {
  while (true) {
    yield* takeLatest(ActionTypes.USER.LOAD, loadUserSaga());
  }
}
