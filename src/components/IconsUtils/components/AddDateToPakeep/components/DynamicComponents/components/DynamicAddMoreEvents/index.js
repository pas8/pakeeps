import { Button, Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import DynamicInputDateAndTimePickers from '../DynamicInputDateAndTimePickers';
import _ from 'lodash';
import compareFunc from 'compare-func';
import ColorPickerByPs from 'components/ColorPicker';

const useStyles = makeStyles(theme => ({
  containerOfEventsElement: {
    marginBottom: theme.spacing(1.8)
  },

}));

const DynamicAddMoreEvents = ({ onChangeOfAddMoreEvents, itemState: { value }, ...inputProps }) => {
  const [moreEventsState, setMoreEventsState] = useState(value);
  console.log(moreEventsState);

  const classes = useStyles();

  const onClick = () => {
    let arr = _.remove(moreEventsState, n => n.key !== 'AMV1');
    const sortedArr = arr.sort(compareFunc('value'));
    console.log(arr, sortedArr);
    setMoreEventsState(_.concat(sortedArr, '1'));
  };
  return (
    <Grid>
      {_.map(moreEventsState, ({ value, color, iconName, title, saved, isValid }, idx) => {
        const inputPickersProps = {
          ...inputProps,
          onChange: onChangeOfAddMoreEvents,
          itemState: {
            isValid,
            saved,
            value
          }
        };
        return (
          <Grid className={classes.containerOfEventsElement}>
            {' '}
            <DynamicInputDateAndTimePickers {...inputPickersProps} />
            <ColorPickerByPs />
          </Grid>
        );
      })}
      <Button onClick={onClick}>Click</Button>
    </Grid>
  );
};

export default DynamicAddMoreEvents;
