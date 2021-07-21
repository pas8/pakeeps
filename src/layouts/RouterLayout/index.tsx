import { Grid, LinearProgress, Grow } from '@material-ui/core';
import AuthWithLocalPinCode from 'components/AuthWithLocalPinCode';
import { useCorrectLayout } from 'hooks/useCorrectLayout.hook';
import { useLoading } from 'hooks/useLoading.hook';
import { ComposeLayouts } from 'layouts';

import { isEqual, startsWith } from 'lodash';
import { NEW_USER_URL, NONE, SIGN_IN_URL } from 'models/denotation';
import { useRouter } from 'next/dist/client/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { getHeaderHeight, getIsAuthedWithLocalPassword, getUserData } from 'store/modules/App/selectors';
// import LogRocket from 'logrocket';
// LogRocket.init('b6se1p/pakeeps');

const RouterLayout: FC = ({ children }) => {
  const top = useSelector(getHeaderHeight);
  const dispatch = useDispatch();
  const { isLoading, loadingValue } = useLoading();

  const { localPinCode: value, ...all } = useSelector(getUserData);
  const isAuthedWithLocalPinCode = useSelector(getIsAuthedWithLocalPassword);

  const layouts = useCorrectLayout();
  const [pinCode, setPinCode] = useState<string>('');

  useEffect(() => {
    const isTheSame = value === pinCode;
    const isValueNone = value === 'none'

    if (isValueNone) {
      dispatch(toChangeTemporaryData({ newTemporaryData: { isAuthedWithLocalPinCode: true } }));
      return;
    }

    if (isTheSame) {
      dispatch(toChangeTemporaryData({ newTemporaryData: { isAuthedWithLocalPinCode: true } }));
      setPinCode('');
      return;
    }
  }, [value, pinCode, isAuthedWithLocalPinCode]);

  const authWithLocalPinCodeProps = { pinCode, setPinCode, isHaveTitle: true };

  return (
    <ComposeLayouts layouts={!isAuthedWithLocalPinCode ? [] : layouts}>
      <Grow in={isLoading} timeout={100}>
        <Grid style={{ position: 'fixed', top: top - 16, left: 0, right: 0, zIndex: 10000 }}>
          <LinearProgress color={'secondary'} variant={'determinate'} value={loadingValue} />
        </Grid>
      </Grow>

      <Grid style={{ height: `calc(100vh - ${top}px` }}>
        {!isAuthedWithLocalPinCode && value !== NONE ? (
          <AuthWithLocalPinCode {...authWithLocalPinCodeProps} />
        ) : (
          children
        )}
      </Grid>
    </ComposeLayouts>
  );
};

export default RouterLayout;
