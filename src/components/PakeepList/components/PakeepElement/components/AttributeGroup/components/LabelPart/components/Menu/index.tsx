import { Grid, Menu, makeStyles } from '@material-ui/core';
import { FC, useState } from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import { iconsArr } from 'components/Icons';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import ColorPickerByPas from 'components/ColorChanger';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import HeaderOfAddDateToPakeep from 'components/IconsUtils/components/AddDateToPakeep/components/HeaderOfAddDateToPakeep';
import DynamicMenuItem from 'components/IconsUtils/components/AddDateToPakeep/components/DynamicMenuItem';
import ViewOfOutlineLabelIcon from 'components/Icons/components/ViewOfOutlineLabel';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import LabelItem from '../LabelItem';
import PreparedIconSelectingList from '../../../../../../../../../PreparedIconSelectingList';
import TitleChangerOfLabel from './components/TitleChangerOfLabel';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { MenuOfLabelPartPropsType, UseStylesOfMenuOfLabelPartPropsTypeType } from './types';
import MenuOfChangingGlobalAttributeItem from 'components/MenuOfChangingGlobalAttributeItem';

const MenuOfLabelPart: FC<MenuOfLabelPartPropsType> = ({
  menuState,
  handleDeleteLabel,
  handleClose,
  handleChangeLabelColor: handleSave,
  handleChangeLabelVariant,
  handleChangeLabelIconName,
  buttonSaveState,
  onClickOfSaveButton,
  handleChangeLabelTitle,
  customColor
}) => {
  const [primaryColor] = useThemeColors();

  const color = !menuState?.color ? primaryColor : menuState.color;

  const menuItemsArr = [
    {
      title: 'Change title',
      icon: ChatOutlinedIcon,
      name: 'changeLabelTitle',
      dynamicComponent: {
        component: TitleChangerOfLabel,
        // props: { onChange: handleChangeLabelTitle, value: menuState.title, color }
        props: { onChange: handleChangeLabelTitle, value: menuState.title }
      }
    },
    {
      title: 'Change color',
      icon: PaletteOutlinedIcon,
      name: 'changeLabelColor',
      dynamicComponent: {
        component: ColorPickerByPas,
        props: { handleSave }
      }
    },
    {
      title: 'Change variant view',
      icon: ViewOfOutlineLabelIcon,
      name: 'changeLabelView',
      onClick: handleChangeLabelVariant
    },
    {
      title: menuState.iconName ? 'Change icon' : 'Add icon',
      icon: CategoryOutlinedIcon,
      dynamicComponent: {
        component: PreparedColorExamples,
        props: {
          isColor: false,
          customColumnElementProps: {
            onClick: handleChangeLabelIconName,
            selectedIconName: menuState.iconName,
            color,
            customColor
          },
          CustomColumnElement: PreparedIconSelectingList,
          columnArr: iconsArr
        }
      },
      name: 'changeLabelIcon'
    },
    {
      title: 'Delete global  label',
      icon: DeleteOutlinedIcon,
      name: 'deletelabel',
      onClick: handleDeleteLabel
    }
  ];

  const previewLabelProps = {
    ...menuState,
    icon: useFindIcon(menuState.iconName),
    label: menuState.title,
    size: 'small'
  };

  const labelItemProps = {
    currentColor: menuState.color,
    handleOpen: null,
    labelChipProps: previewLabelProps,
    parentBackgrounColor: customColor?.bgHover,
    customColor,
    aplyMargin: false
  };

  const menuOfChangingGlobalAttributeItemProps = {
    onClose: handleClose,
    onSave: onClickOfSaveButton,
    customColor,
    top: menuState.mouseY,
    left: menuState.mouseX,
    menuItemsArr,
    //@ts-ignore
    customTitle: <LabelItem {...labelItemProps} />
  };

  return <MenuOfChangingGlobalAttributeItem {...menuOfChangingGlobalAttributeItemProps} />;
};

export default MenuOfLabelPart;
