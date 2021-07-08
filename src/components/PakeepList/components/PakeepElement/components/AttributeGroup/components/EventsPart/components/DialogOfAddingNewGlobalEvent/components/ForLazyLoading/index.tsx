import { Dialog, DialogActions, DialogTitle, Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { ChangeEventHandler, FC, useState } from 'react';
import { nanoid } from 'nanoid';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { toAddGlobalEvent } from 'store/modules/App/actions';
import { format as toFormat, isValid, differenceInMinutes, addMinutes } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { includes } from 'lodash';
import { colord } from 'colord';

import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import FirstStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/First';
import ThirdStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Third';
import FourthStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Fourth';
import SteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper';
import { useStyles } from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel';
import ColorPickerByPas from 'components/ColorChanger';
import { getTimeAndDateFromat } from 'store/modules/Settings/selectors';
import { ColorType, IconNameType, LabelVariantType } from 'store/modules/App/types';
import { iconsArr } from 'components/Icons';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import ActionsButtonGroup from 'components/ActionsButtonGroup';

import SecondStepOfSteperOfDialogOfAddNewGlobalEvent from '../SecondStepOfSteperOfDialogOfAddNewGlobalEvent';
import { DialogOfAddingNewGlobalEventPropsType } from '../../types';
import EventItem from '../../../PreviewEventList/components/EventItem';
import PreparedIconSelectingList from '../../../../../LabelPart/components/Menu/components/PreparedIconSelectingList';
import SecondStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Second';

const ForLazyLoadingDialogOfAddingNewGlobalEvent: FC<DialogOfAddingNewGlobalEventPropsType> = ({
  open,
  customColor: notValidCustomColor,
  onClose
}) => {
  const dispatch = useDispatch();

  const customColor = notValidCustomColor.isUseDefault
    ? notValidCustomColor
    : {
        ...notValidCustomColor,
        bgUnHover: useIsColorLight(notValidCustomColor.bgUnHover)
          ? colord(notValidCustomColor.bgUnHover).darken(0.08).toHex()
          : colord(notValidCustomColor.bgUnHover).lighten(0.08).toHex()
      };
  const classes = useStyles({ customColor });
  const reverserCustomColor = useGetReversedCustomColor(customColor);

  const format = useSelector(getTimeAndDateFromat);

  const nullityEventState = {
    title: '',
    iconName: 'week',
    color: '',
    value: Date.now(),
    variant: 'outlined' as LabelVariantType,
    id: nanoid()
  };
  const [eventState, setEventState] = useState(nullityEventState);

  const colorVariantsNames = ['', 'primary', 'secondary'];
  const iconNameVariants = ['', 'favorite'];
  const customColorValue = includes(colorVariantsNames, eventState.color) ? 'customColor' : eventState.color;

  const colorVariants = [
    { labelText: 'Default color', value: colorVariantsNames[0] },
    { labelText: 'Primary color', value: colorVariantsNames[1] },
    { labelText: 'Secondary color', value: colorVariantsNames[2] },
    { labelText: 'Custom color', value: customColorValue }
  ];

  const [value, setValue] = useState<any>(toFormat(Date.now(), format));
  const error = !isValid(eventState.value);

  const isLabelHaveIcon = eventState.iconName === iconNameVariants[0];

  const toNullityNewLabelState = () => {
    setEventState(nullityEventState);
  };

  const handleChangeDateValue = (value: any) => {
    setEventState(state => ({ ...state, value }));
  };

  const onChange = (date: MaterialUiPickersDate, value: string | null | undefined) => {
    handleChangeDateValue(date);
    setValue(value);
  };

  const onChangeOfEventTitleInput: ChangeEventHandler<HTMLInputElement> = ({ target: { value: title } }) => {
    setEventState(state => ({ ...state, title }));
  };

  const onChangeOfEventColorRadio: ChangeEventHandler<HTMLInputElement> = ({ target: { value: color } }) => {
    setEventState(state => ({ ...state, color }));
  };
  const onChangeOfEventIconNameSwitch = () => {
    setEventState(state => ({ ...state, iconName: isLabelHaveIcon ? iconNameVariants[1] : iconNameVariants[0] }));
  };

  const handleChangeEventIconName = (iconName: IconNameType) => {
    setEventState(state => ({ ...state, iconName }));
  };
  const handleChangeEventColor = (color: ColorType) => {
    setEventState(state => ({ ...state, color }));
  };

  const eventVariants: LabelVariantType[] = ['outlined', 'default'];

  const isEventOutlined = eventState.variant === eventVariants[0];
  const onChangeOfEventariantSwitch = () => {
    const variant = isEventOutlined ? eventVariants[1] : eventVariants[0];
    setEventState(state => ({ ...state, variant }));
  };
  const stepsArrOfDialogOfAddNewLabel = [
    {
      title: 'Enter the title',
      Component: FirstStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { value: eventState.title, onChange: onChangeOfEventTitleInput }
    },

    {
      title: 'Enter a default value ',
      Component: SecondStepOfSteperOfDialogOfAddNewGlobalEvent,
      componentProps: { value, onChange, format, error, customColor: reverserCustomColor }
    },
    {
      title: 'Chose a variant',
      Component: SecondStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { checked: isEventOutlined, onChange: onChangeOfEventariantSwitch }
    },
    {
      title: 'Chose a color',
      Component: ThirdStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { value: eventState.color, onChange: onChangeOfEventColorRadio, colorVariants },
      isAdditionalComponentHidden: eventState.color !== customColorValue,
      AdditionalComponent: ColorPickerByPas,
      additionalComponentProps: {
        handleSave: handleChangeEventColor
      }
    },
    {
      title: 'Chose an icon',
      Component: FourthStepOfSteperOfDialogOfAddNewLabel,
      isAdditionalComponentHidden: isLabelHaveIcon,
      AdditionalComponent: PreparedColorExamples,
      additionalComponentProps: {
        isColor: false,
        customColumnElementProps: {
          handleChangeLabelIconName: handleChangeEventIconName,
          labelIconName: eventState.iconName
        },
        CustomColumnElement: PreparedIconSelectingList,
        columnArr: iconsArr
      },
      componentProps: { checked: !isLabelHaveIcon, onChange: onChangeOfEventIconNameSwitch }
    }
  ];
  const steperProps = {
    stepsArrOfDialogOfAddNewLabel,
    toNullityNewLabelState,
    customColor: reverserCustomColor
  };

  const [icon] = useTakeIcon(eventState.iconName);

  const eventItemProps = {
    icon,
    title: eventState.title,
    value,
    variant: eventState.variant,
    parentBackgroundColor: customColor.bgHover,
    color: eventState.variant,
    customColor
  };

  const handleSave = () => {
    const minuteDiff = differenceInMinutes(Date.now(), eventState.value);
    const value = addMinutes(Date.now(), minuteDiff);
    dispatch(toAddGlobalEvent({ newEvent: { ...eventState, value } }));
    onClose();
  };

  const actionsButtonGroupProps = {
    onSave: handleSave,
    colorOfSaveButton: reverserCustomColor.secondaryColor,
    onClose,
    colorOfCloseButton: customColor?.unHover
  };

  return (
    <Dialog open={open} className={classes.container} onClose={onClose}>
      <DialogTitle>{'Creating new global event'}</DialogTitle>
      <SteperOfDialogOfAddNewLabel {...steperProps} />
      <DialogActions>
        <Grid container alignItems={'flex-end'}>
          <Box ml={1.4} display={'flex'} minWidth={216}>
            <EventItem {...eventItemProps} />
          </Box>
          <Grid>
            <ActionsButtonGroup {...actionsButtonGroupProps} />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ForLazyLoadingDialogOfAddingNewGlobalEvent;
