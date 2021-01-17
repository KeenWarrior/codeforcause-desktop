import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
// import ProfileView from './containers/StudentDashboardView'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
    </Switch>
  );
}
