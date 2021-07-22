import { useState, FC } from 'react';
import { CircularProgress, Dialog, Grid, makeStyles } from '@material-ui/core';
// import CustomGradient from './components/CustomGradient';
import dynamic from 'next/dynamic';
import { ColorPickerByPasPropsType } from './types';

const CustomColor = dynamic(() => import('./components/CustomColor'), {
  loading: () => <CircularProgress />
});

const useStyles = makeStyles(({ transitions, spacing }) => ({
  container: {
    transition: transitions.create('all', {
      easing: transitions.easing.easeIn,
      duration: transitions.duration.complex
    }),
    paddingBottom: spacing(0.4),
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '80vw'
    }
  }
}));

const ColorPickerByPas: FC<ColorPickerByPasPropsType> = ({ handleSave, customColor }) => {
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
        <></>
        // <CustomGradient gradientStatus={gradientStatus} setGradientStatus={setGradientStatus} />
      )}
    </Container>
  );
};

export default ColorPickerByPas;
