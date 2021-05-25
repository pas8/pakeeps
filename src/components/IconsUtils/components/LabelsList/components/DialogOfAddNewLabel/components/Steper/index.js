import PropTypes from 'prop-types';
import { makeStyles, Button, Stepper, StepLabel, StepContent, Step, Grid } from '@material-ui/core';
import { useCounter } from 'react-use';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    '& .MuiCollapse-wrapperInner': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  buttonContainer: {
    margin: spacing(0, 0, 0, 1),
    '& button': {
      float: 'right'
    }
  },
  componentContainer: {
    minWidth: spacing(32)
  }
}));
const SteperOfDialogOfAddNewLabel = ({ stepsArrOfDialogOfAddNewLabel }) => {
  const classes = useStyles();

  const [activeStep, { inc: incrementActiveStep, dec: decrimentActiveStep, set, reset }] = useCounter(0);

  return (
    <Grid className={classes.container}>
      <Stepper activeStep={activeStep} orientation={'vertical'}>
        {stepsArrOfDialogOfAddNewLabel.map(({ title, component: Component, componentProps }) => (
          <Step key={title}>
            <StepLabel>{title} </StepLabel>
            <StepContent>
              <Grid container className={classes.componentContainer}>
                <Component {...componentProps} />
              </Grid>
              <Grid container direction={'column'} className={classes.buttonContainer}>
                <Grid>
                  <Button disabled={activeStep === 0} onClick={() => decrimentActiveStep()} size={'small'}>
                    Back
                  </Button>
                </Grid>
                <Grid>
                  <Button color={'secondary'} onClick={() => incrementActiveStep()} size={'small'}>
                    {activeStep === stepsArrOfDialogOfAddNewLabel.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Grid>
  );
};

SteperOfDialogOfAddNewLabel.propTypes = {
  stepsArrOfDialogOfAddNewLabel: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  })
};

export default SteperOfDialogOfAddNewLabel;
