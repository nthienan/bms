import {takeLatest} from 'redux-saga';
import {take, put, call, fork, select} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';
import {selectResourceLink} from '../selectors';
import {loadAppliancesSuccess, loadAppliancesError} from '../actions/applaince-actions';
import {callRequestError} from '../actions/request-actions';
import {error} from '../actions/error-actions';

function loadOwner(appliance) {
  if (appliance._links && appliance._links.owners) {
    let req = {
      url: appliance._links.owners.href,
      header: {
        Accept: 'application/json'
      }
    };
    return makeRequest(req);
  }
}

export function* loadApplianceSaga(action) {
  try {
    action.request.url = yield select(selectResourceLink, action.request.resource);
    const response = yield call(makeRequest, action.request);
    if (!response.error) {
      response.body._embedded.appliances.map(appliance => {
        loadOwner(appliance).then(res => appliance.owners = res.body);
      });
      yield put(yield call(loadAppliancesSuccess, response.body));
    } else {
      yield put(yield call(loadAppliancesError, response));
    }
  } catch (e) {
    yield put(yield call(callRequestError, e));
  }
}

export function* watchLoadAppliance() {
  while (true) {
    yield* takeLatest(ActionTypes.APPLIANCE.LOAD, loadApplianceSaga);
  }
}
