import '../styles/globals.css';
import { theme } from 'components/theme/index';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from '../src/store/index';
// import HeaderLayout from '';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import dynamic from 'next/dynamic';
import LogRocket from 'logrocket';
import SnackBarLayout from 'layouts/SnackBarLayout';
const DynamicComponentWithNoSSR = dynamic(() => import('../src/layouts/HeaderLayout/index'), {
  ssr: false
});
// LogRocket.init('b6se1p/pakeeps');

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
          <SnackBarLayout>
            <DynamicComponentWithNoSSR>
              <Component {...pageProps} />
            </DynamicComponentWithNoSSR>
          </SnackBarLayout>
        </Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default MyApp;
