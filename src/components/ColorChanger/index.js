import PropTypes from 'prop-types';
import { useState } from 'react';
import { CircularProgress, Dialog, Grid, makeStyles } from '@material-ui/core';
import _ from 'lodash';
// import CustomColor from './components/CustomColor';
import CustomGradient from './components/CustomGradient';

import dynamic from 'next/dynamic';
import { Skeleton } from '@material-ui/lab';

const CustomColor = dynamic(() => import('./components/CustomColor'), {
  loading: () => (
    <Grid style={{ width: '200px', height: '300px' }}>
      <CircularProgress color={'secondary'} />
    </Grid>
  )
});

const useStyles = makeStyles(theme => ({
  container: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    }),
    paddingBottom: theme.spacing(0.4),
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '80vw'
    }
    // overflowX: 'hidden'
  }
}));

const ColorPickerByPas = ({ handleSave, customColor }) => {
  const [gradientStatus, setGradientStatus] = useState(false);
  const classes = useStyles();
  const Container = gradientStatus ? Dialog : Grid;
  return (
    <Container open={gradientStatus} maxWidth={'lg'} className={classes.container}>
      {!gradientStatus ? (
        <CustomColor
          gradientStatus={gradientStatus}
          setGradientStatus={setGradientStatus}
          handleSave={handleSave}
          customColor={customColor}
        />
      ) : (
        <CustomGradient gradientStatus={gradientStatus} setGradientStatus={setGradientStatus} />
      )}
    </Container>
  );
};

export default ColorPickerByPas;
