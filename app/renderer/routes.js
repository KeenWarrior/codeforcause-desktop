import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
import ProfileView from './containers/StudentDashboardView';
import EditProfileView from './containers/StudentDashboardView/EditProfile';
import VideoPlayer from './components/VideoPage';
import ErrorPage from './containers/404';
// import Pl from './components/VideoPage/VideoPlayer';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/profile" component={ProfileView} />
      <Route exact path="/editProfile" component={EditProfileView} />
      <Route exact path="/course" component={VideoPlayer} />
      <Route exact path="*" component={ErrorPage} />
    </Switch>
  );
}
