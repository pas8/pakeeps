import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Provider as AuthProvider } from 'next-auth/client';
import firebase from 'firebase';
import '@firebase/firestore';
import { FC, useEffect } from 'react';
import { firebaseConfig } from '../../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { getAnonymousStatus, getErrorMessage, getErrorStatus, getLoginedStatus } from 'store/modules/Auth/selectors';
import { useRouter } from 'next/dist/client/router';
import { NEW_USER_URL, NONE, SIGN_IN_URL } from 'models/denotation';
import { useSnackbar } from 'notistack';
import { toChangeUserData } from 'store/modules/App/actions';
import { getUserData } from 'store/modules/App/selectors';
import { toChangeLoginStatus } from 'store/modules/Auth/actions';

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const AuthLayout: FC<any> = ({ children, pageProps }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const isLogined = useSelector(getLoginedStatus);
  const isAnonymous = useSelector(getAnonymousStatus);
  const isError = useSelector(getErrorStatus);
  const errorMessage = useSelector(getErrorMessage);
  const userData = useSelector(getUserData);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar({ message: errorMessage || 'Something went wrong', severity: 'error' });
    }
  }, [isError, errorMessage]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch(toChangeUserData({ userData: { email: user?.email || NONE, name: 'ANY', userName: 'ANY' } }));
    });
  }, []);

  useEffect(() => {
    if (userData.email !== NONE) {
      dispatch(toChangeLoginStatus({ isLogined: true }));
    }
  }, [userData.email]);

  // useEffect(() => {
  //   if ((isAnonymous || isLogined) && (router.pathname === NEW_USER_URL || router.pathname === SIGN_IN_URL)) {
  //     router.push('/');
  //   }
  // }, [isAnonymous, isLogined, router.pathname]);

  useEffect(() => {
    // if ((!isAnonymous && !isLogined) && router.pathname !== NEW_USER_URL) {
    console.log(isLogined);

    if (!isLogined && router.pathname !== NEW_USER_URL) {
      console.log(router.pathname, isLogined);
      router.push(SIGN_IN_URL);
    } else if ((isLogined && router.pathname === NEW_USER_URL) || (isLogined && router.pathname === SIGN_IN_URL)) {
      router.push('/');
    }
  }, [isAnonymous, isLogined, router.pathname]);

  return <AuthProvider session={pageProps?.session}>{children}</AuthProvider>;
};

export default AuthLayout;
