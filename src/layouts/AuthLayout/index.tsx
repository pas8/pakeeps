import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Provider as AuthProvider } from 'next-auth/client';
import firebase from 'firebase';
import '@firebase/firestore';
import { FC, useEffect } from 'react';
import { firebaseConfig } from '../../../firebaseConfig';
import { useSelector } from 'react-redux';
import { getAnonymousStatus, getLoginedStatus } from 'store/modules/Auth/selectors';
import { useRouter } from 'next/dist/client/router';
import { NEW_USER_URL, SIGN_IN_URL } from 'models/denotation';

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const AuthLayout: FC<any> = ({ children, pageProps }) => {
  const isLogined = useSelector(getLoginedStatus);
  const isAnonymous = useSelector(getAnonymousStatus);
  const router = useRouter();
  // useEffect(() => {
  //   if ((!isAnonymous || !isLogined) && router.pathname !== NEW_USER_URL) {
  //     console.log(router.pathname)
  //     router.push(SIGN_IN_URL);
  //   }
  // }, [isAnonymous, isLogined, router.pathname]);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
      }),
    []
  );

  return <AuthProvider session={pageProps?.session}>{children}</AuthProvider>;
};

export default AuthLayout;
