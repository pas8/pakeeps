import { Grid, CircularProgress } from '@material-ui/core';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { getAnonymousStatus, getLoginedStatus } from 'store/modules/Auth/selectors';
import { getIsAuthedWithLocalPassword } from 'store/modules/App/selectors';

const PakeepList = dynamic(() => import('components/PakeepList'), {
  loading: () => (
    <Grid style={{ height: '80vh', width: '90vw' }} container alignItems={'center'} justify={'center'}>
      <CircularProgress />
    </Grid>
  )
});

const NewPakeep = dynamic(() => import('components/NewPakeep'), {});

const Pakeeps: FC = () => {
  const isLogined = useSelector(getLoginedStatus);
  const isAnonymous = useSelector(getAnonymousStatus);

  if (!isLogined) return null;

  return (
    <>
      <Grid container justify={'center'} alignItems={'center'}>
        <NewPakeep />
      </Grid>
      <PakeepList />
    </>
  );
};

export default Pakeeps;
