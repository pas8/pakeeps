import _ from 'lodash';
import { RootStoreType } from 'models/types';
import { createSelector } from 'reselect';

export const getAnonymousStatus = createSelector(
  [({ auth: { isAnonymous } }: RootStoreType) => isAnonymous],
  isAnonymous => isAnonymous
);

export const getLoginedStatus = createSelector(
  [({ auth: { isLogined } }: RootStoreType) => isLogined],
  isLogined => isLogined
);

export const getErrorStatus = createSelector([({ auth: { isError } }: RootStoreType) => isError], isError => isError);
export const getErrorMessage = createSelector(
  [({ auth: { errorMessage } }: RootStoreType) => errorMessage],
  errorMessage => errorMessage
);
