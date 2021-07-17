import { FormControlLabel, Switch } from '@material-ui/core';
import { FC } from 'react';

const FirstStepOfSteperOfDialogOfAddNewGlobalEvent: FC<any> = switchProps => (
  <FormControlLabel control={<Switch {...switchProps} />} label={'Is event have only time '} />
);

export default FirstStepOfSteperOfDialogOfAddNewGlobalEvent;
