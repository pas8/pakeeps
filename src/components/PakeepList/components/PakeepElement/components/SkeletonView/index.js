import { Grid, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { random } from 'lodash';

const SkeletonView = () => (
  <>
    <Skeleton height={92} variant={'text'} width={`${random(60, 80)}%`} animation={'wave'} />
    <Skeleton variant="rect" height={random(96, 240)} width={'92%'} animation={'wave'} />
    <Grid container>
      <Box width={`${random(24, 42)}%`}>
        <Skeleton variant={'text'} height={42} animation={'wave'} />
      </Box>
      <Box width={`${random(32, 42)}%`} ml={1.8}>
        <Skeleton variant={'text'} height={42} animation={'wave'} />
      </Box>
    </Grid>
    <Box display={'flex'} mt={-0.8}>
      <Box width={`${random(16, 24)}%`}>
        <Skeleton variant={'text'} height={42} animation={'wave'} />
      </Box>
      <Box width={`${random(42, 60)}%`} ml={1.8}>
        <Skeleton variant={'text'} height={42} animation={'wave'} />
      </Box>
    </Box>
  </>
);

export default SkeletonView;
