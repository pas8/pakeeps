import PropTypes from 'prop-types';
import { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import { ComposeLayouts } from 'layouts';
// import LogRocket from 'logrocket';
import SnackBarLayout from 'layouts/SnackBarLayout';
import FolderLayout from 'layouts/FolderLayout';
import ThemeLayout from 'layouts/ThemeLayout';
import DateLayout from 'layouts/DateLayout';
import StoreLayout from 'layouts/StoreLayout';
import AuthLayout from 'layouts/AuthLayout';
import HeaderLayout from 'layouts/HeaderLayout';
import '../styles/globals.css';

// LogRocket.init('b6se1p/pakeeps');

const Index = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  const layouts = [StoreLayout, ThemeLayout, DateLayout, AuthLayout, SnackBarLayout, FolderLayout, HeaderLayout];

  return (
    <ComposeLayouts layouts={layouts} pageProps={pageProps}>
      <Component {...pageProps} />
    </ComposeLayouts>
  );
};
export default Index;
