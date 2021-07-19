import { toAddNewPakeep } from './actions';
import { PakeepElementType } from 'store/modules/App/types';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { RootStoreType } from 'models/types';
import { ThunkAction } from 'redux-thunk';
import { DefaultFirebaseStateType } from '../Auth/operations';
import { useDispatch } from 'react-redux';
import { toChangeAllFirebaseAppState } from 'store/modules/App/actions';
import { colorInitialState } from 'store/modules/Color/reducers';
import { toChangeSettingProperty } from 'store/modules/Settings/actions';
import { settingsInitialState } from 'store/modules/Settings/reducers';
import { firebaseAppInitialState } from './reducers';
import { toChangeAllFirebaseColorState } from '../Color/actions';
import { toChangeErrorMessage, toChangeErrorStatus } from '../Auth/actions';
import { errorMessages } from 'models/denotation';
// import firebase from 'firebase/app';
// require('firebase/firestore');

export const operateToUploadData = (): ThunkAction<any, RootStoreType, unknown, any> => (dispatch, getState) => {
  const {
    app: { temporaryData, ...appData },
    color,
    settings
  } = getState();

  const data: DefaultFirebaseStateType = {
    app: { ...appData },
    color,
    settings
  };

  firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser?.uid)
    .set(data)
    .catch(e => {
      dispatch(toChangeErrorMessage({ errorMessage: e.message || errorMessages.CAN_NOT_UPLOAD_ALL_DATA_TRY_AGAIN }));
      dispatch(toChangeErrorStatus);
    });
};

export const operateToSetNullityStore = (): ThunkAction<any, RootStoreType, unknown, any> => (dispatch, getState) => {
  dispatch(
    toChangeAllFirebaseStoreState({
      color: colorInitialState,
      app: firebaseAppInitialState,
      settings: settingsInitialState
    })
  );
  // DefaultFirebaseStateType
};

export const operateToSetStoreOfFirebaseData =
  (): ThunkAction<any, RootStoreType, unknown, any> => async (dispatch, getState) => {
    const converter = {
      toFirestore: (data: DefaultFirebaseStateType) => data,
      fromFirestore: (snap: any) => snap.data() as DefaultFirebaseStateType
    };

    const doc = await firebase
      .firestore()
      .collection('users')
      .withConverter(converter)
      .doc(firebase?.auth()?.currentUser?.uid)
      .get();

    const allData = doc.data();

    if (!allData) return;

    dispatch(toChangeAllFirebaseStoreState(allData));
  };

export const toChangeAllFirebaseStoreState =
  ({ app, color, settings }: DefaultFirebaseStateType): ThunkAction<any, RootStoreType, unknown, any> =>
  (dispatch, getState) => {
    dispatch(toChangeAllFirebaseAppState({ firebaseState: app }));
    dispatch(toChangeAllFirebaseColorState({ firebaseState: color }));
    dispatch(toChangeSettingProperty({ property: settings }));
  };
