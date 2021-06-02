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
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';

const useStyles = makeStyles(theme => ({
  // dateContainer: { padding: theme.spacing(0, 0) },
  box: { borderBottom: '1px solid rgba(255,255,255,0.4)' }
}));

const AddDateToPakeep = ({ ampm = false, onMenuClose, id, globalEventsArr, customColor: color, events }) => {
  const globalEventsObject = mapKeys(globalEventsArr, ({ id }) => id);
  const customColor = useGetReversedCustomColor(color);
  const [buttonSaveState, setButtonSaveState] = useState(false);
  const [dateAndTimeInputsState, setDateAndTimeInputsState] = useState(globalEventsObject);

  // const [/s, setButtonSaveState] = useState(false);

  const [chosenEventsIdArr, setChosenItemsIdArr] = useState(false);

  console.table(dateAndTimeInputsState);

  const classes = useStyles();

  const handleDateAndTimeInputsState = (name, value) => {
    console.log(name, value);
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

  const defaultDateListArr = [
    {
      title: 'Add Custom Events',
      iconName: 'dateRange',
      dynamicComponent: {
        component: DynamicAddMoreEvents,
        props: { handleAddCustomEvent }
      }
    }
  ];
  const dateListArr = [...globalEventsArr, ...defaultDateListArr];
  const nullifyOfMenuItemState = { name: '' };
  const [menuItemState, setMenuItemState] = useState(nullifyOfMenuItemState);

  return (
    <>
      <HeaderOfAddDateToPakeep
        buttonSaveState={buttonSaveState}
        arrowButtonFunc={onMenuClose}
        customColor={customColor}
        // dynamicTitle={menuItemState.dynamicTitle}
      />
      {dateListArr.map(
        ({ title, iconName, onClick: onMenuItemClick, onlyTime, dynamicComponent, value, id, isChosen }, idx) => {
          const [icon] = useTakeIcon(iconName);
          const DynamicComponent = onMenuItemClick ?? dynamicComponent?.component ?? DynamicInputDateAndTimePickers;
          // console.log(onMenuItemClick ?? dynamicComponent.component ?? DynamicInputDateAndTimePickers )

          const name = id;
          const correctName = name === menuItemState.name;
          const isActiveIcon = correctName;

          const isDynamicComponentShouldBeShown = correctName || (isChosen && DynamicComponent);

          const onClick = () =>
            correctName ? null : onMenuItemClick ? onMenuItemClick() : setMenuItemState(state => ({ ...state, name }));

            const dynamicItemProps = isDynamicComponentShouldBeShown && {onClick};
        

          const dynamicComponentProps = {
            ...dynamicComponent?.props,
            onChange: handleDateAndTimeInputsState,
            icon,
            itemState: dateAndTimeInputsState[name],
            correctName,
            name,

            value,
            onlyTime,
            title,
            ampm,
            customColor
          };

          // if (hidden) return;

          const dynamicMenuListProps = {
            DynamicComponent,
            dynamicComponentProps,
            title,
            isActiveIcon,
            isDynamicComponentShouldBeShown,
            dynamicItemProps,
            icon,
            customColor,
            isPreventClickOfMenuItem: correctName
          };

          return <DynamicMenuItem {...dynamicMenuListProps} key={nanoid()} />;
        }
      )}
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
