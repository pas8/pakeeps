import { SettingsInitialStateType } from './../Settings/types';
import { RootStoreType } from 'models/types';
import { Action } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { toChangeErrorMessage, toChangeErrorStatus, toChangeLoginStatus } from './actions';
import { TRANSPARENT } from 'models/denotation';
import { settingsInitialState } from '../Settings/reducers';
import { firebaseAppInitialState } from '../App/reducers';
import { ThunkAction } from 'redux-thunk';
import { InitialiAppFirebaseData } from '../App/types';
import { ColorInitialStateType } from '../Color/types';

export type ParamsOfOperateToHandleRegisterType = { email: string; password: string };
export type OperateToHandleRegisterType = ThunkAction<any, RootStoreType, unknown, any>;

export const defaultFirebaseState = {
  settings: settingsInitialState,
  app: firebaseAppInitialState
};

export type DefaultFirebaseStateType = {
  settings: SettingsInitialStateType;
  app: InitialiAppFirebaseData;
  color: ColorInitialStateType;
};

// const changePassword = (currentPassword, newPassword) => {
//   this.reauthenticate(currentPassword).then(() => {
//     var user = firebase.auth().currentUser;
//     user.updatePassword(newPassword).then(() => {
//       console.log("Password updated!");
//     }).catch((error) => { console.log(error); });
//   }).catch((error) => { console.log(error); });
// }
// const changeEmail = (currentPassword, newEmail) => {
//   this.reauthenticate(currentPassword).then(() => {
//     var user = firebase.auth().currentUser;
//     user.updateEmail(newEmail).then(() => {
//       console.log("Email updated!");
//     }).catch((error) => { console.log(error); });
//   }).catch((error) => { console.log(error); });
// }

export const operateToHandleRegister =
  ({ email, password }: ParamsOfOperateToHandleRegisterType): OperateToHandleRegisterType =>
  async (dispatch: any) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        result?.user?.sendEmailVerification();
        firebase.firestore().collection('users').doc(firebase?.auth()?.currentUser?.uid).set(defaultFirebaseState);
      })

      .catch(error => {
        dispatch(toChangeErrorStatus({ isError: true }));
        dispatch(toChangeErrorMessage({ errorMessage: error?.message }));
      });
  };
export const operateToHandleSignIn =
  ({ email, password }: ParamsOfOperateToHandleRegisterType): OperateToHandleRegisterType =>
  async (dispatch: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        // dispatch()
        console.log(firebase?.auth()?.currentUser?.uid);
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
