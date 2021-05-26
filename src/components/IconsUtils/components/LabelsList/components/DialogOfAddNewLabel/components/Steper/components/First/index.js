import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const FirstStepOfSteperOfDialogOfAddNewLabel = ({ value, onChange }) => {
  const textFieldProps = {
    required: true,
    label: 'Required',
    variant: 'outlined',
    color: 'secondary',
    value: value,
    onChange: onChange
  };

  return <TextField {...textFieldProps} />;
};

FirstStepOfSteperOfDialogOfAddNewLabel.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default FirstStepOfSteperOfDialogOfAddNewLabel;
