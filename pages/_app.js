import '../styles/globals.css';
import { theme } from 'components/theme/index';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from '../src/store/index';
// import HeaderLayout from '';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import dynamic from 'next/dynamic';
const DynamicComponentWithNoSSR = dynamic(() => import('../src/layouts/index'), {
  ssr: false
});
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
          <DynamicComponentWithNoSSR>
            <Component {...pageProps} />
          </DynamicComponentWithNoSSR>
        </Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default MyApp;
