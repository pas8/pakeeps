import React, { Fragment, useState } from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { Grid, makeStyles, Menu, MenuItem, MenuList } from '@material-ui/core';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';

const useStyles = makeStyles(theme => ({
  dateContainer: { padding: theme.spacing(1.96, 0) }
  // scale:{transform:'scale(0.88)'}
}));

const AddDateToPakeep = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();
  const placeholderFunc = value => ({ value });
  const dateListArr = [
    { title: 'Later today', icon: TodayOutlinedIcon, onClick: placeholderFunc },
    { title: 'Tomorrow', icon: '', onClick: placeholderFunc },
    { title: 'Next week', icon: ViewWeekOutlinedIcon, onClick: placeholderFunc }
  ];

  return (
    <Grid className={classes.dateContainer}>
      <MenuItem>Fuck</MenuItem>
      <Grid>
        <KeyboardDateTimePicker
          label={'DateTimePicker'}
          inputVariant={'outlined'}
          value={selectedDate}
          onChange={handleDateChange}
          ampm={false}
          showTodayButton
          animateYearScrolling
          // allowKeyboardControl={false}
          // format={'hh:mm-dd-MM-yyyy'}
          format="yyyy  /  MM  /  dd  /  hh:mm"
        />
      </Grid>
    </Grid>
  );
};

export default AddDateToPakeep;
