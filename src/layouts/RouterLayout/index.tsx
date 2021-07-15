import { Grid, LinearProgress } from '@material-ui/core';
import AuthWithLocalPinCode from 'components/AuthWithLocalPinCode';
import { useCorrectLayout } from 'hooks/useCorrectLayout.hook';
import { useLoading } from 'hooks/useLoading.hook';
import { ComposeLayouts } from 'layouts';

import { isEqual, startsWith } from 'lodash';
import { NEW_USER_URL, NONE, SIGN_IN_URL } from 'models/denotation';
import { useRouter } from 'next/dist/client/router';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { getHeaderHeight, getIsAuthedWithLocalPassword, getUserData } from 'store/modules/App/selectors';
// import LogRocket from 'logrocket';
// LogRocket.init('b6se1p/pakeeps');

const RouterLayout: FC = ({ children }) => {
  const top = useSelector(getHeaderHeight);
  // const { isAuthedWithLocalPinCode, value } = useSelector(gethLocalPasswordPropetyies);

  const { localPinCode: value } = useSelector(getUserData);
  const isAuthedWithLocalPinCode = useSelector(getIsAuthedWithLocalPassword);
  // const { isAuthedWithLocalPinCode, value } = { isAuthedWithLocalPinCode: '', value: '' };
  // || (!isAuthedWithLocalPinCode && value !== NONE)
  console.log(value, isAuthedWithLocalPinCode);
  // const isLoading = useLoading();
  const isLoading = false;

  const layouts = useCorrectLayout();
  const [pinCode, setPinCode] = useState<string>('');

  const authWithLocalPinCodeProps = { pinCode, setPinCode };

  return (
    <ComposeLayouts layouts={layouts}>
      {isLoading && (
        <Grid style={{ position: 'fixed', top, left: 0, right: 0, zIndex: 10000 }}>
          <LinearProgress color={'secondary'} />
        </Grid>
      )}

      {!isAuthedWithLocalPinCode ? <AuthWithLocalPinCode {...authWithLocalPinCodeProps} /> : children}
    </ComposeLayouts>
  );
};

export default RouterLayout;
