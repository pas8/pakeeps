import { CircularProgress, Grid, GridProps } from '@material-ui/core';
import { FC } from 'react';

const CircularProgressLoader: FC<GridProps> = props => {
  return (
    <Grid container alignItems={'center'} justify={'center'} {...props}>
      <CircularProgress color={'primary'} />
    </Grid>
  );
};

export default CircularProgressLoader;
