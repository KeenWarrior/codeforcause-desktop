import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { shell } from 'electron';
import { useDispatch } from 'react-redux';
import { login, logout } from '../actions/user';
import authService from '../services/authService';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    height: '100vh',
    position: 'relative',
  },
  loginContainer: {
    backgroundColor: '#c4c4c4',
    padding: theme.spacing(5),
    width: '500px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    '-ms-transform': 'translate(-50%,-50%)',
    transform: 'translate(-50%,-50%)',
    borderRadius: '3px',
  },
  btn: {
    padding: '10px',
    backgroundColor: '#A60000',
    color: '#ffffff',
    marginBottom: theme.spacing(3),
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
    backgroundColor: '#ececec',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ececec',
    },
  },
  submissions: {
    width: '80px',
    height: '50px',
  },
  forgotPass: {
    fontWeight: 700,
    fontSize: 14,
    display: 'inline',
  },
  captions: {
    display: 'block',
    marginBottom: '8px',
  },
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userField, setUserField] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleChange = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    dispatch(login());
    console.log(userField.email);
    authService
      .handleEmailAndPasswordLogin(userField.email, userField.password)
      .then((user) => {
        console.log(user);
        setTimeout(() => {
          history.push('/profile');
        }, 1000);
        enqueueSnackbar(`Logged in as ${user.displayName}`, { variant: 'success' });
      })
      .catch((e) => {
        console.log(e);
        errorHandler(e);
      });
  };

  const handleForgotPassword = () => {
    const { email } = userField;
    if (!email) {
      enqueueSnackbar('Please write your email in the email field', { variant: 'warning' });
    } else {
      authService
        .handlePasswordReset(email)
        .then(() => {
          enqueueSnackbar('Check Your Email, with password reset Link', { variant: 'success' });
        })
        .catch((e) => {
          console.log(e);
          errorHandler(e);
        });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    authService.logout();
    enqueueSnackbar('Successfully Logged out!', { variant: 'success' });
  };

  const errorHandler = (error) => {
    if (error.code === 'auth/user-not-found') {
      enqueueSnackbar('User Not Found!', { variant: 'info' });
      setTimeout(() => {
        enqueueSnackbar('Login with Google Auth from the codeforcause Website', {
          variant: 'info',
        });
      }, 200);
      setTimeout(() => {
        shell.openExternal('https://codeforcause.org/');
      }, 1000);
    } else if (error.code === 'auth/wrong-password') {
      enqueueSnackbar('Wrong Password!, Click on forgot password to reset!', { variant: 'info' });
    } else {
      enqueueSnackbar(`${error.message}`, { variant: 'error' });
    }
  };

  return (
    <div className={classes.root}>
      <Container className={classes.loginContainer}>
        <Typography align="left" style={{ fontSize: '34px', fontWeight: 700 }}>
          Sign In
        </Typography>
        <Typography variant="h6" style={{ fontWeight: 500, margin: '20px 0px 40px' }}>
          Stand Up and fight for the Cause with the Code For Cause
        </Typography>
        <ValidatorForm onSubmit={handleLogin}>
          <Typography variant="caption" className={classes.captions}>
            Your Registered Email Address
          </Typography>
          <TextValidator
            className={classes.textField}
            required
            fullWidth
            variant="outlined"
            name="email"
            value={userField.email}
            onChange={handleChange}
          />
          <Typography variant="caption" className={classes.captions}>
            Password
          </Typography>
          <TextValidator
            className={classes.textField}
            required
            fullWidth
            variant="outlined"
            name="password"
            type="password"
            value={userField.password}
            onChange={handleChange}
          />
          <Button type="submit" className={classes.btn} fullWidth>
            Sign In
          </Button>
          <Typography variant="caption" style={{ color: '#6d6d6d', fontSize: 12 }}>
            After continuing you agree to the Code For Cause Terms of Use and Privacy Policy
          </Typography>
          {/* <Button onClick={handleLogout}>Logout</Button> */}
          <div style={{ marginTop: '20px' }}>
            <Typography className={classes.forgotPass}>Forgot Password?</Typography>
            <Link
              onClick={handleForgotPassword}
              style={{ display: 'inline', textDecoration: 'none' }}>
              <Typography color="secondary" className={classes.forgotPass}>
                {' '}
                Click Here
              </Typography>
            </Link>
            <Typography className={classes.forgotPass}> for Help.</Typography>
          </div>
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
