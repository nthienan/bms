import { combineReducers } from 'redux';
import applianceReducer from './appliance-reducer'
import modalReducer from './modal-reduxcer'

const rootReducer = combineReducers({
  appliances: applianceReducer,
  modal: modalReducer
});

export default rootReducer;
