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
import { themeColors } from 'components/theme';
import clsx from 'clsx';
import shortid from 'shortid';

const useStyles = makeStyles(theme => ({
  dateContainer: { padding: theme.spacing(0, 0) },
  // scale:{transform:'scale(0.88)'}
  itemGrid: { margin: theme.spacing(0.4, 1.4, 0, -0.8), padding: theme.spacing(0.8, 0) },
  menuText: { marginLeft: theme.spacing(1.4) },
  marginTop: { marginRight: theme.spacing(-0.8), marginLeft: theme.spacing(-0.4) },
  box: { borderBottom: '1px solid rgba(255,255,255,0.4)' },
  menuItemButton: { outline: 'none', background: 'none', border: 'none' }
}));

const AddDateToPakeep = () => {
  const nullifyOfMenuItemState = { name: '', hoverStatus: false, clickStatus: false, changedStatus: false };

  const [selectedDate, handleDateChange] = useState(new Date());
  const [buttonSaveState, setButtonSaveState] = useState(false);
  const [menuItemState, setMenuItemState] = useState(nullifyOfMenuItemState);

  const classes = useStyles();
  const placeholderFunc = value => ({ value });

  const dateListArr = [
    { title: 'Later today', icon: TodayOutlinedIcon, onClick: placeholderFunc, name: 'laterToday' },
    { title: 'Tomorrow', icon: CalendarTodayOutlinedIcon, onClick: placeholderFunc, name: 'tomorrow' },
    { title: 'Next week', icon: ViewWeekOutlinedIcon, onClick: placeholderFunc, name: 'nextWeek' },
    { title: 'Add to dashboard', icon: DashboardOutlinedIcon, onClick: placeholderFunc, name: 'addToDashboard' },
    {
      title: 'Add Date & Time',
      icon: EventNoteOutlinedIcon,
      onClick: placeholderFunc,
      dynamicComponent: (
        <Grid item className={clsx(classes.marginTop, classes.itemGrid)}>
          <KeyboardDateTimePicker
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

      name: 'addDateAndTime'
    },
    { title: 'Add Location', icon: AddLocationOutlinedIcon, onClick: placeholderFunc, name: 'addLocation' },
    {
      title: 'Add More Events',
      icon: DateRangeOutlinedIcon,
      onClick: placeholderFunc,
      hidden: true,
      name: 'addMoreEvents'
    }
  ];
  const setHoverOfMenuItemIsTrue = name => setMenuItemState(state => ({ ...state, name, hoverStatus: true }));

  const setHoverOfMenuItemIsFalse = () => setMenuItemState(nullifyOfMenuItemState);
  return (
    <>
      <Grid borderBottom={1} className={classes.box} container justify={'space-between'}>
        <Grid item>
          <Grid container alignItems={'center'}>
            <IconButton>
              <ArrowBackOutlinedIcon />
            </IconButton>
            <Typography
              variant={'subtitle1'}
              style={{
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              Close
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton>
            <SaveOutlinedIcon
              style={{
                color:
                  buttonSaveState === 'saved'
                    ? themeColors.primaryMain
                    : `rgba(255,255,255,${buttonSaveState ? 0.8 : 0.42}`
              }}
            />
          </IconButton>
        </Grid>
      </Grid>

      {dateListArr.map(({ title, icon: Icon, onClick, hidden = false, dynamicComponent = false, name }, idx) => {
        let correctName = name === menuItemState.name;
        let activeIcon = correctName && menuItemState.hoverStatus;
        let onMouseEnterOfMenuItem = () => setHoverOfMenuItemIsTrue(name);

        return (
          <>
            {!hidden ? (
              <MenuItem
                key={shortid()}
                onMouseEnter={onMouseEnterOfMenuItem}
                onMouseLeave={setHoverOfMenuItemIsFalse}
                onClick={onClick}
              >
                {Boolean(dynamicComponent) && correctName && menuItemState.clickStatus ? (
                  dynamicComponent
                ) : (
                  <>
                    <Grid className={clsx(classes.itemGrid)} container>
                      <Icon
                        style={{
                          color: `rgba(255,255,255,${activeIcon ? 0.8 : 0.42})`
                        }}
                      />
                      <Grid item className={classes.menuText}>
                        <Typography
                          variant={'subtitle2'}
                          style={{
                            color: `rgba(255,255,255,${activeIcon ? 1 : 0.8})`
                          }}
                        >
                          {title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                )}
              </MenuItem>
            ) : null}
          </>
        );
      })}
      {/* Choose date */}
    </>
  );
};

export default AddDateToPakeep;
