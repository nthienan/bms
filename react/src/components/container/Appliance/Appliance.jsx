import React from 'react';
import DataTable from '../../ui/DataTable/DataTable'

class Appliance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          name: 'John Smith',
          gender: 'Male',
          status: 'Employed'
        }
        ,
        {
          id: 2,
          name: 'Randal White',
          gender: 'Male',
          status: 'Unemployed'
        }
        ,
        {
          id: 3,
          name: 'Stephanie Sanders',
          gender: 'Male',
          status: 'Employed'
        }
        ,
        {
          id: 4,
          name: 'Steve Brown',
          gender: 'Male',
          status: 'Employed'
        }
        ,
        {
          id: 5,
          name: 'Joyce Whitten',
          gender: 'Male',
          status: 'Employed'
        }
        ,
        {
          id: 6,
          name: 'Samuel Roberts',
          gender: 'Male',
          status: 'Employed'
        }
        ,
        {
          id: 7,
          name: 'Adam Moore',
          gender: 'Female',
          status: 'Employed'
        },
        {
          id: 8,
          name: 'Samuel Roberts',
          gender: 'Male',
          status: 'Employed'
        }
        ,
        {
          id: 9,
          name: 'Adam Moore',
          gender: 'Female',
          status: 'Employed'
        }
        ,
        {
          id: 10,
          name: 'Adam Moore',
          gender: 'Female',
          status: 'Employed'
        }
      ]
    };
  }

  render() {
    return (
      <div className="ap-appliance">
        <DataTable data={this.state.data} title="Appliances" />
      </div>
    );
  }
}

export default Appliance;
