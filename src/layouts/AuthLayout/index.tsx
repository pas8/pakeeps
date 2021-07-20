import { Provider as AuthProvider } from 'next-auth/client';
import { FC, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAnonymousStatus, getErrorMessage, getErrorStatus, getLoginedStatus } from 'store/modules/Auth/selectors';
import { useRouter } from 'next/dist/client/router';
import { LOCAL_STORAGE_KEY, NEW_USER_URL, NONE, SIGN_IN_URL } from 'models/denotation';
import { useSnackbar } from 'notistack';
import { useLocalStorage } from 'react-use';
import { toChangeAvatarProperties, toChangeUserData } from 'store/modules/App/actions';
import { getAllFirebaseData, getUserData } from 'store/modules/App/selectors';
import { toChangeAnonymousStatus, toChangeLoginStatus } from 'store/modules/Auth/actions';
import { useCookie, useNetworkState, usePageLeave } from 'react-use';
import {
  operateToSetStoreOfFirebaseData,
  operateToUploadData,
  toChangeAllFirebaseStoreState
} from 'store/modules/App/operations';
import { defaultFirebaseState } from 'store/modules/Auth/operations';
import { startsWith } from 'lodash';
import { defaultAvatarProperties } from 'store/modules/App/reducers';
import { AUTH_BASE_URL } from 'layouts/RouterLayout/denotation';

if (firebase.apps.length === 0)
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  });

const AuthLayout: FC<any> = ({ children, pageProps }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const isLogined = useSelector(getLoginedStatus);
  const isAnonymous = useSelector(getAnonymousStatus);
  const isError = useSelector(getErrorStatus);
  const errorMessage = useSelector(getErrorMessage);
  const userData = useSelector(getUserData);

  const allFirebaseData = useSelector(getAllFirebaseData);
  const [value, setValue] = useLocalStorage(LOCAL_STORAGE_KEY, defaultFirebaseState);
  const { online } = useNetworkState();
  // console.log(value)
  const [isleavead, setIsleavead] = useState(false);

  usePageLeave(() => {
    setIsleavead(true);
  });

  useEffect(() => {
    if (!isleavead) return;

    dispatch(operateToUploadData());
    setValue(allFirebaseData);
    setIsleavead(false);
  }, [isleavead]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar({ message: errorMessage || 'Something went wrong', severity: 'error' });
    }
  }, [isError, errorMessage]);
  debugger;
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user ) return dispatch(toChangeLoginStatus({ isLogined: false }));
      if (!user.isAnonymous) {
        dispatch(
          // toChangeAvatarProperties({ avatarProperties: { ...defaultAvatarProperties, url: user.photoURL || NONE } })
          toChangeAvatarProperties({ avatarProperties: { ...defaultAvatarProperties, } })
        );
        dispatch(
          toChangeUserData({
            userData: { email: user.email || NONE, name: user.displayName || NONE, isEmailVerified: user.emailVerified }
          })  
        );
      } else dispatch(toChangeAnonymousStatus({ isAnonymous: user.isAnonymous }));

      dispatch(toChangeLoginStatus({ isLogined: true }));
      if (online && !user.isAnonymous) return dispatch(operateToSetStoreOfFirebaseData());
      dispatch(toChangeAllFirebaseStoreState(value!));
    });
  }, []);
  const isLoginedAndRouteISAuth = router.pathname ===  AUTH_BASE_URL && isLogined

  const isRouteIsAuth = startsWith(router.pathname, AUTH_BASE_URL);

  useEffect(() => {
    if (isLogined !== NONE && !isLogined && !isRouteIsAuth) {
      router.push(SIGN_IN_URL);
    } else if (isLoginedAndRouteISAuth) {
      router.push('/');
    }
  }, [isLogined, router.route]);


  const isChildrenVisible = isLoginedAndRouteISAuth || (isRouteIsAuth && !isLogined) || (isLogined && !isRouteIsAuth);
  // return <AuthProvider session={pageProps?.session}>{isChildrenVisible ? children : null}</AuthProvider>;
  return <AuthProvider session={pageProps?.session}>{children}</AuthProvider>;
};

export default AuthLayout;
