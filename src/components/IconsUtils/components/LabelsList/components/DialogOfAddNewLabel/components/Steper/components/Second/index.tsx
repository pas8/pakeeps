import { FormControlLabel, Switch } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FC } from 'react';

const SecondStepOfSteperOfDialogOfAddNewLabel: FC<any> = switchProps => (
  <FormControlLabel control={<Switch {...switchProps} />} label={'Is variant Outlined? '} />
);

export default SecondStepOfSteperOfDialogOfAddNewLabel;
