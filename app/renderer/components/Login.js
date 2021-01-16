import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/user';
import authService from '../services/authService';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  btn: {
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
    marginBottom: '16px',
  },
  submissions: {
    width: '80px',
    height: '50px',
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userField, setUserField] = useState({});

  const handleChange = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: [e.target.value],
    });
  };

  const handleLogin = () => {
    dispatch(login());
    authService.handleEmailAndPasswordLogin('abhimait1909@gmail.com', 'ak@123456');
  };

  return (
    <div>
      <h2>Login</h2>
      <ValidatorForm onSubmit={handleLogin}>
        <TextValidator
          className={classes.textField}
          required
          variant="outlined"
          label="Email Address"
          name="email"
          value={userField.email}
          onChange={handleChange}
        />

        <TextValidator
          className={classes.textField}
          required
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          value={userField.password}
          onChange={handleChange}
        />

        <Button type="submit" className={classes.btn}>
          Login
        </Button>
      </ValidatorForm>
    </div>
  );
}
