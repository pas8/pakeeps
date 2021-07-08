import { Grid } from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { useStyles } from 'components/IconsUtils/components/AddDateToPakeep/components/DynamicComponents/components/DynamicInputDateAndTimePickers';
import { FC } from 'react';
import { SecondStepOfSteperOfDialogOfAddNewGlobalEventPropsType } from './types';

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
  return (
    <Grid>
      <Grid className={classes.container}>
        <KeyboardDateTimePicker {...props} disablePast inputVariant={'outlined'} autoFocus />
      </Grid>
    </Grid>
  );
};

export default SecondStepOfSteperOfDialogOfAddNewGlobalEvent;