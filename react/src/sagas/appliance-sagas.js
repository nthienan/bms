import {takeEvery} from 'redux-saga';
import {take, put, call, fork, select} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';
import {getResourceLink} from '../selectors';

export function* loadApplianceSaga(action) {
  try {
    let {request, success, error} = action;
    request.url = yield select(getResourceLink, request.resource);
    const response = yield call(makeRequest, request);
    if (!response.error) {
      yield put({type: success, payload: response.body});
    } else {
      yield put({type: error, payload: response});
    }
  } catch (e) {
    yield put({type: ActionTypes.REQUEST.CALL_ERROR, error: e});
  }
}

export function* watchLoadAppliance() {
  while (true) {
    yield* takeEvery(ActionTypes.APPLIANCE.LOAD, loadApplianceSaga);
  }
}
