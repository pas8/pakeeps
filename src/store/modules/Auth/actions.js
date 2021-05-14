import * as types from './types';

export const toLogin = payload => ({
  type: types.AUTHENTICATED,
  payload
});

export const toUpdateUser = payload => ({
  type: types.UPDATE_USER,
  payload
});

export const toRegister = payload => ({
  type: types.REGISTERED,
  payload
});

export const toError = payload => ({
  type: types.AUTHENTICATION_ERROR,
  payload
});

export const toLogout = () => ({
  type: types.UNAUTHENTICATED
});

export const toForgotPassword = () => ({
  type: types.FORGOT_PASSWORD
});

export const toResetPassword = () => ({
  type: types.RESET_PASSWORD
});

export const toRefreshToken = () => ({
  type: types.REFRESH_TOKEN
});

export const toLoadPage = () => ({
  type: types.PAGE_LOADED
});

export const toClearError = () => ({
  type: types.CLEAR_ERROR
});

export const toClearData = () => ({
  type: types.CLEAR_DATA
});
