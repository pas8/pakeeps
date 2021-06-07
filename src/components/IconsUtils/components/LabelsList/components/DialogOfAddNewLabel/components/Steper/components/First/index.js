import { TextField } from '@material-ui/core';
import TitleChangerOfLabel from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/Menu/components/TitleChangerOfLabel';
import PropTypes from 'prop-types';

const FirstStepOfSteperOfDialogOfAddNewLabel = ({ value, onChange, customColor }) => {
  const textFieldProps = {
    value,

    customColor,
    onChange,
    color: 'secondary'
  };

  return <TitleChangerOfLabel {...textFieldProps} />;
};

FirstStepOfSteperOfDialogOfAddNewLabel.propTypes = {
  customColor: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default FirstStepOfSteperOfDialogOfAddNewLabel;
