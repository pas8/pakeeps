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
import DynamicInputDateAndTimePickers from './components/DynamicComponents/components/DynamicInputDateAndTimePickers';
import { addDays, isValid } from 'date-fns';
import { connect } from 'react-redux';
import DynamicAddMoreEvents from './components/DynamicComponents/components/DynamicAddMoreEvents';

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
  timePickerWrapper: { '& input': { width: theme.spacing(16) } },
  preventClickOfMenuItem: { '& .MuiTouchRipple-root': { display: 'none' } }
}));

const AddDateToPakeep = ({ ampm = false, onMenuClose, id, events }) => {
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
    laterToday: !events?.laterToday && { value: DateNow, isValid: true, isChosen: false, saved: false },
    tomorrow: !events?.tomorrow && { value: addDays(DateNow, 1), isValid: true, isChosen: false, saved: false },
    nextWeek: !events?.nextWeek && { value: addDays(DateNow, 7), isValid: true, isChosen: false, saved: false },
    addToDashboard: { value: '', isValid: true, isChosen: false, saved: false },
    addDateAndTime: { value: DateNow, isValid: true, isChosen: false, saved: false },
    addLocation: { value: '', isValid: true, isChosen: false, saved: false },
    addMoreEvents: {
      value: [
        {
          title: '',
          iconName: '',
          value: DateNow,
          color: 'default',
          saved: false,
          isValid: true,
          key: 'AMV1',
          isInPatternList: false,
          location:false
        },
        {
          title: '',
          iconName: '',
          value: addDays(DateNow, 2),
          color: 'primary',
          saved: false,
          isValid: true,
          key: 'AMV3',
          isInPatternList: false,
          location:false

        },
        {
          title: '',
          iconName: '',
          value: addDays(DateNow, 4),
          color: 'primary',
          saved: false,
          isValid: true,
          key: 'AMV4',
          isInPatternList: false,
          location:false

        },
        {
          title: '',
          iconName: '',
          value: addDays(DateNow, 1),
          color: 'primary',
          saved: false,
          isValid: true,
          key: 'AMV2',
          isInPatternList: false,
          location:false

        }
      ],
      isValid: true,
      isChosen: false,
      saved: false
    }
  };

  // const eventsOrder = [{key:'laterToday',value:'',iconName:'book'},'tomorrow','nextWeek','addDateAndTime','addMoreEvents']

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

  const onChangeOfAddMoreEvents = ( value) => {
    setDateAndTimeInputsState(state => ({
      ...state,
      addMoreEvents: { ...state.addMoreEvents, value }
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
      hidden: !true,
      name: 'addMoreEvents',
      dynamicComponent: {
        component: DynamicAddMoreEvents,
        className: null,
        props: { onlyTime: false, onChangeOfAddMoreEvents }
      }
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
const ItemOfMenu =isDynamicComponentShouldBeShown ? Grid : MenuItem 
        const onMouseEnterOfMenuItem = () => (currentClickStatus ? null : setHoverOfMenuItemIsTrue(name));
        const onMouseLeaveOfMenuItem = () => (currentClickStatus ? null : setHoverOfMenuItemIsFalse(name));
        const onClickOfMenuItem = () => setClickStatusOfMenuItemIsTrue(name, title);

        let menuItemProps = {
          disableGutters: true,
          key: shortid(),
          className: correctName && currentClickStatus ? classes.preventClickOfMenuItem : null,
          onMouseEnter: onMouseEnterOfMenuItem,
          onMouseLeave: onMouseLeaveOfMenuItem,
          onClick:
            (currentClickStatus || dateAndTimeInputsState[name].isChosen) && correctName ? null : onClickOfMenuItem
        };
        let dynamicComponentProps = {
          ...dynamicComponent.props,
          onChange: handleDateAndTimeInputsState,
          KeyboardIcon: Icon,
          itemState: dateAndTimeInputsState[name],
          correctName,
          clickStatus: correctName && currentClickStatus,
          name,
          title,
          ampm
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
          <ItemOfMenu {...menuItemProps}>{isDynamicComponentShouldBeShown ? dynamicMenuItem : staticMenuItem}</ItemOfMenu>
        );
      })}
    </>
  );
};

AddDateToPakeep.propTypes = {
  ampm: PropTypes.bool,
  id: PropTypes.any,
  onMenuClose: PropTypes.func
};

const mapStateToProps = ({ app: { data } }) => ({ data });
// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(AddDateToPakeep);
