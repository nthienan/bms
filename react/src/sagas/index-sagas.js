import {fork} from 'redux-saga/effects';
import {watchLoadResourceLinksSaga} from './resource-sagas';
import {watchLoadAppliance, watchAddAppliance} from './appliance-sagas';
import {watchLoadUser} from './user-sagas';

export default function* rootSaga() {
  yield [
    fork(watchLoadResourceLinksSaga),
    fork(watchLoadAppliance),
    fork(watchLoadUser),
    fork(watchAddAppliance)
  ]
}
