import {takeLatest, takeEvery} from 'redux-saga';
import {take, put, call, fork, select} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';
import {selectResourceLink} from '../selectors';
import {
  loadAppliancesSuccess,
  loadAppliancesError,
  loadOwnersAppliance,
  loadOwnersApplianceSuccess
} from '../actions/applaince-actions';
import {callRequestError} from '../actions/request-actions';

function* loadApplianceOwners(action) {
  if (action.appliance._links && action.appliance._links.owners) {
    let req = {
      url: action.appliance._links.owners.href
    };
    const res = yield call(makeRequest, req);
    yield put(yield call(loadOwnersApplianceSuccess, action.appliance._links.self.href, res.body))
  }
}

export function* loadApplianceSaga(action) {
  try {
    action.request.url = yield select(selectResourceLink, action.request.resource);
    const response = yield call(makeRequest, action.request);
    if (!response.error) {
      for (let i = 0; i < response.body._embedded.appliances.length; i++) {
        yield put(yield call(loadOwnersAppliance, response.body._embedded.appliances[i]));
      }
      yield put(yield call(loadAppliancesSuccess, response.body));
    } else {
      yield put(yield call(loadAppliancesError, response));
    }
  } catch (e) {
    yield put(yield call(callRequestError, e));
  }
}

export function* watchLoadAppliance() {
  yield [
    takeLatest(ActionTypes.APPLIANCE.LOAD, loadApplianceSaga),
    takeEvery(ActionTypes.APPLIANCE.LOAD_OWNERS, loadApplianceOwners)
  ]
}
