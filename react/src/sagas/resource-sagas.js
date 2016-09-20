import {takeEvery} from 'redux-saga';
import {take, put, call, fork} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';

export function* loadResourceLinksSaga(action) {
  try {
    let {request, success, error} = action;
    const response = yield call(makeRequest, request);
    if (!response.error) {
      yield put({type: success, data: response.body});
    } else {
      yield put({type: error, error: response});
    }
  } catch (e) {
    yield put({type: ActionTypes.REQUEST.CALL_ERROR, error: e});
  }
}

export function* watchLoadResourceLinksSaga() {
  while (true) {
    yield* takeEvery(ActionTypes.RESOURCE.LOAD_LINKS, loadResourceLinksSaga);
  }
}
