import PropTypes from 'prop-types';
import '../styles/globals.css';
import { theme } from 'components/theme/index';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../src/store/index';
// import HeaderLayout from '';
import { Provider as AuthProvider } from 'next-auth/client';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import dynamic from 'next/dynamic';
import LogRocket from 'logrocket';
import SnackBarLayout from 'layouts/SnackBarLayout';
import { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';

const DynamicComponentWithNoSSR = dynamic(() => import('../src/layouts/HeaderLayout/index'), {
  ssr: !false
});
// LogRocket.init('b6se1p/pakeeps');

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    console.log(jssStyles)

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ReduxProvider store={store}>
          <AuthProvider session={pageProps.session}>
            <SnackBarLayout>
              <DynamicComponentWithNoSSR>
                <CssBaseline />
                <Component {...pageProps} />
              </DynamicComponentWithNoSSR>
            </SnackBarLayout>
          </AuthProvider>
        </ReduxProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};
