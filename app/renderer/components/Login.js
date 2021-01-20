import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../actions/user';
import authService from '../services/authService';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { SnackbarProvider, useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    background: 'linear-gradient(269.76deg, #180255 0.18%, #000000 53.35%, #000000 107.44%)',
    height: '100vh',
    position: 'relative'
  },
  loginContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing(5),
    width: 'max-content',
    position: 'absolute',
    left: '50%',
    top: '50%',
    '-ms-transform': 'translate(-50%,-50%)',
    transform: 'translate(-50%,-50%)',
    borderRadius: '3px'
  },
  btn: {
    padding: '10px',
    backgroundColor: '#A60000',
    color: '#ffffff',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '&:hover': {
      backgroundColor: 'rgba(166, 0, 0, 0.8)',
    },
  },
  textField: {
    marginBottom: '24px',
  },
  submissions: {
    width: '80px',
    height: '50px',
  },
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userField, setUserField] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    dispatch(login());
    console.log(userField.email);
    authService.handleEmailAndPasswordLogin(userField.email, userField.password).then(user => {
      console.log(user)
      enqueueSnackbar(`Logged in as ${user.displayName}`, {variant: 'success'});
    }).catch(e => {
      console.log(e)
      enqueueSnackbar(`${e.message}`, {variant: 'error'})
    })
  };

  const handleLogout = () => {
    dispatch(logout());
    authService.logout();
    enqueueSnackbar('Successfully Logged out!', {variant: 'success'});
  };

  return (
    <div className={classes.root}>
      <Container className={classes.loginContainer}>
        <Typography style={{ fontSize: '34px', fontWeight: 700 }}>
          Sign In
      </Typography>
      <Typography variant="h4" style={{fontWeight: 500, margin: '20px 0px 40px'}}>
        Stand Up and fight for the Cause with the Code For Cause
      </Typography>
        <ValidatorForm onSubmit={handleLogin}>
          <TextValidator
            className={classes.textField}
            required
            fullWidth
            variant="outlined"
            label="Email Address"
            name="email"
            value={userField.email}
            onChange={handleChange}
          />

          <TextValidator
            className={classes.textField}
            required
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={userField.password}
            onChange={handleChange}
          />
          <Button type="submit" className={classes.btn} fullWidth>
            Login
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
        </ValidatorForm>
      </Container>
    </div>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Login />
    </SnackbarProvider>
  );
}