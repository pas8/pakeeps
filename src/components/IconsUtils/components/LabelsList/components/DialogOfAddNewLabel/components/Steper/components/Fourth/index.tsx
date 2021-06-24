import { FormControlLabel, Switch } from '@material-ui/core';
import { FC } from 'react';

const FourthStepOfSteperOfDialogOfAddNewLabel: FC<any> = switchProps => (
  <FormControlLabel control={<Switch {...switchProps} />} label={'Is label have icon? '} />
);

FourthStepOfSteperOfDialogOfAddNewLabel.propTypes = {};

export default FourthStepOfSteperOfDialogOfAddNewLabel;
