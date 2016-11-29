import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/layout/App/App';
import ApplianceList from './components/container/Appliance/ApplianceList';
import User from './components/container/User/User';
import SignIn from './components/container/SignIn/SignIn';
import Authentication from './components/hoc/Authentication/Authentication';

export default (
    <Route path="/" component={App}>
      <Route path="/sign-in" component={SignIn}/>
      <IndexRoute component={Authentication(ApplianceList)}/>
      <Route path="/user" component={Authentication(User)}/>
    </Route>
);
