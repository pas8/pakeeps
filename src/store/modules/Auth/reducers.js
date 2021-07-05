import { createReducer } from 'store/utils';
import * as types from './types';

const platformInitState = {
  userInfo: {
    id: null
  },
  isLoaded: false,
  isFetching: false,
  isLogin: false,
  isRegister: false,
  isForgotPassword: false,
  isResetPassword: false,
  isRefreshToken: false,
  isError: false,
  error: null
};

const authReducer = createReducer(platformInitState)({
  [types.PAGE_LOADED]: state => ({
    ...state,
    isLoaded: true
  }),
  [types.AUTHENTICATED]: state => ({
    ...state,
    isLogin: true
  }),
  [types.UPDATE_USER]: (state, { payload }) => ({
    ...state,
    userInfo: { ...state.userInfo, ...payload }
  }),
  [types.UNAUTHENTICATED]: state => ({
    ...state,
    isLogin: false
  }),
  [types.REGISTERED]: state => ({
    ...state,
    isLogin: true,
    isRegister: true
  }),
  [types.REFRESH_TOKEN]: state => ({
    ...state,
    isRefreshToken: true
  }),
  [types.AUTHENTICATION_ERROR]: (state, { payload }) => ({
    ...state,
    isError: true,
    error: payload
  }),
  [types.FORGOT_PASSWORD]: state => ({
    ...state,
    isForgotPassword: true
  }),
  [types.RESET_PASSWORD]: state => ({
    ...state,
    isResetPassword: true
  }),
  [types.CLEAR_ERROR]: state => ({
    ...state,
    isError: false,
    error: null
  }),
  [types.CLEAR_DATA]: state => ({
    ...state,
    ...platformInitState
  })
});

export default authReducer;
