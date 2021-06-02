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
import { nanoid } from 'nanoid';
import HeaderOfAddDateToPakeep from './components/HeaderOfAddDateToPakeep';
import DynamicInputDateAndTimePickers from './components/DynamicComponents/components/DynamicInputDateAndTimePickers';
import { addDays, isValid } from 'date-fns';
import { connect } from 'react-redux';
import DynamicAddMoreEvents from './components/DynamicComponents/components/DynamicAddMoreEvents';
import DynamicMenuItem from './components/DynamicMenuItem';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import includes from 'lodash.includes';
import { find, mapKeys } from 'lodash';

const useStyles = makeStyles(theme => ({
  dateContainer: { padding: theme.spacing(0, 0) },
  // scale:{transform:'scale(0.88)'}
  box: { borderBottom: '1px solid rgba(255,255,255,0.4)' }
  // timePickerWrapper: { '& input': { width: theme.spacing(16) } }
}));

const AddDateToPakeep = ({ ampm = false, onMenuClose, id, globalEventsArr, customColor,events }) => {
  let DateNow = new Date();

  //   laterToday: { value: DateNow, isValid: true, isChosen: false, saved: false },




  const globalEventsObject = mapKeys(globalEventsArr, ({ id }) => id);
  
  // const eventsOrder = [{key:'laterToday',value:'',iconName:'book'},'tomorrow','nextWeek','addDateAndTime','addMoreEvents']

  const [buttonSaveState, setButtonSaveState] = useState(false);
  const [dateAndTimeInputsState, setDateAndTimeInputsState] = useState(null);

  const classes = useStyles();

  const handleDateAndTimeInputsState = (name, value) => {
    setDateAndTimeInputsState(state => ({
      ...state,
      [name]: { ...state[name], value, isChosen: true, isValid: isValid(value) }
    }));
  };

  const handleAddCustomEvent = newCustomEvent => {
    setDateAndTimeInputsState(state => ({ ...state, addMoreEvents: [...state.addMoreEvents, newCustomEvent] }));
  };
  // console.log(dateAndTimeInputsState);

  // { title: 'Add Custom Events',  iconName: 'addMoreEvents', id: '210' }

  // dynamicComponent: {
  //   component: DynamicInputDateAndTimePickers,
  //   className: classes.timePickerWrapper,
  //   props: { onlyTime: true }
  // }

  const nullifyOfMenuItemState = { name: '' };
  const [menuItemState, setMenuItemState] = useState(nullifyOfMenuItemState);

  return (
    <>
      <HeaderOfAddDateToPakeep
        buttonSaveState={buttonSaveState}
        arrowButtonFunc={onMenuClose}
        // dynamicTitle={menuItemState.dynamicTitle}
      />
      {/* {dateListArr.map(({ title, icon: Icon, onClick: onMenuItemClick, hidden, dynamicComponent = false }, idx) => {
        const DynamicComponent = dynamicComponent.component ?? Grid;
        const name = title;
        const correctName = name === menuItemState.name;
        const isActiveIcon = correctName;

        // const isDynamicComponentShouldBeShown = correctName && dynamicComponent.component;
        const isDynamicComponentShouldBeShown = false;

        const onClick = () =>
          correctName ? null : onMenuItemClick ? onMenuItemClick() : setMenuItemState(state => ({ ...state, name }));

        const menuItemProps = {
          key: nanoid(),
          onClick
        };

        const dynamicComponentProps = {
          ...dynamicComponent.props,
          onChange: handleDateAndTimeInputsState,
          KeyboardIcon: Icon,
          itemState: dateAndTimeInputsState[name],
          correctName,
          name,
          title,
          ampm
        };

        if (hidden) return;

        const dynamicMenuListProps = {
          DynamicComponent,
          dynamicComponentProps,
          title,
          isActiveIcon,
          isDynamicComponentShouldBeShown,
          menuItemProps,
          Icon,
          isPreventClickOfMenuItem: correctName
        };

        return <DynamicMenuItem {...dynamicMenuListProps} />;
      })} */}
    </>
  );
};

AddDateToPakeep.propTypes = {
  ampm: PropTypes.bool,
  id: PropTypes.any,
  onMenuClose: PropTypes.func
};

const mapStateToProps = ({ app: { events: globalEvents } }, { events }) => ({
  globalEventsArr: getGlobalEventsArr(globalEvents, events)
});
// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(AddDateToPakeep);
