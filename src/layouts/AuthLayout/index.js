import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Provider as AuthProvider } from 'next-auth/client';

const AuthLayout = ({ children,pageProps }) => {
  return <AuthProvider session={pageProps?.session}>{children}</AuthProvider>;
};

AuthLayout.propTypes = {
  childen: PropTypes.any,
  pageProps: PropTypes.shape({
    session: PropTypes.any
  })
}

export default AuthLayout;
