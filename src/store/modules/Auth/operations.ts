import { RootStoreType } from 'models/types';
import { Action } from 'redux';
// import { toChangeOneColorColumn, toChangeTwoColorColumn } from './actions';

import { ThunkAction } from 'redux-thunk';
import { AuthInitialStateType } from './types';
import firebase from 'firebase';
// export const changeOneColorColumnThunk = (columnId, newArr) => dispatch => {
//   dispatch(toChangeOneColorColumn(columnId, newArr));
// };
export type ParamsOfOperateToHandleRegisterType = { email: string; password: string; enqueueSnackbar: any };
export type OperateToHandleRegisterType = ThunkAction<
  any,
  RootStoreType,
  null,
  Action<ParamsOfOperateToHandleRegisterType>
>;

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
            email: email,
            avatar: 'none'
          })

        //  dispatch(toChange) 
      })

      .catch(error => {
        enqueueSnackbar({ message: error.message || 'Something went wrong', severity: 'error' });
      });
  };

// export const changeTwoColorColumnThunk = (startColumn, finishColumn) => dispatch => {
//   dispatch(toChangeTwoColorColumn(startColumn, finishColumn));
// };
