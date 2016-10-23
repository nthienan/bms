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
} from '../actions/appliance-actions';
import {callRequestError} from '../actions/request-actions';
import {Resources, RequestMethods} from '../constant';
import objectPath from 'object-path';
import {toastr} from 'react-redux-toastr';

const errorToastOption = {
  timeOut: 0, // by setting to 0 it will prevent the auto close
  removeOnHover: false
};

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

export function* addApplianceSaga(action) {
  let appliance = {...action.appliance};
  let ownerLinks = '';
  if (appliance.owners && appliance.owners !== '') {
    const ownersArr = appliance.owners.split(',');
    for (let i = 0; i < ownersArr.length; i++) {
      let findRequest = {
        url: yield select(selectResourceLink, Resources.Users, 'findByUsername'),
        header: {
          Accept: 'application/json'
        },
        params: {
          username: ownersArr[i].trim()
        }
      };
      try {
        const response = yield call(makeRequest, findRequest);
        ownerLinks += response.body._links.self.href + '\n';
        console.log(ownerLinks);
      } catch (e) {
        if (e.status !== 404) {
          let msg = 'Cannot assign owner "' + ownersArr[i].trim() + '"';
          yield call(toastr.error, msg, e.response.error.message, errorToastOption);
          return;
        }
      }
    }
  }
  objectPath.del(appliance, 'owners');
  let postApplianceReq = {
    method: RequestMethods.POST,
    url: yield select(selectResourceLink, Resources.Appliances),
    header: {
      Accept: 'application/json'
    },
    body: appliance
  };
  try {
    const response = yield call(makeRequest, postApplianceReq);
    let msg = 'Appliance "' + appliance.hostname + '" has been created';
    yield call(toastr.success, 'Successfully created', msg);
    if (response && ownerLinks && ownerLinks.length > 0) {
      let assignOwnerReq = {
        method: RequestMethods.POST,
        url: response.body._links.owners.href,
        header: {
          'Content-Type': 'text/uri-list'
        },
        body: ownerLinks
      };
      const assignOwnerRes = yield call(makeRequest, assignOwnerReq);
    }
  } catch (e) {
    yield call(toastr.error, 'Error', e.response.error.message, errorToastOption);
  }
}

/*----------------------------------------------------------
 WATCH sagas
 ------------------------------------------------------------*/

export function* watchLoadAppliance() {
  yield [
    takeLatest(ActionTypes.APPLIANCE.LOAD, loadApplianceSaga),
    takeEvery(ActionTypes.APPLIANCE.LOAD_OWNERS, loadApplianceOwners)
  ]
}

export function* watchAddAppliance() {
  yield takeEvery(ActionTypes.APPLIANCE.ADD, addApplianceSaga)
}
