import PropTypes from 'prop-types';
import React, { useState, useEffect, FC } from 'react';
import { nanoid } from 'nanoid';
import HeaderOfAddDateToPakeep from './components/HeaderOfAddDateToPakeep';
import DynamicInputDateAndTimePickers from './components/DynamicComponents/components/DynamicInputDateAndTimePickers';
import { connect } from 'react-redux';
import DynamicAddMoreEvents from './components/DynamicComponents/components/DynamicAddMoreEvents';
import DynamicMenuItem from './components/DynamicMenuItem';
import { getGlobalEventsArr } from 'store/modules/App/selectors';
import includes from 'lodash.includes';
import { filter, mapKeys, map, mapValues, find } from 'lodash';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useSnackbar } from 'notistack';
import { useCurrentEvents } from 'hooks/useCurrentEvents.hook';
import { useValidatedCurrentEvents } from 'hooks/useValidatedCurrentEvents.hook';
import { Chip, Typography, Grid, makeStyles } from '@material-ui/core';
import { format } from 'date-fns';
import PreviewEventList from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/PreviewEventList';
import DialogOfEditingDate from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/DialogOfEditingDate';
import {
  AddDateToPakeepPropsType,
  ChosenItemArrType,
  DateAndTimeInputsStateType,
  DateListArrType,
  HandleDateAndTimeInputsStateType
} from './types';

const AddDateToPakeep: FC<AddDateToPakeepPropsType> = ({
  onMenuClose,
  id,
  customColor: color,
  currentEventsArr,
  handleSaveEvents
}) => {
  const ampm = false;
console.log(currentEventsArr)
  if (!currentEventsArr) return null;
  // console.log(events);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const FIRST_EVENT_ID = '1';

  enum ButtonSaveStateDenotation {
    NULLITY = '',
    TO_PUSH = 'TO_PUSH',
    SAVED = 'saved'
  }

  const currentEventsObject = mapKeys(currentEventsArr, ({ id }) => id);
  const customColor = useGetReversedCustomColor(color);

  const [buttonSaveState, setButtonSaveState] = useState<ButtonSaveStateDenotation>(ButtonSaveStateDenotation.NULLITY);

  const [focusedEventId, setFocusedEventId] = useState('');

  const [dateAndTimeInputsState, setDateAndTimeInputsState] = useState<DateAndTimeInputsStateType>({});

  const handleDateAndTimeInputsState: HandleDateAndTimeInputsStateType = (id, value, inputValue) => {
    setFocusedEventId(id);
    setDateAndTimeInputsState(state => ({ ...state, [id]: { id, value, inputValue } }));
  };

  // const handleAddCustomEvent = newCustomEvent => {
  //   setDateAndTimeInputsState(state => ({ ...state, addMoreEvents: [...state.addMoreEvents, newCustomEvent] }));
  // };

  const defaultDateListArr = [
    {
      title: 'Add Custom Events',
      iconName: 'dateRange',
      id: '2151152352rerwkfsdnj23',
      dynamicComponent: {
        component: DynamicAddMoreEvents
        // props: { handleAddCustomEvent }
      }
    }
  ];

  const dateListArr: DateListArrType = [...currentEventsArr, ...defaultDateListArr];

  const [chosenItemArr, setChosenItemArr] = useState<ChosenItemArrType>([]);

  useEffect(() => {
    const nullityOfDateAndTimeInputsState = mapValues(currentEventsObject, ({ id, value, inputValue }) => ({
      id,
      value,
      inputValue
    }));

    setDateAndTimeInputsState(nullityOfDateAndTimeInputsState);

    const nullityOfChosenItemArr = map(filter(dateListArr, 'isChosen'), 'id');
    setChosenItemArr(nullityOfChosenItemArr);
  }, [currentEventsArr]);

  const validatedCurrentEvents = useValidatedCurrentEvents(dateAndTimeInputsState, chosenItemArr);

  useEffect(() => {
    if (buttonSaveState !== ButtonSaveStateDenotation.TO_PUSH) return;

    if (!validatedCurrentEvents.length) {
      enqueueSnackbar({
        message: `Can not add events`,
        severity: 'error'
      });
      return;
    }
    handleSaveEvents(validatedCurrentEvents);
    // onMenuClose();

    enqueueSnackbar({
      message: `You succsesfully added ${validatedCurrentEvents.length} events`
    });

    return setButtonSaveState(ButtonSaveStateDenotation.SAVED);
  }, [buttonSaveState]);

  const onClickOfSaveButton = () => {
    setButtonSaveState(ButtonSaveStateDenotation.TO_PUSH);
  };

  const previewEventListProps = { validatedCurrentEvents, currentEventsArr, customColor };
  const customTitle = !!validatedCurrentEvents.length ? (
    <PreviewEventList {...previewEventListProps} />
  ) : (
    <Typography> Events</Typography>
  );

  const headerOfAddDateToPakeepProps = {
    buttonSaveState,
    arrowButtonFunc: onMenuClose,
    onClickOfSaveButton,
    customColor,
    customTitle,
    isHideBorder: includes(chosenItemArr, FIRST_EVENT_ID)
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const dialogOfEditingDateProps = {
    open: isEditDialogOpen
  };

  return (
    <>
      <HeaderOfAddDateToPakeep {...headerOfAddDateToPakeepProps} />
      {dateListArr.map(({ title, iconName, onClick: onMenuItemClick, onlyTime, dynamicComponent, id }) => {
        const [icon] = useTakeIcon(iconName);
        const DynamicComponent = onMenuItemClick ?? dynamicComponent?.component ?? DynamicInputDateAndTimePickers;
        // console.log(onMenuItemClick ?? dynamicComponent.component ?? DynamicInputDateAndTimePickers )

        const name = id;

        const isChosen = includes(chosenItemArr, name);
        const isActiveIcon = isChosen;

        const isDynamicComponentShouldBeShown = !!(isChosen && DynamicComponent);

        const onClick = () => {
          const onDefaultClick = () => {
            setChosenItemArr(state => [...state, name]);
            // setButtonSaveState(true);
          };

          isChosen ? null : onMenuItemClick ? onMenuItemClick() : onDefaultClick();
        };
        const onClickOfCloseIcon = () => setChosenItemArr(state => filter(state, elId => elId !== name));
        const onClickOfEditIcon = () => setIsEditDialogOpen(true);

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
          focusedEventId,
          onClickOfEditIcon
        };

        // if (hidden) return;

        const dynamicMenuListProps = {
          DynamicComponent,
          dynamicComponentProps,
          title,
          isMarginSmaller: true,
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

      <DialogOfEditingDate {...dialogOfEditingDateProps} />
    </>
  );
};

export default AddDateToPakeep;
