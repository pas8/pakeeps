import React, { Fragment, useState } from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import {
  Box,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Typography
} from '@material-ui/core';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

const useStyles = makeStyles(theme => ({
  dateContainer: { padding: theme.spacing(0, 0) },
  // scale:{transform:'scale(0.88)'}
  itemGrid: { margin: theme.spacing(0.4, 1.4, 0, -0.8), padding: theme.spacing(0.8, 0) },
  menuText: { marginLeft: theme.spacing(1.4) },
  marginTop: { marginTop: theme.spacing(-1) },
  box: { marginBottom: theme.spacing(0.4), borderBottom: '1px solid rgba(255,255,255,0.4)' }
}));

const AddDateToPakeep = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();
  const placeholderFunc = value => ({ value });

  const dateListArr = [
    { title: 'Later today', icon: TodayOutlinedIcon, onClick: placeholderFunc },
    { title: 'Tomorrow', icon: CalendarTodayOutlinedIcon, onClick: placeholderFunc },
    { title: 'Next week', icon: ViewWeekOutlinedIcon, onClick: placeholderFunc },
    { title: 'Add to dashboard', icon: DashboardOutlinedIcon, onClick: placeholderFunc },
    {
      title: 'Add Date & Time',
      icon: EventNoteOutlinedIcon,
      onClick: placeholderFunc,
      dynamicComponent: (
        <Grid item className={classes.marginTop}>
          <KeyboardDateTimePicker
            emptyLabel={''}
            value={selectedDate}
            onChange={handleDateChange}
            ampm={false}
            showTodayButton
            animateYearScrolling
            keyboardIcon={<EventNoteOutlinedIcon />}
            autoOk={false}
            format="yyyy  /  MM  /  dd  /  hh:mm"
          />
        </Grid>
      ),
      isDynamicComponentActive: true
    },
    { title: 'Add Location', icon: AddLocationOutlinedIcon, onClick: placeholderFunc },
    { title: 'Add More Events', icon: DateRangeOutlinedIcon, onClick: placeholderFunc, hidden: !true }
  ];

  return (
    <>
      <Grid borderBottom={1} className={classes.box} display={'flex'} container>
        <Grid flexGrow={1} item>
          <IconButton>
            <ArrowBackOutlinedIcon />
          </IconButton>
          <Typography variant={'subtitle1'}>Close</Typography>
        </Grid>
        <SaveOutlinedIcon style={{ color: 'rgba(255,255,255,0.4)' }} />
      </Grid>
      {dateListArr.map(
        ({ title, icon: Icon, onClick, hidden = false, dynamicComponent = false, isDynamicComponentActive }) => (
          <>
            {!hidden ? (
              <MenuItem>
                <Grid className={classes.itemGrid} display={'flex'} container>
                  <Icon />
                  <Grid item className={classes.menuText}>
                    {Boolean(dynamicComponent) && isDynamicComponentActive ? (
                      dynamicComponent
                    ) : (
                      <>
                        <Typography variant={'subtitle2'}> {title}</Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              </MenuItem>
            ) : null}
          </>
        )
      )}
      {/* Choose date */}
    </>
  );
};

export default AddDateToPakeep;
