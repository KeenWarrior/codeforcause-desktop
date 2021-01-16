import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


import {
  Typography,
  Dialog,
  DialogContent,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem
} from '@material-ui/core';

import authService from '../services/authService';
import { StyledFirebaseAuth } from 'react-firebaseui';

function FirebaseAuth() {
  // const user = useSelector(state => state.account.user);
  // const loginFlag = useSelector(state => state.account.login);

  // const dispatch = useDispatch();
  // const handleLogout = () => {
  //   handleCloseMenu();
  //   dispatch(logout());
  //   dispatch(dismissLogin());
  // };

  // const handleClose = () => {
  //   dispatch(dismissLogin());
  // };

  // const handleLoginOpen = () => {
  //   dispatch(login());
  // };

  // const handleOpenMenu = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setAnchorEl(null);
  // };

  // const truncate = input => {
  //   const first = input.split(' ')[0];
  //   if (first.length > 13) {
  //     return first.substring(0, 10) + '...';
  //   }
  //   return first;
  // };

  const [load, loading] = useState(false);

  setTimeout(() => {
    loading(true)
  }, 3000);

  return (
    <div>
      {console.log(typeof window)}
      
    </div>
  );
}

export default FirebaseAuth;