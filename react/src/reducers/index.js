import { combineReducers } from 'redux';
import applianceReducer from './appliance-reducers'

const rootReducer = combineReducers({
  appliances: applianceReducer
});

export default rootReducer;
