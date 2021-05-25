import { RadioGroup, FormControlLabel, Radio ,Grid} from '@material-ui/core';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ThirdStepOfSteperOfDialogOfAddNewLabel = ({ value, onChange }) => {
  const radioGroupListArr = [
    { labelText: 'Default color', value: '' },
    { labelText: 'Primary color', value: 'primary' },
    { labelText: 'Secondary color', value: 'secondary' },
    { labelText: 'Custom color', value: 'custom', Component: Radio, componentProps: {} }
  ];

  return (
    <RadioGroup aria-label="gender" value={value} onChange={onChange}>
      {radioGroupListArr.map(({ labelText, value, Component, componentProps }) => {
        const formControlLabelProps = { value, control: <Radio />, label: labelText };

        return (
          <Grid key={nanoid()}>
            <FormControlLabel {...formControlLabelProps} />
          </Grid>
        );
      })}
    </RadioGroup>
  );
};

ThirdStepOfSteperOfDialogOfAddNewLabel.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default ThirdStepOfSteperOfDialogOfAddNewLabel;
