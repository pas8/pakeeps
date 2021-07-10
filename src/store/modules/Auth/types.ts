import { NONE } from 'models/denotation';
import { $Values, Optional } from 'utility-types';
import { TypeNames } from './enums';

export type PayloadTypes = {
  [TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS]: {
    isAnonymous: boolean;
  };

  [TypeNames.HANDLE_CHANGE_LOGIN_STATUS]: {
    isLogined: boolean;
  };

  [TypeNames.HANDLE_CHANGE_ERROR_STATUS]: {
    isError: boolean;
  };
  [TypeNames.HANDLE_CHANGE_ERROR_MESSAGE]: {
    errorMessage: string;
  };
};

export type ActionsValueTypes = {

  toChangeErrorStatus: {
    type: typeof TypeNames.HANDLE_CHANGE_ERROR_STATUS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ERROR_STATUS];
  };
  toChangeErrorMessage: {
    type: typeof TypeNames.HANDLE_CHANGE_ERROR_MESSAGE;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ERROR_MESSAGE];
  };

  toChangeAnonymousStatus: {
    type: typeof TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS];
  };
  tpChangeLoginStatus: {
    type: typeof TypeNames.HANDLE_CHANGE_LOGIN_STATUS;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_LOGIN_STATUS];
  };
};

export type AuthInitialStateType = {
  isLogined: boolean | typeof NONE;
  isError: boolean;
  errorMessage: string;
  isAnonymous: boolean;
};

export type AuthActionTypes = $Values<ActionsValueTypes>;
