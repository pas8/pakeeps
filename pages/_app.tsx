import { FC, useEffect } from 'react';
import { LinearProgress, Grid } from '@material-ui/core';
import { ComposeLayouts } from 'layouts';
import SnackBarLayout from 'layouts/SnackBarLayout';
import FolderLayout from 'layouts/FolderLayout';
import ThemeLayout from 'layouts/ThemeLayout';
import DateLayout from 'layouts/DateLayout';
import StoreLayout from 'layouts/StoreLayout';
import AuthLayout from 'layouts/AuthLayout';
import HeaderLayout from 'layouts/HeaderLayout';
import MenuesLayout from 'layouts/MenuesLayout';
import { useLoading } from 'hooks/useLoading.hook';
import { useUploadThemeSsr } from 'hooks/useUploadThemeSsr.hook';
import { useRouter } from 'next/dist/client/router';
import { SIGN_IN_URL, NEW_USER_URL } from 'models/denotation';
// import LogRocket from 'logrocket';
// LogRocket.init('b6se1p/pakeeps');

const Index: FC<any> = ({ Component, pageProps }) => {
  useUploadThemeSsr();

  const router = useRouter();
  // const isLoading = useLoading();
  const isLoading = false;
  const isFolderLayoutHidden = router.route === SIGN_IN_URL || router.route === NEW_USER_URL;

  const defaultLayouts = [StoreLayout, ThemeLayout, SnackBarLayout, AuthLayout, DateLayout, MenuesLayout, HeaderLayout];
  const layouts = isFolderLayoutHidden ? defaultLayouts : [...defaultLayouts, FolderLayout];

  return (
    <ComposeLayouts layouts={layouts} pageProps={pageProps}>
      {isLoading && (
        <Grid style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 10000 }}>
          <LinearProgress color={'secondary'} />
        </Grid>
      )}
      <Component {...pageProps} />
    </ComposeLayouts>
  );
};
export default Index;
