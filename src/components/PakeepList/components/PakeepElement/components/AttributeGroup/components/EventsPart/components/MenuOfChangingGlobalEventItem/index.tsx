import { useSnackbar } from 'notistack';
import { format as toFormat, isValid, differenceInMinutes, addMinutes } from 'date-fns';
import { useTheme } from '@material-ui/core';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

import { toChangeGlobalEventItem, toDeleteGlobalEvent } from 'store/modules/App/actions';
import { useFindEventItem } from 'hooks/useFindEventItem.hook';
import { getTimeAndDateFromat, getTimeFormat } from 'store/modules/Settings/selectors';
import { DEFAULT, OUTLINED } from 'models/denotation';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import ColorPickerByPas from 'components/ColorChanger';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import ViewOfOutlineLabelIcon from 'components/Icons/components/ViewOfOutlineLabel';
import PreparedIconSelectingList from 'components/PreparedIconSelectingList';
import { iconsArr } from 'components/Icons';

import {
  HandleChangeLabelColorType,
  HandleChangeLabelIconNameType,
  MenuStateOfMenuOfChangingGlobalEventItemType,
  WrapperOfMenuOfLabelPartPropsType
} from './types';
import EventItem from '../PreviewEventList/components/EventItem';
import MenuOfChangingGlobalAttributeItem from 'components/MenuOfChangingGlobalAttributeItem';
import SecondStepOfSteperOfDialogOfAddNewGlobalEvent from '../DialogOfAddingNewGlobalEvent/components/SecondStepOfSteperOfDialogOfAddNewGlobalEvent';
import TitleChangerOfLabel from '../../../LabelPart/components/Menu/components/TitleChangerOfLabel';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';

const MenuOfChangingGlobalEventItem: FC<WrapperOfMenuOfLabelPartPropsType> = ({
  mouseX,
  mouseY,
  customColor,
  id,
  onClose
}) => {
  const dispatch = useDispatch();
  const timeAndDateFormat = useSelector(getTimeAndDateFromat);
  const timeFormat = useSelector(getTimeFormat);
  const findedEvent = useFindEventItem(id);
  const {
    palette: { primary, background, secondary }
  } = useTheme();

  const nullityOfMenuState = {
    value: Date.now(),
    variant: OUTLINED,
    iconName: '',
    color: DEFAULT,
    title: '',
    onlyTime: true,
    mouseX: 0,
    mouseY: 0,
    id: ''
  } as const;

  const [menuState, setMenuState] = useState<MenuStateOfMenuOfChangingGlobalEventItemType>(nullityOfMenuState);

  const format = menuState.onlyTime ? timeFormat : timeAndDateFormat;
  const [value, setValue] = useState<any>(toFormat(Date.now(), format));

  const error = !isValid(menuState.value);

  const { mouseX:top , mouseY: left, ...changedEvent } = menuState;

  useEffect(() => {
    setMenuState(state => ({ ...state, mouseX, mouseY, ...findedEvent }));
  }, [mouseX, mouseY, findedEvent]);

  const handleDeleteEvent = () => {
    dispatch(toDeleteGlobalEvent({ eventId: menuState.id }));
    onClose();
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSaveColor: HandleChangeLabelColorType = color => {
    setMenuState(state => ({ ...state, color }));
  };

  const handleChangeEventTitle: ChangeEventHandler<HTMLInputElement> = ({ target: { value: title } }) => {
    setMenuState(state => ({ ...state, title }));
  };

  const handleChangeEventIconName: HandleChangeLabelIconNameType = iconName => {
    setMenuState(state => ({ ...state, iconName }));
  };

  const handleChangeEventOnlyTimeStatus = () => {
    setMenuState(state => ({ ...state, onlyTime: !state.onlyTime }));
  };

  const handleChangeEventViewVariant = () => {
    const variant = menuState.variant === DEFAULT ? OUTLINED : DEFAULT;
    setMenuState(state => ({ ...state, variant }));
  };

  const handleChangeDateValue = (value: any) => {
    setMenuState(state => ({ ...state, value }));
  };

  const onChange = (date: MaterialUiPickersDate, value: string | null | undefined) => {
    handleChangeDateValue(date);
    setValue(value);
  };



  const onClickOfSaveButton = () => {
    try {
      dispatch(toChangeGlobalEventItem({ changedEvent }));
      enqueueSnackbar({ message: 'Event was successfully changed' });
    } catch (error) {
      enqueueSnackbar({ message: !error ? 'Something went wrong ' : error, severity: 'error' });
    }
  };

  const reverserCustomColor = useGetReversedCustomColor(customColor);

  const menuItemsArr = [
    {
      title: 'Change title',
      icon: ChatOutlinedIcon,
      name: 'CHANGE_LABEL_TITLE',
      dynamicComponent: {
        component: TitleChangerOfLabel,
        props: { onChange: handleChangeEventTitle, value: menuState.title }
      }
    },
    {
      title: 'Change a date variant',
      icon: TimelapseOutlinedIcon,
      onClick: handleChangeEventOnlyTimeStatus,
      name: 'CHANGE_A_DATE_VARIANT'
    },

    {
      title: 'Enter a default value',
      icon: ChangeHistoryIcon,
      name: 'ENTER_A_DEFAULT_EVENT_VALUE',
      dynamicComponent: {
        component: SecondStepOfSteperOfDialogOfAddNewGlobalEvent,
        props: {
          value,
          onChange,
          format,
          error,
          customColor: reverserCustomColor,
          color: customColor.isUseDefault ? secondary.main : ' '
        }
      }
    },
    {
      title: 'Change  a variant view',
      icon: ViewOfOutlineLabelIcon,
      name: 'changeLabelView',
      onClick: handleChangeEventViewVariant
    },

    {
      title: 'Change color',
      icon: PaletteOutlinedIcon,
      name: 'changeLabelColor',
      dynamicComponent: {
        component: ColorPickerByPas,
        props: { handleSave: handleSaveColor }
      }
    },
    {
      title: menuState.iconName ? 'Change icon' : 'Add icon',
      icon: CategoryOutlinedIcon,
      dynamicComponent: {
        component: PreparedColorExamples,
        props: {
          isColor: false,
          customColumnElementProps: {
            onClick: handleChangeEventIconName,
            selectedIconName: menuState.iconName,
            color: '',
            customColor
          },
          CustomColumnElement: PreparedIconSelectingList,
          columnArr: iconsArr
        }
      },
      name: 'CHANGE_EVENT_ICON'
    },

    {
      title: 'Delete global event',
      icon: DeleteOutlinedIcon,
      name: 'DELETE_GLOBAL_EVENT',
      onClick: handleDeleteEvent
    }
  ];
  const [icon] = useTakeIcon(menuState.iconName);
  const eventItemProps = {
    ...changedEvent,
    customColor,
    icon,
    value,
    parentBackgroundColor: customColor.isUseDefault ? background.default : customColor.bgHover
  };

  const menuOfChangingGlobalAttributeItemProps = {
    onClose,
    onSave: onClickOfSaveButton,
    id,
    customColor,
    top,
    left,
    menuItemsArr,
    customTitle: <EventItem {...eventItemProps} />
  };

  return <MenuOfChangingGlobalAttributeItem {...menuOfChangingGlobalAttributeItemProps} />;
};

export default MenuOfChangingGlobalEventItem;
