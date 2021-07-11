import { Grid, LinearProgress } from '@material-ui/core';
import AuthWithLocalPinCode from 'components/AuthWithLocalPinCode';
import { useLoading } from 'hooks/useLoading.hook';
import { ComposeLayouts } from 'layouts';
import DateLayout from 'layouts/DateLayout';
import DialogsLayout from 'layouts/DialogsLayout';
import FolderLayout from 'layouts/FolderLayout';
import MenuesLayout from 'layouts/MenuesLayout';
import { isEqual, startsWith } from 'lodash';
import { NEW_USER_URL, NONE, SIGN_IN_URL } from 'models/denotation';
import { useRouter } from 'next/dist/client/router';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getHeaderHeight,
  getIsAuthedWithLocalPassword,
  getUserData
} from 'store/modules/App/selectors';
import { SETTING_URL } from './denotation';
// import LogRocket from 'logrocket';
// LogRocket.init('b6se1p/pakeeps');

const RouterLayout: FC = ({ children }) => {
  const router = useRouter();
  const top = useSelector(getHeaderHeight);
  // const { isAuthedWithLocalPinCode, value } = useSelector(gethLocalPasswordPropetyies);
  
  const {localPinCode:value} = useSelector(getUserData);
  const isAuthedWithLocalPinCode  = useSelector(getIsAuthedWithLocalPassword);
  // const { isAuthedWithLocalPinCode, value } = { isAuthedWithLocalPinCode: '', value: '' };
  // || (!isAuthedWithLocalPinCode && value !== NONE)
  console.log(value, isAuthedWithLocalPinCode);
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

  const pakeepLayouts = [DateLayout, MenuesLayout, DialogsLayout, FolderLayout];

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
  const [pinCode, setPinCode] = useState<string>('');

  const authWithLocalPinCodeProps = { pinCode, setPinCode };

  return (
    <ComposeLayouts layouts={layouts}>
      {isLoading && (
        <Grid style={{ position: 'fixed', top, left: 0, right: 0, zIndex: 10000 }}>
          <LinearProgress color={'secondary'} />
        </Grid>
      )}

      {/* {!isAuthedWithLocalPinCode ? <AuthWithLocalPinCode {...authWithLocalPinCodeProps} /> : children} */}
      {children}
    </ComposeLayouts>
  );
};

export default RouterLayout;
