import ActionTypes from '../actions/action-types';

const initState = {
  column: ['Appliance Name', 'Hostname', 'IPv4 Address'],
  data: {
    '_embedded': {'appliances': []}
  }
};

export default function (state = initState, action) {
  switch (action.type) {
    case ActionTypes.APPLIANCE.SELECTED:
      let newAppliances = [...state.data._embedded.appliances];
      let selectedAppliances = action.payload;
      if (selectedAppliances === 'all') {
        newAppliances.map((appliance, index) => {
          newAppliances[index] = {...newAppliances[index], selected: true};
        });
      } else if (selectedAppliances === 'none') {
        newAppliances.map((appliance, index) => {
          newAppliances[index] = {...newAppliances[index], selected: false};
        });
      } else {
        newAppliances.map((appliance, index) => {
          if (selectedAppliances.find(x => x === index) === index) {
            newAppliances[index] = {...newAppliances[index], selected: true};
          } else {
            newAppliances[index] = {...newAppliances[index], selected: false};
          }
        });
      }
      return {
        ...state,
        data: {
          ...state.data,
          _embedded: {
            ...state.data._embedded,
            appliances: newAppliances
          }
        }
      };

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
