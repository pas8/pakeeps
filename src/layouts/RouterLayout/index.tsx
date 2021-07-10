import { Grid, LinearProgress } from '@material-ui/core';
import { useLoading } from 'hooks/useLoading.hook';
import { ComposeLayouts } from 'layouts';
import DateLayout from 'layouts/DateLayout';
import FolderLayout from 'layouts/FolderLayout';
import MenuesLayout from 'layouts/MenuesLayout';
import { isEqual, startsWith } from 'lodash';
import { NEW_USER_URL, SIGN_IN_URL } from 'models/denotation';
import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getHeaderHeight } from 'store/modules/App/selectors';
import { SETTING_URL } from './denotation';
// import LogRocket from 'logrocket';
// LogRocket.init('b6se1p/pakeeps');

const RouterLayout: FC = ({ children }) => {
  const router = useRouter();
  const top = useSelector(getHeaderHeight);

  // const isLoading = useLoading();
  const isLoading = false;

  const useCorrectLayoutCases = {
    BASE_URL: 'BASE_URL',
    FOLDER_LAYOUT_HIDDEN: 'FOLDER_LAYOUT_HIDDEN',
    SETTING_URL: 'SETTING_URL'
  };

  const property = isEqual(router.route, '/')
    ? useCorrectLayoutCases.BASE_URL
    : router.route === SIGN_IN_URL || router.route === NEW_USER_URL
    ? useCorrectLayoutCases.FOLDER_LAYOUT_HIDDEN
    : startsWith(router.route, SETTING_URL)
    ? useCorrectLayoutCases.SETTING_URL
    : '';

  const pakeepLayouts = [DateLayout, MenuesLayout, FolderLayout];

  const useCorrectLayout = (PROPERTY: string): any[] => {
    switch (PROPERTY) {
      case useCorrectLayoutCases.BASE_URL:
        return pakeepLayouts;

      case useCorrectLayoutCases.FOLDER_LAYOUT_HIDDEN:
        return [];

      default:
        return [FolderLayout];
    }
  };

  const layouts = useCorrectLayout(property);
  return (
    <ComposeLayouts layouts={layouts}>
      {isLoading && (
        <Grid style={{ position: 'fixed', top, left: 0, right: 0, zIndex: 10000 }}>
          <LinearProgress color={'secondary'} />
        </Grid>
      )}
      {children}
    </ComposeLayouts>
  );
};

export default RouterLayout;
