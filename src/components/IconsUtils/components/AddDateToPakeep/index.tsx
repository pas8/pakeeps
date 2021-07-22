import React, { useState, useEffect, FC } from 'react';
import dynamic from 'next/dynamic';
import { useSnackbar } from 'notistack';
import { toChangeDefaultLayoutDialogProps, toChangeTemporaryData } from 'store/modules/App/actions';
import { DialogLayoutName } from 'models/unums';
import { Typography, Grid, makeStyles, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import includes from 'lodash.includes';
import { filter, mapKeys, map, mapValues } from 'lodash';
import { DEFAULT } from 'models/denotation';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useValidatedCurrentEvents } from 'hooks/useValidatedCurrentEvents.hook';
import { CustomColorType } from 'models/types';
import PreviewEventList from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/PreviewEventList';
import {
  AddDateToPakeepPropsType,
  ChosenItemArrType,
  DateAndTimeInputsStateType,
  HandleDateAndTimeInputsStateType
} from './types';
import { getDefaultDialogPropsOfTemporaryData } from 'store/modules/App/selectors';

const HeaderOfAddDateToPakeep = dynamic(() => import('./components/HeaderOfAddDateToPakeep'));

const EventItemsList = dynamic(() => import('./components/EventItemsList'), {
  loading: () => (
    <Grid style={{ width: 200, height: 400 }} container justify={'center'} alignItems={'center'}>
      <CircularProgress />
    </Grid>
  )
});

const useStyles = makeStyles(({ spacing, shape: { borderRadius } }) => ({
  container: ({ color }: { color: CustomColorType }) => ({
    borderRadius,
    overflow:'hidden',
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

  const handleOpenAddCustomEventsDialog = () => {
    dispatch(
      toChangeDefaultLayoutDialogProps({
        props: {
          id: pakeepId,
          name: DialogLayoutName.EVENTS,
          customColor: color
        }
      })
    );
  };

  const defaultDateListArr = [
    {
      title: 'Add Custom Events',
      iconName: 'dateRange',
      id: 'ADD_CUSTOM_EVENTS',
      onClick: handleOpenAddCustomEventsDialog
    }
  ];

  const eventListArr = !currentEventsArr ? defaultDateListArr : [...currentEventsArr, ...defaultDateListArr];

  const [chosenItemArr, setChosenItemArr] = useState<ChosenItemArrType>([]);

  useEffect(() => {
    const nullityOfDateAndTimeInputsState = mapValues(currentEventsObject, ({ id, value, inputValue }) => ({
      id,
      value,
      inputValue
    }));

    setDateAndTimeInputsState(nullityOfDateAndTimeInputsState);

    const nullityOfChosenItemArr = map(filter(eventListArr, 'isChosen'), 'id');
    setChosenItemArr(nullityOfChosenItemArr);
  }, []);

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
    currentEventsArr: currentEventsArr!,
    customColor,
    onClick: (__: any) => {},
    parentBackgroundColor: customColor.isUseDefault ? DEFAULT : customColor.bgHover
  };
  const customTitle =
    !!currentEventsArr && !!currentEventsArr?.length && !!chosenItemArr.length ? (
      <Grid style={{ maxWidth: 292 }}>
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

  const eventItemsListProps = {
    eventListArr,
    setChosenItemArr,
    dateAndTimeInputsState,
    chosenItemArr,
    handleDateAndTimeInputsState,
    focusedEventId,
    customColor,
    pakeepId,
    currentEventsObject
  };

  return (
    <Grid className={classes.container}>
      <HeaderOfAddDateToPakeep {...headerOfAddDateToPakeepProps} />
      <EventItemsList {...eventItemsListProps} />
    </Grid>
  );
};

export default AddDateToPakeep;
