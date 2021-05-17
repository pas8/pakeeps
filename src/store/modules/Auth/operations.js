import request from 'ui/helpers/request';
import { JWT_TOKEN } from 'ui/helpers/config';
import {
  toLogin,
  toUpdateUser,
  toLoadPage,
  toLogout,
  toError,
  toForgotPassword,
  toResetPassword,
  toRefreshToken,
  toClearError,
  toClearData
} from './actions';
import { errorHandler } from '../errorHandlers';

export const login = (userData, remember = true) => async dispatch => {
  try {
    dispatch(toClearError());
    const { data } = await request.post('/api/v.1/account/token-auth/', userData, {
      notAuthorizeHeader: true
    });

    if (remember) {
      localStorage.setItem('auth_token', data.token);
    } else {
      sessionStorage.setItem('auth_token', data.token);
    }

    dispatch(toLogin());
  } catch (err) {
    errorHandler(err, dispatch, toError);
  }
};

export const updateUser = userData => async dispatch => {
  dispatch(toClearError());
  const localData = localStorage.getItem('userInfo') || null;
  const test = {
    ...JSON.parse(localData),
    ...userData
  };
  dispatch(toUpdateUser(test));
};

export const forgotPassword = email => async dispatch => {
  try {
    dispatch(toClearError());

    await request.get(`/api/v.1/account/me/password/reset/?email=${encodeURIComponent(email)}`, {
      notAuthorizeHeader: true
    });

    dispatch(toForgotPassword());
  } catch (err) {
    errorHandler(err, dispatch, toError);
  }
};

export const resetPassword = resetData => async dispatch => {
  try {
    dispatch(toClearError());

    await request.post('/api/v.1/account/me/password/reset/', resetData, {
      notAuthorizeHeader: true
    });

    dispatch(toResetPassword());
  } catch (err) {
    errorHandler(err, dispatch, toError);
  }
};

export const refreshToken = async dispatch => {
  try {
    dispatch(toClearError());

    const { data } = await request.post('/api/auth/refresh');

    localStorage.setItem('auth_token', data.token);

    dispatch(toRefreshToken());
  } catch (err) {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');

    dispatch(toLogout());
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_token');

  dispatch(toLogout());
};

export const checkJwt = () => async dispatch => {
  if (!JWT_TOKEN) {
    dispatch(toLoadPage());

    return null;
  }

  dispatch(toLogin());
  dispatch(toLoadPage());
};

export const clearAuth = () => async dispatch => dispatch(toClearData());
