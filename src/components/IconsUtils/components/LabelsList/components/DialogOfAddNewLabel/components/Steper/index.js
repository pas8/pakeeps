import PropTypes from 'prop-types';
import { makeStyles, Button, Stepper, StepLabel, StepContent, Step } from '@material-ui/core';
import { useCounter } from 'react-use';

const useStyles = makeStyles(theme => ({}));

const SteperOfDialogOfAddNewLabel = ({ stepsArrOfDialogOfAddNewLabel }) => {
  const classes = useStyles();

  const [activeStep, { inc: incrementActiveStep, dec: decrimentActiveStep, set, reset }] = useCounter(0);

  return (
    <Stepper activeStep={activeStep} orientation={'vertical'}>
      {stepsArrOfDialogOfAddNewLabel.map(({ title, component }) => (
        <Step key={title}>
          <StepLabel>{title} </StepLabel>
          <StepContent>
            {component}
            <Button disabled={activeStep === 0} onClick={() => decrimentActiveStep()}>
              Back
            </Button>
            <Button color={'primary'} onClick={() => incrementActiveStep()}>
              {activeStep === stepsArrOfDialogOfAddNewLabel.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

SteperOfDialogOfAddNewLabel.propTypes = {
  stepsArrOfDialogOfAddNewLabel: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  })
};

export default SteperOfDialogOfAddNewLabel;
