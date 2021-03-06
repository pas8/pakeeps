import { TypeNames } from './enums';
import { AuthActionTypes, PayloadTypes } from './types';

export const toChangeAnonymousStatus = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS]
): AuthActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS,
  payload
});

export const toChangeLoginStatus = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_LOGIN_STATUS]): AuthActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_LOGIN_STATUS,
  payload
});
export const toChangeErrorStatus = (payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ERROR_STATUS]): AuthActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_ERROR_STATUS,
  payload
});

export const toChangeErrorMessage = (
  payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ERROR_MESSAGE]
): AuthActionTypes => ({
  type: TypeNames.HANDLE_CHANGE_ERROR_MESSAGE,
  payload
});
