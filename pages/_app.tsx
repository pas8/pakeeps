import { FC } from 'react';
import { ComposeLayouts } from 'layouts';
import SnackBarLayout from 'layouts/SnackBarLayout';
import ThemeLayout from 'layouts/ThemeLayout';
import DateLayout from 'layouts/DateLayout';
import StoreLayout from 'layouts/StoreLayout';
import RouterLayout from 'layouts/RouterLayout';
import AuthLayout from 'layouts/AuthLayout';
import HeaderLayout from 'layouts/HeaderLayout';
import { useUploadThemeSsr } from 'hooks/useUploadThemeSsr.hook';
import { AppProps } from 'next/dist/next-server/lib/router/router';

const Index: FC<AppProps> = ({ Component, pageProps }) => {
  useUploadThemeSsr();

  const layouts = [StoreLayout, ThemeLayout, SnackBarLayout, AuthLayout, HeaderLayout, DateLayout, RouterLayout];

  return (
    <ComposeLayouts layouts={layouts} pageProps={pageProps}>
      <Component {...pageProps} />
    </ComposeLayouts>
  );
};
export default Index;
