import {takeEvery} from 'redux-saga';
import {take, put, call, fork} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';
import {getResourceLinksSuccess, getResourceLinksError} from '../actions/resource-actions';
import {callRequestError} from '../actions/request-actions';

export function* loadResourceLinksSaga(action) {
  try {
    const response = yield call(makeRequest, action.request);
    if (!response.error) {
      yield put(yield call(getResourceLinksSuccess, response.body));
    } else {
      yield put(yield call(getResourceLinksError, response));
    }
  } catch (e) {
    yield put(yield call(callRequestError, e));
  }
}

export function* watchLoadResourceLinksSaga() {
  while (true) {
    yield* takeEvery(ActionTypes.RESOURCE.LOAD_LINKS, loadResourceLinksSaga);
  }
}
