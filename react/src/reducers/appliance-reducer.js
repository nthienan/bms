import ActionTypes from '../actions/action-types';

const initState = {
  column: {name: 'Appliance Name', hostname: 'Hostname', ipv4Address: 'IPv4 Address'},
  data: {
    '_embedded': {'appliances': []}
  },
  selectedAppliances: null
};

export default function (state = initState, action) {
  switch (action.type) {
    /*case ActionTypes.APPLIANCE.SELECTED:
      return {...state, selectedAppliances: action.selectedAppliances};*/

    case ActionTypes.APPLIANCE.DELETE_SELECTED:
      const appliances = state.data._embedded.appliances.filter((app) => {
        return !app.selected;
      });
      return {
        ...state,
        data: {
          ...state.data,
          _embedded: {
            ...state.data._embedded,
            appliances: appliances
          }
        }
      };

    case ActionTypes.APPLIANCE.LOAD_SUCCESS:
      return {...state, data: action.data};

    case ActionTypes.APPLIANCE.LOAD_ERROR:
      return state;

    default:
      return state;
  }
};
