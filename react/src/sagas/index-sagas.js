import {fork} from 'redux-saga/effects';
import {watchLoadResourceLinksSaga} from './resource-sagas';
import {watchLoadAppliance} from './appliance-sagas';

export default function* rootSaga() {
  yield [
    fork(watchLoadResourceLinksSaga),
    fork(watchLoadAppliance)
  ]
}
