import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div>
      404 Page to stop freezing otherwise
      <Typography variant="h4">Available Routes</Typography>
      <Link to="/">Login</Link> <br />
      <Link to="/profile">Profile</Link> <br />
      <Link to="/editProfile">Edit Profile</Link> <br />
      <Link to="course">Video Page</Link> <br />
    </div>
  );
}
