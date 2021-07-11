import { Provider as AuthProvider } from 'next-auth/client';
import { FC, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
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
      console.log(user)
      if (user) dispatch(toChangeLoginStatus({ isLogined: true }));
      else if (!user) dispatch(toChangeLoginStatus({ isLogined: false }));
    });
  }, []);
  const isLoginedAndRouteISAuth =
    (isLogined && router.pathname === NEW_USER_URL) || (isLogined && router.pathname === SIGN_IN_URL);

  const isRouteIsAuth = router.pathname === SIGN_IN_URL || router.pathname === NEW_USER_URL;

  useEffect(() => {
    if (isLogined !== NONE && !isLogined && !isRouteIsAuth) {
      router.push(SIGN_IN_URL);
    } else if (isLoginedAndRouteISAuth) {
      router.push('/');
    }
  }, [isLogined, router.route]);
  const isChildrenVisible = isLoginedAndRouteISAuth || (isRouteIsAuth && !isLogined) || (isLogined && !isRouteIsAuth);
  // return <AuthProvider session={pageProps?.session}>{isChildrenVisible ? children : null}</AuthProvider>;
  return <AuthProvider session={pageProps?.session}>{children }</AuthProvider>;
};

export default AuthLayout;
