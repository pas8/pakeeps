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
import { addDays, isValid, format as toFormat } from 'date-fns';
import { connect } from 'react-redux';
import { useCounter } from 'react-use';
import DynamicAddMoreEvents from './components/DynamicComponents/components/DynamicAddMoreEvents';
import DynamicMenuItem from './components/DynamicMenuItem';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import includes from 'lodash.includes';
import { filter, find, mapKeys, map, uniq, uniqWith, isEqual, mapValues } from 'lodash';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useSnackbar } from 'notistack';
import { handlePakeepEventsThunk } from 'store/modules/App/operations';
import { useCurrentEvents } from 'hooks/useCurrentEvents.hook';
import { useValidatedCurrentEvents } from 'hooks/useValidatedCurrentEvents.hook';

const AddDateToPakeep = ({
  ampm = false,
  onMenuClose,
  id,
  customColor: color,
  timeFormat,
  timeAndDateFromat,
  globalEvents,
  events,
  handlePakeepEventsThunk
}) => {
  const currentEventsArr = useCurrentEvents(globalEvents, events, timeFormat, timeAndDateFromat);
  // console.log(events);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const TO_PUSH = 'TO_PUSH';
  const SAVED = 'saved';
  const currentEventsObject = mapKeys(currentEventsArr, ({ id }) => id);
  const customColor = useGetReversedCustomColor(color);

  const [buttonSaveState, setButtonSaveState] = useState(false);

  const [focusedEventId, setFocusedEventId] = useState('');

  const [dateAndTimeInputsState, setDateAndTimeInputsState] = useState({});

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

  const dateListArr = [...currentEventsArr, ...defaultDateListArr];

  const [chosenItemArr, setChosenItemArr] = useState([]);

  useEffect(() => {
    const nullityOfDateAndTimeInputsState = mapValues(currentEventsObject, ({ id, value, inputValue }) => ({
      id,
      value,
      inputValue
    }));
    setDateAndTimeInputsState(nullityOfDateAndTimeInputsState);

    const nulittyOfChosenItemArr = map(filter(dateListArr, 'isChosen'), 'id');
    setChosenItemArr(nulittyOfChosenItemArr);
  }, [currentEventsArr]);

  const validatedCurrentEvents = useValidatedCurrentEvents(dateAndTimeInputsState, chosenItemArr);

  useEffect(() => {
    if (buttonSaveState !== TO_PUSH) return;

    if (!validatedCurrentEvents.length)
      return enqueueSnackbar({
        message: `Can not add events`,
        severity: 'error'
      });

    handlePakeepEventsThunk(id, validatedCurrentEvents);
    onMenuClose();

    enqueueSnackbar({
      message: `You succsesfully added ${validatedCurrentEvents.length} events`
    });

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
      {dateListArr.map(
        (
          { title, iconName, onClick: onMenuItemClick, onlyTime, dynamicComponent, id, handlePakeepEventsThunk },
          idx
        ) => {
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
          const onClickOfCloseIcon = () => setChosenItemArr(state => filter(state, elId => elId !== name));

          const dynamicItemProps = { onClick };

          const dynamicComponentProps = {
            ...dynamicComponent?.props,
            icon,
            correctName: isChosen,
            name,
            value: dateAndTimeInputsState[name]?.value,
            inputValue: dateAndTimeInputsState[name]?.inputValue,
            format: currentEventsObject[name]?.format,
            onlyTime,
            onClickOfCloseIcon,
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

const mapStateToProps = ({ app: { events: globalEvents }, settings: { timeFormat, timeAndDateFromat } }) => ({
  globalEvents: getGlobalEventsArr(globalEvents),
  timeFormat,
  timeAndDateFromat
});
const mapDispatchToProps = dispatch => ({
  handlePakeepEventsThunk: (id, events) => dispatch(handlePakeepEventsThunk(id, events))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDateToPakeep);
