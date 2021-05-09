import { Grid } from '@material-ui/core';
import PakeepList from 'components/PakeepList';
import NewPakeep from 'components/NewPakeep';

const Pakeeps = () => (
  <>
    <Grid container justify={'center'} alignItems={'center'}>
      <NewPakeep />
    </Grid>
    <PakeepList />
  </>
);

export default Pakeeps;
