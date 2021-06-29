import { FC } from 'react';
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
import '../styles/globals.css';
// import LogRocket from 'logrocket';
// LogRocket.init('b6se1p/pakeeps');

const Index: FC<any> = ({ Component, pageProps }) => {
  useUploadThemeSsr();

  const loading = useLoading();

  const layouts = [
    StoreLayout,
    ThemeLayout,
    DateLayout,
    AuthLayout,
    SnackBarLayout,
    MenuesLayout,
    FolderLayout,
    HeaderLayout
  ];
  // const layouts = [StoreLayout,ThemeLayout];

  return (
    <ComposeLayouts layouts={layouts} pageProps={pageProps}>
      {loading && (
        <Grid style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 10000 }}>
          <LinearProgress color={'secondary'}/>
        </Grid>
      )}
      <Component {...pageProps} />
    </ComposeLayouts>
  );
};
export default Index;
