import React, { useState, useEffect, FC, MouseEventHandler } from 'react';
import { useSnackbar } from 'notistack';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { nanoid } from 'nanoid';
import includes from 'lodash.includes';
import { filter, mapKeys, map, mapValues } from 'lodash';
import { DEFAULT } from 'models/denotation';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useValidatedCurrentEvents } from 'hooks/useValidatedCurrentEvents.hook';
import { CustomColorType } from 'models/types';
import PreviewEventList from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/PreviewEventList';
import { DialogOfAddingNewGlobalEvent } from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/DialogOfAddingNewGlobalEvent';
import {
  AddDateToPakeepPropsType,
  ChosenItemArrType,
  DateAndTimeInputsStateType,
  DateListArrType,
  HandleDateAndTimeInputsStateType
} from './types';
import HeaderOfAddDateToPakeep from './components/HeaderOfAddDateToPakeep';
import DynamicInputDateAndTimePickers from './components/DynamicComponents/components/DynamicInputDateAndTimePickers';
import DynamicMenuItem from './components/DynamicMenuItem';
import { useDispatch } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { MenusLayoutName } from 'models/unums';

const useStyles = makeStyles(({ spacing, shape: { borderRadius } }) => ({
  container: ({ color }: { color: CustomColorType }) => ({
    borderRadius,
    background: !color.isUseDefault ? color.unHover : ''
  })
}));

const AddDateToPakeep: FC<AddDateToPakeepPropsType> = ({
  onMenuClose,
  id: pakeepId,
  customColor: color,
  currentEventsArr,
  handleSaveEvents
}) => {
  const dispatch = useDispatch();

  const classes = useStyles({ color });

  const ampm = false;
  if (!currentEventsArr) return null;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const FIRST_EVENT_ID = '1';

  enum ButtonSaveStateDenotation {
    NULLITY = '',
    TO_PUSH = 'TO_PUSH',
    SAVED = 'saved'
  }
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const currentEventsObject = mapKeys(currentEventsArr, ({ id }) => id);
  const customColor = useGetReversedCustomColor(color);
  const handleOpenDialog = () => setIsEditDialogOpen(true);

  const dialogOfAddingNewGlobalEventProps = {
    open: isEditDialogOpen,
    handleOpenDialog,
    customColor: color,
    onClose: () => setIsEditDialogOpen(false)
  };
  const [buttonSaveState, setButtonSaveState] = useState<ButtonSaveStateDenotation>(ButtonSaveStateDenotation.NULLITY);

  const [focusedEventId, setFocusedEventId] = useState('');

  const [dateAndTimeInputsState, setDateAndTimeInputsState] = useState<DateAndTimeInputsStateType>({});
  // console.log(dateAndTimeInputsState)
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
      onClick: () => setIsEditDialogOpen(true)
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
  }, []);

  const validatedCurrentEvents = useValidatedCurrentEvents(dateAndTimeInputsState, chosenItemArr);
  useEffect(() => {
    if (buttonSaveState !== ButtonSaveStateDenotation.TO_PUSH) return;
    console.log(validatedCurrentEvents);

    if (!validatedCurrentEvents.length) {
      enqueueSnackbar({
        message: `Can not add events`,
        severity: 'error'
      });
      return;
    }
    handleSaveEvents(validatedCurrentEvents);
    onMenuClose();

    enqueueSnackbar({
      message: `You succsesfully added ${validatedCurrentEvents.length} events`
    });

    return setButtonSaveState(ButtonSaveStateDenotation.SAVED);
  }, [buttonSaveState]);

  const onClickOfSaveButton = () => {
    setButtonSaveState(ButtonSaveStateDenotation.TO_PUSH);
  };

  const previewEventListProps = {
    validatedCurrentEvents,
    currentEventsArr,
    customColor,
    onClick: (__: any) => {},
    parentBackgroundColor: customColor.isUseDefault ? DEFAULT : customColor.bgHover
  };
  const customTitle = !!validatedCurrentEvents.length ? (
    <Grid style={{ maxWidth: 292 }}>
      {' '}
      <PreviewEventList {...previewEventListProps} />
    </Grid>
  ) : (
    <Typography style={{ color: customColor.isUseDefault ? '' : customColor.unHover }}> Events</Typography>
  );

  const headerOfAddDateToPakeepProps = {
    buttonSaveState,
    arrowButtonFunc: onMenuClose,
    onClickOfSaveButton,
    customColor,
    customTitle,
    isHideBorder: includes(chosenItemArr, FIRST_EVENT_ID)
  };

  return (
    <Grid className={classes.container}>
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
        const onClickOfEditIcon: MouseEventHandler<HTMLButtonElement> = ({ clientX: mouseX, clientY: mouseY }) => {
          dispatch(
            toChangeTemporaryData({
              newTemporaryData: {
                defaultMenuProps: { mouseX, mouseY, menuName: MenusLayoutName.EVENTS, customColor, id }
              }
            })
          );
        };

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

        return <DynamicMenuItem {...dynamicMenuListProps} key={`dateListArrOf${pakeepId}${id}`} />;
      })}

      <DialogOfAddingNewGlobalEvent {...dialogOfAddingNewGlobalEventProps} />
    </Grid>
  );
};

export default AddDateToPakeep;
