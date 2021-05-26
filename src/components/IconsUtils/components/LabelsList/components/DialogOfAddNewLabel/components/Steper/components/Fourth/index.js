import { FormControlLabel, Switch } from '@material-ui/core';

const FourthStepOfSteperOfDialogOfAddNewLabel = switchProps => (
  <FormControlLabel control={<Switch {...switchProps} />} label={'Is label have icon? '} />
);

FourthStepOfSteperOfDialogOfAddNewLabel.propTypes = {};

export default FourthStepOfSteperOfDialogOfAddNewLabel;
