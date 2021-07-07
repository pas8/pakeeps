import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  Typography,
  useTheme,
  Box
} from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ChangeEventHandler, FC, useState } from 'react';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { CustomColorType } from 'models/types';
import { DialogOfAddingNewGlobalEventPropsType, UseStylesOfDialogOfAddingNewGlobalEventType } from './types';
import { nanoid } from 'nanoid';
import SteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper';
import { useStyles } from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel';
import EventItem from '../PreviewEventList/components/EventItem';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import FirstStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/First';
import SecondStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Second';
import ThirdStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Third';
import FourthStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Fourth';
import ColorPickerByPas from 'components/ColorChanger';
import { includes } from 'lodash';
import { useSelector } from 'react-redux';
import { getTimeAndDateFromat } from 'store/modules/Settings/selectors';
import { ColorType, IconNameType } from 'store/modules/App/types';
import { iconsArr } from 'components/Icons';
import PreparedIconSelectingList from '../../../LabelPart/components/Menu/components/PreparedIconSelectingList';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { colord } from 'colord';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import SecondStepOfSteperOfDialogOfAddNewGlobalEvent from './components/SecondStepOfSteperOfDialogOfAddNewGlobalEvent';
import { format as toFormat, isValid } from 'date-fns';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// const useStyles = makeStyles(({ typography: { h5 }, palette }) => ({
//   eventTitleContainer: ({ customColor }: UseStylesOfDialogOfAddingNewGlobalEventType) => ({
//     '& input': {
//       ...h5,
//       color: customColor.isUseDefault ? palette.text.primary : customColor.hover,
//       caretColor: customColor.isUseDefault ? palette.primary.main : customColor.hover
//     }
//   })
// }));

const DialogOfAddingNewGlobalEvent: FC<DialogOfAddingNewGlobalEventPropsType> = ({
  open,
  customColor: notValidCustomColor,
  onClose
}) => {
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

  const [value, setValue] = useState<any>(Date.now());
  const error = !isValid(eventState.value);

  const isLabelHaveIcon = eventState.iconName === iconNameVariants[0];

  const toNullityNewLabelState = () => {
    setEventState(nullityEventState);
  };

  const handleChangeDateValue = (value: any) => {
    setEventState(state => ({ ...state, value }));
  };

  const onChange = (date: MaterialUiPickersDate, value: string | null | undefined) => {
    // console.log(value)
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

  const stepsArrOfDialogOfAddNewLabel = [
    {
      title: 'Enter the title',
      Component: FirstStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { value: eventState.title, onChange: onChangeOfEventTitleInput }
    },

    {
      title: 'Enter a default value ',
      Component: SecondStepOfSteperOfDialogOfAddNewGlobalEvent,
      componentProps: { value, onChange, format, error, customColor:reverserCustomColor }
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
    }
    // {
    //   title: 'Chose an icon',
    //   Component: FourthStepOfSteperOfDialogOfAddNewLabel,
    //   isAdditionalComponentHidden: isLabelHaveIcon,
    //   AdditionalComponent: PreparedColorExamples,
    //   additionalComponentProps: {
    //     isColor: false,
    //     customColumnElementProps: {
    //       handleChangeLabelIconName: handleChangeEventIconName,
    //       labelIconName: eventState.iconName
    //     },
    //     CustomColumnElement: PreparedIconSelectingList,
    //     columnArr: iconsArr
    //   },
    //   componentProps: { checked: !isLabelHaveIcon, onChange: onChangeOfEventIconNameSwitch }
    // }
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
    customColor
  };

  const handleSave = () => {
    console.log(eventState);
  };

  const actionsButtonGroupProps = {
    onSave: handleSave,
    colorOfSaveButton: reverserCustomColor.secondaryColor,
    onClose,
    colorOfCloseButton: customColor?.unHover
  };

  return (
    <Dialog open={open} className={classes.container} onClose={onClose}>
      <DialogTitle>
        {/* <Grid className={classes.eventTitleContainer}> */}
        {/* <Typography variant={'h6'}> */}
        Creating new global event
        {/* </Typography> */}
        {/* </Grid> */}
      </DialogTitle>

      {/* <DialogContent> */}
      <SteperOfDialogOfAddNewLabel {...steperProps} />
      {/* </DialogContent> */}
      <DialogActions>
        <Box ml={1.4} display={'flex'}>
          <EventItem {...eventItemProps} />
        </Box>
        <ActionsButtonGroup {...actionsButtonGroupProps} />
      </DialogActions>
    </Dialog>
  );
};

export default DialogOfAddingNewGlobalEvent;
// const menuLabelListArr = [
//   {
//     title: 'Change title',
//     dynamicComponent: {
//       // component: ,
//       props: { onChange: handleChangeLabelTitle, value: menuState.title, color }
//     }
//   },
//   {
//     title: 'Change color',
//     icon: PaletteOutlinedIcon,
//     name: 'changeLabelColor',
//     dynamicComponent: {
//       component: ColorPickerByPas,
//       props: { handleSave }
//     }
//   },
//   {
//     title: 'Change view',
//     icon: ViewOfOutlineLabelIcon,
//     name: 'changeLabelView',
//     onClick: handleChangeLabelVariant
//   },
//   {
//     title: menuState.labelIconName ? 'Change icon' : 'Add icon',
//     icon: CategoryOutlinedIcon,
//     dynamicComponent: {
//       component: PreparedColorExamples,
//       className: null,
//       props: {
//         isColor: false,
//         customColumnElementProps: {
//           handleChangeLabelIconName,
//           labelIconName: menuState.labelIconName,
//           color,
//           customColor
//         },
//         CustomColumnElement: PreparedIconSelectingList,
//         columnArr: iconsArr
//       }
//     },
//     name: 'changeLabelIcon'
//   },
//   {
//     title: 'Delete label',
//     icon: DeleteOutlinedIcon,
//     name: 'deletelabel',
//     onClick: handleDeleteLabel
//   }
// ];
