import { RadioGroup, FormControlLabel, Radio, Grid } from '@material-ui/core';
import { nanoid } from 'nanoid';
import { FC } from 'react';
import { ThirdStepOfSteperOfDialogOfAddNewLabelPropsType } from '../../types';

const ThirdStepOfSteperOfDialogOfAddNewLabel: FC<ThirdStepOfSteperOfDialogOfAddNewLabelPropsType> = ({
  value,
  onChange,
  colorVariants
}) => (
  <RadioGroup value={value} onChange={onChange}>
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

export default ThirdStepOfSteperOfDialogOfAddNewLabel;
