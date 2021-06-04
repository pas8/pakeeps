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
import { useCounter } from 'react-use';
import DynamicAddMoreEvents from './components/DynamicComponents/components/DynamicAddMoreEvents';
import DynamicMenuItem from './components/DynamicMenuItem';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import includes from 'lodash.includes';
import { filter, find, mapKeys, map, uniq, uniqWith, isEqual, mapValues } from 'lodash';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';

const AddDateToPakeep = ({ ampm = false, onMenuClose, id, globalEventsArr, customColor: color, events, }) => {
  const TO_PUSH = 'TO_PUSH';
  const SAVED = 'saved';
  const globalEventsObject = mapKeys(globalEventsArr, ({ id }) => id);
  const customColor = useGetReversedCustomColor(color);

  const [buttonSaveState, setButtonSaveState] = useState(false);

  const [focusedEventId, setFocusedEventId] = useState('');

  const nullityOfDateAndTimeInputsState = mapValues(globalEventsObject, ({ id, value, inputValue }) => ({
    id,
    value,
    inputValue
  }));
  const [dateAndTimeInputsState, setDateAndTimeInputsState] = useState(nullityOfDateAndTimeInputsState);

  const handleDateAndTimeInputsState = (id, value, inputValue) => {
    setFocusedEventId(id);
    setDateAndTimeInputsState(state => ({ ...state, [id]: { id, value, inputValue } }));
  };

  const handleAddCustomEvent = newCustomEvent => {
    setDateAndTimeInputsState(state => ({ ...state, addMoreEvents: [...state.addMoreEvents, newCustomEvent] }));
  };

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

  const nulittyOfChosenItemArr = map(filter(dateListArr, 'isChosen'), 'id');
  const [chosenItemArr, setChosenItemArr] = useState(nulittyOfChosenItemArr);

  useEffect(() => {
    if (buttonSaveState !== TO_PUSH) return;
    const currentEvents = map(dateAndTimeInputsState, el => el);
    const validatedCurrentEvents = filter(currentEvents, ({ value ,id}) => !!isValid(value) && includes(chosenItemArr, id) );
    console.log(validatedCurrentEvents, id);

    return setButtonSaveState(SAVED);
  }, [buttonSaveState]);

  const onClickOfSaveButton = () => setButtonSaveState(TO_PUSH);

  return (
    <>
      <HeaderOfAddDateToPakeep
        buttonSaveState={buttonSaveState}
        arrowButtonFunc={onMenuClose}
        onClickOfSaveButton={onClickOfSaveButton}
        customColor={customColor}
        // dynamicTitle={menuItemState.dynamicTitle}
      />
      {dateListArr.map(({ title, iconName, onClick: onMenuItemClick, onlyTime, dynamicComponent, id }, idx) => {
        const [icon] = useTakeIcon(iconName);
        const DynamicComponent = onMenuItemClick ?? dynamicComponent?.component ?? DynamicInputDateAndTimePickers;
        // console.log(onMenuItemClick ?? dynamicComponent.component ?? DynamicInputDateAndTimePickers )

        const name = id;

        const isChosen = includes(chosenItemArr, name);
        const isActiveIcon = isChosen;

        const isDynamicComponentShouldBeShown = isChosen && DynamicComponent;

        const onClick = () => {
          const onDefaultClick = () => {
            setChosenItemArr(state => [...state, name]);
            // setButtonSaveState(true);
          };

          isChosen ? null : onMenuItemClick ? onMenuItemClick() : onDefaultClick();
        };
        const dynamicItemProps = { onClick };

        const dynamicComponentProps = {
          ...dynamicComponent?.props,
          icon,
          correctName: isChosen,
          name,
          value: dateAndTimeInputsState[name]?.value,
          inputValue: dateAndTimeInputsState[name]?.inputValue,
          format: globalEventsObject[name]?.format,
          onlyTime,
          title,
          ampm,
          handleDateAndTimeInputsState,
          customColor,
          focusedEventId
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
          // key: name,
          isPreventClickOfMenuItem: isChosen
        };

        return <DynamicMenuItem {...dynamicMenuListProps} key={nanoid()} />;
      })}
    </>
  );
};

AddDateToPakeep.propTypes = {
  ampm: PropTypes.bool,
  id: PropTypes.any,
  onMenuClose: PropTypes.func
};

const mapStateToProps = (
  { app: { events: globalEvents }, settings: { timeFormat, timeAndDateFromat } },
  { events }
) => ({
  globalEventsArr: getGlobalEventsArr(globalEvents, events, timeFormat, timeAndDateFromat)
});
// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(AddDateToPakeep);
