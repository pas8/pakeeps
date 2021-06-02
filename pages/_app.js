import PropTypes from 'prop-types';
import '../styles/globals.css';
import { theme } from 'components/theme/index';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as AuthProvider } from 'next-auth/client';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import dynamic from 'next/dynamic';
import LogRocket from 'logrocket';
import SnackBarLayout from 'layouts/SnackBarLayout';
import { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import store from 'store';
import ScrollLayout from 'layouts/ScrollLayout';
import FolderLayout from 'layouts/FolderLayout';

const DynamicComponentWithNoSSR = dynamic(() => import('../src/layouts/HeaderLayout/index'), {
  ssr: !false
});
// LogRocket.init('b6se1p/pakeeps');



const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);


  

  return (
    <ReduxProvider store={store}>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AuthProvider session={pageProps.session}>
            <ScrollLayout>
              <SnackBarLayout>
              <FolderLayout>
                <DynamicComponentWithNoSSR>
                  <CssBaseline />
                  <Component {...pageProps} />
                </DynamicComponentWithNoSSR>
                </FolderLayout>

              </SnackBarLayout>
            </ScrollLayout>
          </AuthProvider>
      </MuiPickersUtilsProvider>
    </ReduxProvider>

  );
};
export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};
