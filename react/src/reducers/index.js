import { combineReducers } from 'redux';
import applianceReducer from './appliance-reducer'
import modalReducer from './modal-reduxcer'
import resourceReducer from './resource-reducer'

const rootReducer = combineReducers({
  appliances: applianceReducer,
  modal: modalReducer,
  resources: resourceReducer
});

export default rootReducer;
