import ActionTypes from '../actions/action-types';
import objectPath from 'object-path';

const initState = {
  isLoading: true,
  _embedded: {
    appliances: []
  },
  page: {
    number: 0,
    totalElements: 0
  },
  selectedAppliances: null,
  owners: {}
};

export default function (state = initState, action) {
  switch (action.type) {

    case ActionTypes.APPLIANCE.LOAD:
      return {...state, isLoading: true};

    case ActionTypes.APPLIANCE.LOAD_SUCCESS:
      return {...state, ...action.data, isLoading: false};

    case ActionTypes.APPLIANCE.LOAD_ERROR:
      return {...state, isLoading: false};

    case ActionTypes.APPLIANCE.LOAD_OWNERS_SUCCESS:
      let owners = {...state.owners};
      objectPath.set(owners, action.applianceLink, action.owners);
      return {...state, owners: owners};

    case ActionTypes.REQUEST.CALL_ERROR:
      return {...state, isLoading: false};

    case ActionTypes.APPLIANCE.EDIT_SUCCESS:
      let appliance = [...state._embedded.appliances];
      let newAppliances = appliance.map(app => {
        if (app._links.self.href === action.appliance._links.self.href) {
          return action.appliance;
        }
        return app;
      });
      return {...state, _embedded: {...state._embedded, appliances: newAppliances}};

    default:
      return state;
  }
};
