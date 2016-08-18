const initState = {
  appliances: [
    {
      id: 1,
      name: 'John Smith',
      gender: 'Male',
      status: 'Employed'
    }, {
      id: 2,
      name: 'Randal White',
      gender: 'Male',
      status: 'Unemployed'
    }, {
      id: 3,
      name: 'Stephanie Sanders',
      gender: 'Male',
      status: 'Employed'
    }, {
      id: 4,
      name: 'Steve Brown',
      gender: 'Male',
      status: 'Employed'
    }, {
      id: 5,
      name: 'Joyce Whitten',
      gender: 'Male',
      status: 'Employed'
    }, {
      id: 6,
      name: 'Samuel Roberts',
      gender: 'Male',
      status: 'Employed'
    }, {
      id: 7,
      name: 'Adam Moore',
      gender: 'Female',
      status: 'Employed'
    }, {
      id: 8,
      name: 'Samuel Roberts',
      gender: 'Male',
      status: 'Employed'
    }, {
      id: 9,
      name: 'Adam Moore',
      gender: 'Female',
      status: 'Employed'
    }, {
      id: 10,
      name: 'Adam Moore',
      gender: 'Female',
      status: 'Employed'
    }
  ]
};

export default function (state = initState, action) {
  switch (action.type) {
    case 'LOADING_APPLIANCE':
      return {
        appliances: initState
      };
    case 'SELECTED_APPLIANCE':
      let newAppliances = [...state];
      let selectedAppliances = action.payload;
      if (selectedAppliances === 'all') {
        newAppliances.map((appliance, index) => {
            newAppliances[index] = {...newAppliances[index], selected: true};
        });
      } else if(selectedAppliances === 'none') {
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
      return newAppliances;
    default:
      return state.appliances;
  }
}
