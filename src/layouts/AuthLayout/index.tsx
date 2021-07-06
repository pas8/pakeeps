import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Provider as AuthProvider } from 'next-auth/client';
import firebase from 'firebase';
import '@firebase/firestore';
import { FC, useEffect } from 'react';
import { firebaseConfig } from '../../../firebaseConfig';

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const AuthLayout: FC<any> = ({ children, pageProps }) => {
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
