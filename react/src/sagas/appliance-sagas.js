import {takeEvery} from 'redux-saga';
import {take, put, call, fork, select} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';
import {selectResourceLink} from '../selectors';
import {loadAppliancesSuccess, loadAppliancesError} from '../actions/applaince-actions';
import {callRequestError} from '../actions/request-action';

export function* loadApplianceSaga(action) {
  try {
    action.request.url = yield select(selectResourceLink, action.request.resource);
    const response = yield call(makeRequest, action.request);
    if (!response.error) {
      yield put(yield call(loadAppliancesSuccess, response.body));
    } else {
      yield put({type: error, payload: response});
      yield put(yield call(loadAppliancesError, response));
    }
  } catch (e) {
    yield put(yield call(callRequestError, e));
  }
}

export function* watchLoadAppliance() {
  while (true) {
    yield* takeEvery(ActionTypes.APPLIANCE.LOAD, loadApplianceSaga);
  }
}
