import {fork} from 'redux-saga/effects';
import {watchLoadResourceLinksSaga} from './resource-sagas';
import {
  watchLoadAppliance,
  watchAddAppliance,
  watchEditAppliance,
  watchLoadApplianceById
} from './appliance-sagas';
import {watchLoadUser} from './user-sagas';
import {watchSignIn} from './auth-sagas';

export default function* rootSaga() {
  yield [
    fork(watchLoadResourceLinksSaga),
    fork(watchLoadAppliance),
    fork(watchLoadUser),
    fork(watchAddAppliance),
    fork(watchEditAppliance),
    fork(watchLoadApplianceById),
    fork(watchSignIn)
  ]
}
