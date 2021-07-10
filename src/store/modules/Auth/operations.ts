import { RootStoreType, ThunkType } from 'models/types';
import { Action } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { toChangeErrorMessage, toChangeErrorStatus, toChangeLoginStatus } from './actions';
import { TRANSPARENT } from 'models/denotation';
import { settingsInitialState } from '../Settings/reducers';
import { firebaseAppInitialState } from '../App/reducers';

export type ParamsOfOperateToHandleRegisterType = { email: string; password: string };
export type OperateToHandleRegisterType = ThunkType<ParamsOfOperateToHandleRegisterType>;

export const defaultFirebaseState = {
  settings: settingsInitialState,
  app: firebaseAppInitialState
};

export const operateToHandleRegister =
  ({ email, password }: ParamsOfOperateToHandleRegisterType): OperateToHandleRegisterType =>
  async dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        firebase.firestore().collection('users').doc(firebase?.auth()?.currentUser?.uid).set(defaultFirebaseState);
      })

      .catch(error => {
        // throw new Error(error);
        //@ts-ignore
        dispatch(toChangeErrorStatus({ isError: true }));
        //@ts-ignore
        dispatch(toChangeErrorMessage({ errorMessage: error?.message }));
      });
  };
export const operateToHandleSignIn =
  ({ email, password }: ParamsOfOperateToHandleRegisterType): OperateToHandleRegisterType =>
  async dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        // dispatch()
        console.log(firebase?.auth()?.currentUser?.uid)
        // firebase
        //   .firestore()
        //   .collection('users')
        //   .doc(firebase?.auth()?.currentUser?.uid)
        //   .get()
        //   .then(r => {
        //     console.log(r);
        //   });

        // dispatch(toChangeLoginStatus({ isLogined: true }));
      })
      .catch(error => {
        //@ts-ignore
        dispatch(toChangeErrorStatus({ isError: true }));
        //@ts-ignore
        dispatch(toChangeErrorMessage({ errorMessage: error?.message }));
      });
  };

// export const changeTwoColorColumnThunk = (startColumn, finishColumn) => dispatch => {
//   dispatch(toChangeTwoColorColumn(startColumn, finishColumn));
// };
