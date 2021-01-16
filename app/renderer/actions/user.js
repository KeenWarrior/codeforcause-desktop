import { createAction } from 'redux-actions';
import authService from '../services/authService';

export const LOGIN_REQUEST = '@account/login-request';
export const DISMISS_LOGIN = '@account/dismiss-login';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';

export function login() {
  return async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
  };
}

export function dismissLogin() {
  return async dispatch => {
    dispatch({ type: DISMISS_LOGIN });
  };
}

export function setUserData(user) {
  return dispatch =>
    dispatch({
      type: SILENT_LOGIN,
      payload: {
        user
      }
    });
}

export function logout() {
  return async dispatch => {
    authService.logout();
    dispatch({
      type: LOGOUT
    });
  };
}


export default {
  login: createAction('USER_LOGIN'),
  logout: createAction('USER_LOGOUT'),
};
