import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
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
import DynamicInputDateAndTimePickers from './components/dynamicComponents/components/DynamicInputDateAndTimePickers';
import { addDays, isValid } from 'date-fns';

const useStyles = makeStyles(theme => ({
  dateContainer: { padding: theme.spacing(0, 0) },
  // scale:{transform:'scale(0.88)'}
  itemGrid: { margin: theme.spacing(0.4, 0.8 * 4, 0, 1.4), padding: theme.spacing(0.8, 0) },
  menuText: { marginLeft: theme.spacing(1.4) },
  marginTop: {
    marginRight: theme.spacing(1.4),
    marginLeft: theme.spacing(1.0 * 2),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    })
  },
  box: { borderBottom: '1px solid rgba(255,255,255,0.4)' },
  menuItemButton: { outline: 'none', background: 'none', border: 'none' },
  timePickerWrapper: { '& input': { width: theme.spacing(16) } }
}));

const AddDateToPakeep = ({ ampm = false, onMenuClose }) => {
  let DateNow = new Date();

  const nullifyOfMenuItemState = {
    name: '',
    hoverStatus: false,
    clickStatus: false,
    changedStatus: false,
    dynamicTitle: false,
    isItemShouldBeOfFullWidth: false
  };
  const nullifyDateAndTimeInputsState = {
    laterToday: { value: DateNow, isValid: true, isChosen: false, saved: false },
    tomorrow: { value: addDays(DateNow, 1), isValid: true, isChosen: false, saved: false },
    nextWeek: { value: addDays(DateNow, 7), isValid: true, isChosen: false, saved: false },
    addToDashboard: { value: '', isValid: true, isChosen: false, saved: false },
    addDateAndTime: { value: DateNow, isValid: true, isChosen: false, saved: false },
    addLocation: { value: '', isValid: true, isChosen: false, saved: false },
    addMoreEvents: { value: '', isValid: true, isChosen: false, saved: false }
  };
  const [buttonSaveState, setButtonSaveState] = useState(false);
  const [menuItemState, setMenuItemState] = useState(nullifyOfMenuItemState);
  const [dateAndTimeInputsState, setDateAndTimeInputsState] = useState(nullifyDateAndTimeInputsState);

  const classes = useStyles();
  const placeholderFunc = value => ({ value });
  const handleDateAndTimeInputsState = (name, value) => {
    setDateAndTimeInputsState(state => ({
      ...state,
      [name]: { ...state[name], value, isChosen: true, isValid: isValid(value) }
    }));
  };

  // console.log(dateAndTimeInputsState);
  const dateListArr = [
    {
      title: 'Later today',
      icon: TodayOutlinedIcon,
      onClick: placeholderFunc,
      name: 'laterToday',
      dynamicComponent: {
        component: DynamicInputDateAndTimePickers,
        className: classes.timePickerWrapper,
        props: { onlyTime: true }
      }
    },
    {
      title: 'Tomorrow',
      icon: CalendarTodayOutlinedIcon,
      onClick: placeholderFunc,
      name: 'tomorrow',
      dynamicComponent: {
        component: DynamicInputDateAndTimePickers,
        className: classes.timePickerWrapper,
        props: { onlyTime: true }
      }
    },
    {
      title: 'Next week',
      icon: ViewWeekOutlinedIcon,
      onClick: placeholderFunc,
      name: 'nextWeek',
      dynamicComponent: {
        component: DynamicInputDateAndTimePickers,
        className: null,
        props: { onlyTime: false }
      }
    },
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

  let currentClickStatus = menuItemState.clickStatus;

  return (
    <>
      <HeaderOfAddDateToPakeep
        buttonSaveState={buttonSaveState}
        arrowButtonFunc={!currentClickStatus ? onMenuClose : setNullifyOfMenuItemState}
        dynamicTitle={menuItemState.dynamicTitle}
      />
      {dateListArr.map(({ title, icon: Icon, onClick, hidden, dynamicComponent = false, name }, idx) => {
        const DynamicComponent = dynamicComponent.component;
        const correctName = name === menuItemState.name;
        const activeIcon = correctName && menuItemState.hoverStatus;

        const isItemShouldBeOfFullWidth = dynamicComponent?.props?.onlyTime;
        const isDynamicComponentShouldBeShown =
          (Boolean(dynamicComponent) && correctName && currentClickStatus) || dateAndTimeInputsState[name].isChosen;

        const onMouseEnterOfMenuItem = () => (currentClickStatus ? null : setHoverOfMenuItemIsTrue(name));
        const onMouseLeaveOfMenuItem = () => (currentClickStatus ? null : setHoverOfMenuItemIsFalse(name));
        const onClickOfMenuItem = () => setClickStatusOfMenuItemIsTrue(name, title);

        let menuItemProps = {
          key: shortid(),
          onMouseEnter: onMouseEnterOfMenuItem,
          onMouseLeave: onMouseLeaveOfMenuItem,
          onClick:
            (currentClickStatus || dateAndTimeInputsState[name].isChosen) && correctName ? null : onClickOfMenuItem
        };
        let dynamicComponentProps = {
          ...dynamicComponent.props,
          onChange: handleDateAndTimeInputsState,
          value: dateAndTimeInputsState[name].value,
          KeyboardIcon: Icon,
          savedStatus: dateAndTimeInputsState[name].saved,
          correctName,
          clickStatus: correctName && currentClickStatus,
          name,
          title,
          ampm,
          error: !dateAndTimeInputsState[name].isValid
        };

        if (hidden) return;

        const dynamicMenuItem = (
          <Grid
            item
            className={clsx(
              classes.marginTop,
              classes.itemGrid
              // !menuItemState.isItemShouldBeOfFullWidth && classes.timePickerWrapper
            )}
          >
            <DynamicComponent {...dynamicComponentProps} />
          </Grid>
        );

        const staticMenuItem = (
          <Grid className={clsx(classes.itemGrid)} container>
            <Icon style={{ color: `rgba(255,255,255,${activeIcon ? 0.8 : 0.42})` }} />
            <Grid item className={classes.menuText}>
              <Typography variant={'subtitle2'} style={{ color: `rgba(255,255,255,${activeIcon ? 1 : 0.8})` }}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        );

        return (
          <MenuItem {...menuItemProps} disableGutters>
            {isDynamicComponentShouldBeShown ? dynamicMenuItem : staticMenuItem}
          </MenuItem>
        );
      })}
      {/* Choose date */}
    </>
  );
};

AddDateToPakeep.propTypes = {
  ampm: PropTypes.bool,
  onMenuClose: PropTypes.func
};

export default AddDateToPakeep;
