import {takeLatest, takeEvery} from 'redux-saga';
import {take, put, call, fork, select} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';
import {selectResourceLink} from '../selectors';
import {
  loadAppliancesSuccess,
  loadAppliancesError,
  loadOwnersAppliance,
  loadOwnersApplianceSuccess,
  loadAppliancesById,
  editApplianceSuccess
} from '../actions/appliance-actions';
import {Resources, RequestMethods, Header} from '../constant';
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
    yield put(yield call(loadOwnersApplianceSuccess, action.appliance._links.self.href, res.body));
  }
}

export function* loadApplianceSaga(action) {
  try {
    action.request.url = yield select(selectResourceLink, action.request.resource);
    const response = yield call(makeRequest, action.request);
    for (let i = 0; i < response.body._embedded.appliances.length; i++) {
      yield put(yield call(loadOwnersAppliance, response.body._embedded.appliances[i]));
    }
    yield put(yield call(loadAppliancesSuccess, response.body));
  } catch (e) {
    yield put(yield call(loadAppliancesError, e));
  }
}

export function* loadApplianceByIdSaga(action) {
  let url = yield select(selectResourceLink, Resources.Appliances);
  let req = {
    method: RequestMethods.GET,
    url: url + `/${action.applianceId}`,
    header: {
      [Header.Accept]: 'application/json'
    }
  };
  try {
    const res = yield call(makeRequest, req);
    yield put(yield call(loadOwnersAppliance, res.body));
  } catch (e) {
    yield call(toastr.error, 'Error', e.response.error.message, errorToastOption);
  }
}

function* getOwnerUriList(owners) {
  let ownerLinks = '';
  const ownersArr = owners.split(',');
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
    } catch (e) {
      if (e.status !== 404) {
        let msg = 'There was an error at "' + ownersArr[i].trim() + '"';
        yield call(toastr.error, msg, e.response.error.message, errorToastOption);
      }
    }
  }
  return ownerLinks;
}

function *assignOwner(appliance, ownerLinks) {
  let req = {
    method: RequestMethods.PUT,
    url: appliance._links.owners.href,
    header: {
      [Header.ContentType]: 'text/uri-list'
    },
    body: ownerLinks
  };
  try {
    const rep = yield call(makeRequest, req);
  } catch (e) {
    let msg = `Cannot assign owners for appliance ${appliance.hostname}`;
    yield call(toastr.error, msg, e.response.error.message, errorToastOption);
  }
}

export function* addApplianceSaga(action) {
  let appliance = {...action.appliance};
  let ownerLinks = '';
  if (appliance.owners && appliance.owners !== '') {
    ownerLinks = yield getOwnerUriList(appliance.owners);
  }
  objectPath.del(appliance, 'owners');
  let postApplianceReq = {
    method: RequestMethods.POST,
    url: yield select(selectResourceLink, Resources.Appliances),
    header: {
      [Header.Accept]: 'application/json'
    },
    body: appliance
  };
  try {
    const response = yield call(makeRequest, postApplianceReq);
    let msg = 'Appliance "' + appliance.hostname + '" has been created';
    yield call(toastr.success, 'Successfully created', msg);
    if (response && ownerLinks && ownerLinks.length > 0) {
      yield assignOwner(response.body, ownerLinks);
    }
  } catch (e) {
    yield call(toastr.error, 'Error', e.response.error.message, errorToastOption);
  }
}

export function* editApplianceSaga(action) {
  let {appliance, owners} = action;
  let req = {
    method: RequestMethods.PUT,
    url: appliance._links.self.href,
    header: {
      [Header.ContentType]: 'application/json',
      [Header.Accept]: 'application/json'
    },
    body: appliance
  };
  try {
    const res = yield call(makeRequest, req);
    let ownerLinks = yield getOwnerUriList(owners);
    yield assignOwner(appliance, ownerLinks);
    yield put(yield call(loadAppliancesById, res.body.id));
    yield put(yield call(editApplianceSuccess, res.body));
    let msg = 'Appliance "' + appliance.hostname + '" has been updated';
    yield call(toastr.success, 'Successful', msg);
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

export function* watchEditAppliance() {
  yield takeEvery(ActionTypes.APPLIANCE.EDIT, editApplianceSaga)
}

export function* watchLoadApplianceById() {
  yield takeEvery(ActionTypes.APPLIANCE.LOAD_BY_ID, loadApplianceByIdSaga)
}
