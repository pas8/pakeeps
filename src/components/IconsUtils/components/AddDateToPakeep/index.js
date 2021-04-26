import React, { Fragment, useState } from 'react';
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
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import clsx from 'clsx';
import shortid from 'shortid';
import HeaderOfAddDateToPakeep from './components/HeaderOfAddDateToPakeep';
import DynamicInputDateAndTimePickers from './components/dynamicComponents/components';

const useStyles = makeStyles(theme => ({
  dateContainer: { padding: theme.spacing(0, 0) },
  // scale:{transform:'scale(0.88)'}
  itemGrid: { margin: theme.spacing(0.4, 0.8 * 4, 0, 1.4), padding: theme.spacing(0.8, 0) },
  menuText: { marginLeft: theme.spacing(1.4) },
  marginTop: { marginRight: theme.spacing(1.4), marginLeft: theme.spacing(1.0 * 2) },
  box: { borderBottom: '1px solid rgba(255,255,255,0.4)' },
  menuItemButton: { outline: 'none', background: 'none', border: 'none' },
  timePickerWrapper: { '& input': { width: theme.spacing(16) } }
}));

const AddDateToPakeep = ({ ampm = false }) => {
  const nullifyOfMenuItemState = {
    name: '',
    hoverStatus: false,
    clickStatus: false,
    changedStatus: false,
    dynamicTitle: false
  };

  const nullifyDateAndTimeInputsState = {
    laterToday: { value: '', isValid: true, isChosen: false },
    tomorrow: { value: '', isValid: true, isChosen: false },
    nextWeek: { value: '', isValid: true, isChosen: false },
    addToDashboard: { value: '', isValid: true, isChosen: false },
    addDateAndTime: { value: '', isValid: true, isChosen: false },
    addLocation: { value: '', isValid: true, isChosen: false },
    addMoreEvents: { value: '', isValid: true, isChosen: false }
  };
  const [selectedDate, handleDateChange] = useState(new Date());
  const [buttonSaveState, setButtonSaveState] = useState(false);
  const [menuItemState, setMenuItemState] = useState(nullifyOfMenuItemState);
  const [dateAndTimeInputsState, setDateAndTimeInputsState] = useState(nullifyDateAndTimeInputsState);

  const classes = useStyles();
  const placeholderFunc = value => ({ value });

  const handleDateAndTimeInputsState = ({ target: { name, value } }) =>
    setDateAndTimeInputsState(state => ({ ...state, [name]: { ...state[name], value } }));

  const dateListArr = [
    {
      title: 'Later today',
      icon: TodayOutlinedIcon,
      onClick: placeholderFunc,
      name: 'laterToday',
      dynamicComponent: { component: DynamicInputDateAndTimePickers, className: null, props: { onlyTime: true } }
    },
    { title: 'Tomorrow', icon: CalendarTodayOutlinedIcon, onClick: placeholderFunc, name: 'tomorrow' },
    { title: 'Next week', icon: ViewWeekOutlinedIcon, onClick: placeholderFunc, name: 'nextWeek' },
    { title: 'Add to dashboard', icon: DashboardOutlinedIcon, onClick: placeholderFunc, name: 'addToDashboard' },
    {
      title: 'Add Date & Time',
      icon: EventNoteOutlinedIcon,
      onClick: placeholderFunc,
      dynamicComponent: { component: DynamicInputDateAndTimePickers, className: null, props: { onlyTime: false } },
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
  const setHoverOfMenuItemIsFalse = name => setMenuItemState(state => ({ ...state, name, hoverStatus: false }));
  const setClickStatusOfMenuItemIsTrue = (name, title) =>
    setMenuItemState(state => ({ ...state, name, hoverStatus: false, clickStatus: true, dynamicTitle: title }));

  const setNullifyOfMenuItemState = () => setMenuItemState(nullifyOfMenuItemState);

  return (
    <>
      <HeaderOfAddDateToPakeep
        buttonSaveState={buttonSaveState}
        arrowButtonFunc={setNullifyOfMenuItemState}
        dynamicTitle={menuItemState.dynamicTitle}
      />
      {dateListArr.map(({ title, icon: Icon, onClick, hidden, dynamicComponent = false, name }, idx) => {
        const DynamicComponent = dynamicComponent.component;

        let correctName = name === menuItemState.name;
        let activeIcon = correctName && menuItemState.hoverStatus;
        let currentClickStatus = menuItemState.clickStatus;

        const onMouseEnterOfMenuItem = () => (currentClickStatus ? null : setHoverOfMenuItemIsTrue(name));
        const onMouseLeaveOfMenuItem = () => (currentClickStatus ? null : setHoverOfMenuItemIsFalse(name));
        const onClickOfMenuItem = () => setClickStatusOfMenuItemIsTrue(name, title);

        let menuItemProps = {
          key: shortid(),
          onMouseEnter: onMouseEnterOfMenuItem,
          onMouseLeave: onMouseLeaveOfMenuItem,
          onClick: currentClickStatus ? null : onClickOfMenuItem
        };

        let dynamicComponentProps = {
          ...dynamicComponent.props,
          onChange: handleDateAndTimeInputsState,
          value: dateAndTimeInputsState[name].value,
          KeyboardIcon: Icon,
          ampm
        };

        if (hidden) return;

        return (
          <MenuItem {...menuItemProps} disableGutters>
            {Boolean(dynamicComponent) && correctName && currentClickStatus ? (
              <Grid item className={clsx(classes.marginTop, classes.itemGrid, dynamicComponent.className)}>
                <DynamicComponent {...dynamicComponentProps} />
              </Grid>
            ) : (
              <Grid className={clsx(classes.itemGrid)} container>
                <Icon style={{ color: `rgba(255,255,255,${activeIcon ? 0.8 : 0.42})` }} />

                <Grid item className={classes.menuText}>
                  <Typography variant={'subtitle2'} style={{ color: `rgba(255,255,255,${activeIcon ? 1 : 0.8})` }}>
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </MenuItem>
        );
      })}
      {/* Choose date */}
    </>
  );
};

export default AddDateToPakeep;
