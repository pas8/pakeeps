import { $Values, Optional } from 'utility-types';
import { TypeNames } from './enums';

export type PayloadTypes = {
  [TypeNames.HANDLE_CHANGE_ANONYMOUS_STATUS]: {
    isAnonymous: boolean;
  };

  [TypeNames.HANDLE_CHANGE_LOGIN_STATUS]: {
    isLogined: boolean; 

  };
};

export type ActionsValueTypes = {
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
  isLogined: boolean;
  isAnonymous: boolean;
};

export type AuthActionTypes = $Values<ActionsValueTypes>;
