import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
import ProfileView from './containers/StudentDashboardView';
import EditProfileView from './containers/StudentDashboardView/EditProfile';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/" component={ProfileView} />
      <Route exact path="/editProfile" component={EditProfileView} />
    </Switch>
  );
}
