import { combineReducers } from 'redux';
import applianceReducer from './appliance-reducer';
import modalReducer from './modal-reduxcer';
import resourceReducer from './resource-reducer';
import userReducer from './user-reducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  appliances: applianceReducer,
  users: userReducer,
  modal: modalReducer,
  resourceLinks: resourceReducer
});

export default rootReducer;
