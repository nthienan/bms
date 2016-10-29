import {combineReducers} from 'redux';
import appliances from './appliance-reducer';
import modal from './modal-reduxcer';
import resourceLinks from './resource-reducer';
import users from './user-reducer';
import auth from './auth-reducer';
import {reducer as toastr} from 'react-redux-toastr';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  toastr,
  form,
  appliances,
  users,
  modal,
  resourceLinks,
  auth
});

export default rootReducer;
