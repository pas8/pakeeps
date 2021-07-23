import { Grid, useTheme } from '@material-ui/core';
import { ChangeEventHandler, FC, useState } from 'react';
import { nanoid } from 'nanoid';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { toAddGlobalEvent } from 'store/modules/App/actions';
import { format as toFormat, isValid, differenceInMinutes, addMinutes } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { includes,isNumber } from 'lodash';
import { Skeleton } from '@material-ui/lab';
import { colord } from 'colord';
import { usePrevious, useToggle } from 'react-use';
import { useSnackbar } from 'notistack';

import { DEFAULT, OUTLINED, PRIMARY, SECONDARY } from 'models/denotation';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import FirstStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/First';
import ThirdStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Third';
import FourthStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Fourth';
import SecondStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Second';
import ColorPickerByPas from 'components/ColorChanger';
import { getTimeAndDateFromat, getTimeFormat } from 'store/modules/Settings/selectors';
import AttributeDialogContainer from 'components/AttributeDialogContainer';
import { SnackbarSeverityNames } from 'models/unums';
import { ColorType, IconNameType, LabelVariantType } from 'store/modules/App/types';
import { iconsArr } from 'components/Icons';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';

import SecondStepOfSteperOfDialogOfAddNewGlobalEvent from '../SecondStepOfSteperOfDialogOfAddNewGlobalEvent';
import { DialogOfAddingNewGlobalEventPropsType } from '../../types';
import EventItem from '../../../PreviewEventList/components/EventItem';
import PreparedIconSelectingList from '../../../../../../../../../../../PreparedIconSelectingList';
import FirstStepOfSteperOfDialogOfAddNewGlobalEvent from '../FirstStepOfSteperOfDialogOfAddNewGlobalEvent';

// const SteperOfDialogOfAddNewLabel = dynamic(
//   () => import('components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper'),
//   {
//     loading: () => <Skeleton variant={'rect'} width={400} height={400} />
//   }
// );

const ForLazyLoadingDialogOfAddingNewGlobalEvent: FC<DialogOfAddingNewGlobalEventPropsType> = ({
  customColor: notValidCustomColor,
  onClose
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    palette: { primary, background, secondary, text }
  } = useTheme();
  const customColor = notValidCustomColor.isUseDefault
    ? notValidCustomColor
    : {
        ...notValidCustomColor,
        bgUnHover: useIsColorLight(notValidCustomColor.bgUnHover)
          ? colord(notValidCustomColor.bgUnHover).darken(0.08).toHex()
          : colord(notValidCustomColor.bgUnHover).lighten(0.08).toHex()
      };
  const reverserCustomColor = useGetReversedCustomColor(customColor);

  const nullityEventState = {
    title: '',
    iconName: 'week',
    color: '',
    value: Date.now(),
    onlyTime: false,
    variant: 'outlined' as LabelVariantType,
    id: nanoid()
  };
  const timeAndDateFormat = useSelector(getTimeAndDateFromat);
  const timeFormat = useSelector(getTimeFormat);
  const [eventState, setEventState] = useState(nullityEventState);

  const format = eventState.onlyTime ? timeFormat : timeAndDateFormat;

  const colorVariantsNames = ['', PRIMARY, SECONDARY];
  const iconNameVariants = ['', 'favorite'];
  const customColorValue = includes(colorVariantsNames, eventState.color) ? 'customColor' : eventState.color;

  const colorVariants = [
    { labelText: 'Default color', value: colorVariantsNames[0] },
    { labelText: 'Primary color', value: colorVariantsNames[1] },
    { labelText: 'Secondary color', value: colorVariantsNames[2] },
    { labelText: 'Custom color', value: customColorValue }
  ];

  const [value, setValue] = useState<any>(toFormat(Date.now(), format));
  const isDateIsPast = isNumber(eventState.value) ? eventState.value :  eventState.value.getTime() < Date.now()
  const error = !isValid(eventState.value) || isDateIsPast

  const previuosNewEventState = usePrevious(eventState);

  const isLabelHaveIcon = eventState.iconName === iconNameVariants[0];

  const toNullityEventState = () => {
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
  const isEventOutlined = eventState.variant === OUTLINED;
  const onChangeOfEventVariantSwitch = () => {
    const variant = isEventOutlined ? DEFAULT : OUTLINED;
    setEventState(state => ({ ...state, variant }));
  };

  const onChangeOfEventariantSwitch = () => {
    setEventState(state => ({ ...state, onlyTime: !state.onlyTime }));
  };
  const stepsArrOfDialogOfAddNewLabel = [
    {
      title: 'Enter the title',
      Component: FirstStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { value: eventState.title, onChange: onChangeOfEventTitleInput }
    },
    {
      title: 'Chose a date variant',
      Component: FirstStepOfSteperOfDialogOfAddNewGlobalEvent,
      componentProps: { checked: eventState.onlyTime, onChange: onChangeOfEventariantSwitch }
    },
    {
      title: 'Enter a default value ',
      Component: SecondStepOfSteperOfDialogOfAddNewGlobalEvent,
      componentProps: {
        value,
        onChange,
        format,
        error,
        customColor: reverserCustomColor,
        color: customColor.isUseDefault ? secondary.main : ' '
      }
    },
    {
      title: 'Chose a view variant',
      Component: SecondStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { checked: isEventOutlined, onChange: onChangeOfEventVariantSwitch }
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
          onClick: handleChangeEventIconName,
          selectedIconName: eventState.iconName
        },
        CustomColumnElement: PreparedIconSelectingList,
        columnArr: iconsArr
      },
      componentProps: { checked: !isLabelHaveIcon, onChange: onChangeOfEventIconNameSwitch }
    }
  ];
  const steperProps = {
    stepsArrOfDialogOfAddNewLabel,
    toNullityNewLabelState: toNullityEventState,
    customColor: reverserCustomColor
  };

  const [icon] = useTakeIcon(eventState.iconName);

  const eventItemProps = {
    icon,
    title: eventState.title,
    value,
    variant: eventState.variant,
    parentBackgroundColor: customColor?.isUseDefault ? background.paper : customColor.bgHover,
    color: eventState.color,
    customColor
  };

  const handleSave = () => {
    if(isDateIsPast) return    enqueueSnackbar({ message: 'Date should be not in the past',severity: SnackbarSeverityNames.ERROR  });
          
    if(error) return    enqueueSnackbar({ message: 'Invalida date format',  severity: SnackbarSeverityNames.ERROR });

    const minuteDiff = differenceInMinutes(Date.now(), eventState.value);
    const value = addMinutes(Date.now(), minuteDiff).getTime()

    dispatch(toAddGlobalEvent({ newEvent: { ...eventState, value } }));
    enqueueSnackbar({ message: 'Global label was successfully added' });
    onClose();

    toNullityEventState();
  };

  const actionsButtonGroupProps = {
    onSave: handleSave,
    colorOfSaveButton: customColor?.isUseDefault ? primary.main : reverserCustomColor?.secondaryColor,
    onClose,
    colorOfCloseButton: customColor?.isUseDefault ? text.hint : customColor?.unHover
  };

  return (
    <AttributeDialogContainer
      {...actionsButtonGroupProps}
      nullityState={nullityEventState}
      snackBarMessage={'Dialog of creating event was closed '}
      state={eventState}
      setState={setEventState}
      customColor={customColor}
      previewComponent={<EventItem {...eventItemProps} />}
      steperProps={steperProps}
      title={'Add new global event'}
    />
  );
};

export default ForLazyLoadingDialogOfAddingNewGlobalEvent;
