import { RootStoreType, ThunkType } from 'models/types';
import { Action } from 'redux';
// import { toChangeOneColorColumn, toChangeTwoColorColumn } from './actions';

import { ThunkAction } from 'redux-thunk';
import { AuthInitialStateType } from './types';
import firebase from 'firebase';
import { toChangeLoginStatus } from './actions';
import { TRANSPARENT } from 'models/denotation';
// export const changeOneColorColumnThunk = (columnId, newArr) => dispatch => {
//   dispatch(toChangeOneColorColumn(columnId, newArr));
// };

export type ParamsOfOperateToHandleRegisterType = { email: string; password: string; enqueueSnackbar: any };
export type OperateToHandleRegisterType = ThunkType<ParamsOfOperateToHandleRegisterType>;

export const operateToHandleRegister =
  ({ email, password, enqueueSnackbar }: ParamsOfOperateToHandleRegisterType): OperateToHandleRegisterType =>
  async dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        enqueueSnackbar({ message: 'You successfully creataed an acount' });
        // console.log(result);
        firebase
          .firestore()
          .collection('users')
          .doc(firebase?.auth()?.currentUser?.uid)
          .set({
            email,
            pakeeps: [],
            labels: [],
            events: [],
            avatarProperties: { url: 'none', borderRadius: 4, backgroundColor: TRANSPARENT },
            pakeepsOrderNames: []
          });
      })

      .catch(error => {
        // throw new Error(error);

        enqueueSnackbar({ message: error.message || 'Something went wrong', severity: 'error' });
      });
  };
export const operateToHandleSignIn =
  ({ email, password, enqueueSnackbar }: ParamsOfOperateToHandleRegisterType): OperateToHandleRegisterType =>
  async dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        enqueueSnackbar({ message: result + 'You successfully Log in' });
        console.log(result);

        // dispatch(toChangeLoginStatus({ isLogined: true }));
      })
      .catch(error => {
        enqueueSnackbar({ message: error.message || 'Something went wrong', severity: 'error' });
      });
  };

// export const changeTwoColorColumnThunk = (startColumn, finishColumn) => dispatch => {
//   dispatch(toChangeTwoColorColumn(startColumn, finishColumn));
// };
