import { Grid } from '@material-ui/core';
import NewPakeep from 'components/NewPakeep';
import dynamic from 'next/dynamic';

const PakeepList = dynamic(() => import('components/PakeepList'), {
  loading: () => <p style={{ height: '100vh', width: '100vw' }}>Load</p>,
  // ssr: false
});

const Pakeeps = () => (
  <>
    <Grid container justify={'center'} alignItems={'center'}>
      <NewPakeep />
    </Grid>
    <PakeepList />
  </>
);

export default Pakeeps;
