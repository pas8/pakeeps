import { useState } from 'react';
import { Dialog, Grid, makeStyles } from '@material-ui/core';
import _ from 'lodash';
import CustomColor from './components/CustomColor';
import CustomGradient from './components/CustomGradient';

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

const ColorPickerByPas = () => {
  const [gradientStatus, setGradientStatus] = useState(!false);
  const classes = useStyles();
  const Container = gradientStatus ? Dialog : Grid;
  return (
    <Container open={gradientStatus} maxWidth={'lg'} className={classes.container}>
      <Grid container direction={gradientStatus ? 'row' : 'column'}>
        {!gradientStatus ? (
          <CustomColor gradientStatus={gradientStatus} setGradientStatus={setGradientStatus} />
        ) : (
          <CustomGradient gradientStatus={gradientStatus} setGradientStatus={setGradientStatus} />
        )}
      </Grid>
    </Container>
  );
};

export default ColorPickerByPas;
