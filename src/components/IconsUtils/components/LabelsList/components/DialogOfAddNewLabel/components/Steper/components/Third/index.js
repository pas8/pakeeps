import { RadioGroup, FormControlLabel, Radio, Grid } from '@material-ui/core';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ThirdStepOfSteperOfDialogOfAddNewLabel = ({ value, onChange, colorVariants }) => (
  <RadioGroup  value={value} onChange={onChange}>
    {colorVariants.map(({ labelText, value }) => {
      const formControlLabelProps = { value, control: <Radio />, label: labelText };

      return (
        <Grid key={nanoid()}>
          <FormControlLabel {...formControlLabelProps} />
        </Grid>
      );
    })}
  </RadioGroup>
);

ThirdStepOfSteperOfDialogOfAddNewLabel.propTypes = {
  colorVariants: PropTypes.shape({
    map: PropTypes.func
  }),
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default ThirdStepOfSteperOfDialogOfAddNewLabel;
