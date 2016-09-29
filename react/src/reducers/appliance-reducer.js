import ActionTypes from '../actions/action-types';

const initState = {
  isLoading: true,
  _embedded: {
    appliances: []
  },
  selectedAppliances: null
};

export default function (state = initState, action) {
  switch (action.type) {
    /*case ActionTypes.APPLIANCE.SELECTED:
     return {...state, selectedAppliances: action.selectedAppliances};*/

    case ActionTypes.APPLIANCE.LOAD:
      return {...state, isLoading: true};

    case ActionTypes.APPLIANCE.DELETE_SELECTED:
      const appliances = state.data._embedded.appliances.filter((app) => {
        return !app.selected;
      });
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          appliances: appliances
        }
      };

    case ActionTypes.APPLIANCE.LOAD_SUCCESS:
      return {...state, ...action.data, isLoading: false};

    case ActionTypes.APPLIANCE.LOAD_ERROR:
      return {...state, isLoading: false};

    case ActionTypes.APPLIANCE.LOAD_OWNERS_SUCCESS:
      let apps = state._embedded.appliances.map(app => {
        if (app._links.self.href === action.applianceLink) {
          app.owners = action.owners;
        }
        return app;
      });
      return {...state, _embedded: {...state._embedded, appliances: apps}};

    case ActionTypes.REQUEST.CALL_ERROR:
      return {...state, isLoading: false};

    default:
      return state;
  }
};
