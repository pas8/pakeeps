import { FC, useState } from 'react';
import { Grid } from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { useStyles } from 'components/IconsUtils/components/AddDateToPakeep/components/DynamicComponents/components/DynamicInputDateAndTimePickers';
import { SecondStepOfSteperOfDialogOfAddNewGlobalEventPropsType } from './types';
import format from 'date-fns/format';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const SecondStepOfSteperOfDialogOfAddNewGlobalEvent: FC<SecondStepOfSteperOfDialogOfAddNewGlobalEventPropsType> = ({
  color,

  ...props
}) => {
  const classes = useStyles({
    customColor: {
      ...props.customColor,
      bgHover: props.customColor.hover,
      hover: props.customColor.bgUnHover,
      unHover: props.customColor.secondaryColor,
      bgUnHover: props.customColor.bgUnHover
    },
    error: props.error,
    isSizeSmaller: true,
    color
  });

  const [value, setValue] = useState<any>(format(Date.now(), props.format));

  const onChange = (__: MaterialUiPickersDate, value: string | null | undefined) => {
    setValue(value);
    props.onChange(__, value);
  };

  return (
    <Grid>
      <Grid className={classes.container}>
        <KeyboardDateTimePicker
          onChange={onChange}
          disablePast
          inputVariant={'outlined'}
          autoFocus
          value={value}
          format={props.format}
        />
      </Grid>
    </Grid>
  );
};

export default SecondStepOfSteperOfDialogOfAddNewGlobalEvent;
