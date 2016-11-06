import {takeLatest} from 'redux-saga';
import {take, put, call, fork, select} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import makeRequest from '../libs/rest-client';
import {selectResourceLink} from '../selectors';
import {loadUserSuccess, loadUserError} from '../actions/user-actions';
import {toastr} from 'react-redux-toastr';

const errorToastOption = {
  timeOut: 0, // by setting to 0 it will prevent the auto close
  removeOnHover: false
};

export function* loadUserSaga(action) {
  action.request.url = yield select(selectResourceLink, action.request.resource);
  try {
    const response = yield call(makeRequest, action.request);
    yield put(yield call(loadUserSuccess, response.body));
  } catch (e) {
    yield call(toastr.error, 'Error', e.response.error.message, errorToastOption);
  }
}

export function* watchLoadUser() {
  while (true) {
    yield* takeLatest(ActionTypes.USER.LOAD, loadUserSaga);
  }
}
