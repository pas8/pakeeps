import '../styles/globals.css';
import { theme } from 'components/theme/index';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from '../src/store/index';
// import HeaderLayout from '';
import dynamic from 'next/dynamic';
const DynamicComponentWithNoSSR = dynamic(() => import('../src/layouts/index'), {
  ssr: false
});
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <DynamicComponentWithNoSSR>
          <Component {...pageProps} />
        </DynamicComponentWithNoSSR>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
