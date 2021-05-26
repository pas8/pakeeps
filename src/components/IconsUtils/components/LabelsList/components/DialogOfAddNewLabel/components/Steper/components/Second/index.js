import { FormControlLabel, Switch } from '@material-ui/core';
import PropTypes from 'prop-types';

const SecondStepOfSteperOfDialogOfAddNewLabel = switchProps => (
  <FormControlLabel control={<Switch {...switchProps} />} label={'Is variant Outlined? '} />
);

SecondStepOfSteperOfDialogOfAddNewLabel.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool
};

export default SecondStepOfSteperOfDialogOfAddNewLabel;
