import { RadioGroup, FormControlLabel, Radio, Grid, makeStyles } from '@material-ui/core';
import { useAlpha } from 'hooks/useAlpha.hook';
import { UseStylesCustomColorType } from 'models/types';
import { FC } from 'react';
import { ThirdStepOfSteperOfDialogOfAddNewLabelPropsType } from '../../types';


const ThirdStepOfSteperOfDialogOfAddNewLabel: FC<ThirdStepOfSteperOfDialogOfAddNewLabelPropsType> = ({
  value,
  onChange,
  customColor,
  colorVariants
}) => {

  return (
    <RadioGroup value={value} onChange={onChange} >
      {colorVariants.map(({ labelText, value }, idx) => {
        const formControlLabelProps = { value, control: <Radio />, label: labelText };

        return (
          <Grid key={`${labelText}_${value}_${idx}`}>
            <FormControlLabel {...formControlLabelProps} />
          </Grid>
        );
      })}
    </RadioGroup>
  );
};

export default ThirdStepOfSteperOfDialogOfAddNewLabel;
