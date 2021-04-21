import '../styles/globals.css';
import { theme } from 'components/theme/index';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import HeaderLayout from '../src/layouts/index';
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HeaderLayout>
          <Component {...pageProps} />
        </HeaderLayout>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
