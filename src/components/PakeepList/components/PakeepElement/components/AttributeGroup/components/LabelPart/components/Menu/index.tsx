import { Grid, Menu, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FC, ReactNode, useState } from 'react';
import { colord } from 'colord';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import { iconsArr } from 'components/Icons';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import ColorPickerByPas from 'components/ColorChanger';
import HeaderOfAddDateToPakeep from 'components/IconsUtils/components/AddDateToPakeep/components/HeaderOfAddDateToPakeep';
import DynamicMenuItem from 'components/IconsUtils/components/AddDateToPakeep/components/DynamicMenuItem';
import ViewOfOutlineLabelIcon from 'components/Icons/components/ViewOfOutlineLabel';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import LabelItem from '../LabelItem';
import PreparedIconSelectingList from './components/PreparedIconSelectingList';
import TitleChangerOfLabel from './components/TitleChangerOfLabel';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { MenuOfLabelPartPropsType, UseStylesType } from './types';

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: ({ customColor, isThisMenuIsSecond }: UseStylesType) => {
    const colorOfThisMenuIsSecond = '#484848';
    return {
      padding: spacing(0, 0, 0, 0),
      background: !customColor?.isUseDefault ? customColor?.bgHover : isThisMenuIsSecond ? colorOfThisMenuIsSecond : ''
    };
  }
}));

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
  isThisMenuIsSecond,
  customColor
}) => {
  const classes = useStyles({ customColor, isThisMenuIsSecond });

  const [primaryColor] = useThemeColors();

  const color = !menuState?.color ? primaryColor : menuState.color;

  const reversedCustomColor = useGetReversedCustomColor(customColor, true);

  const nullifyOfMenuItemState = { name: '' };
  const [menuItemState, setMenuItemState] = useState(nullifyOfMenuItemState);

  const menuLabelListArr = [
    {
      title: 'Change title',
      icon: ChatOutlinedIcon,
      name: 'changeLabelTitle',
      dynamicComponent: {
        component: TitleChangerOfLabel,
        props: { onChange: handleChangeLabelTitle, value: menuState.title, color }
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
      title: 'Change view',
      icon: ViewOfOutlineLabelIcon,
      name: 'changeLabelView',
      onClick: handleChangeLabelVariant
    },
    {
      title: menuState.labelIconName ? 'Change icon' : 'Add icon',
      icon: CategoryOutlinedIcon,
      dynamicComponent: {
        component: PreparedColorExamples,
        className: null,
        props: {
          isColor: false,
          customColumnElementProps: {
            handleChangeLabelIconName,
            labelIconName: menuState.labelIconName,
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
      title: 'Delete label',
      icon: DeleteOutlinedIcon,
      name: 'deletelabel',
      onClick: handleDeleteLabel
    }
  ];

  const previewLabelProps = {
    ...menuState,
    icon: useFindIcon(menuState.labelIconName),
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

  const headerOfAddDateToPakeepProps = {
    buttonSaveState: buttonSaveState,
    arrowButtonFunc: handleClose,
    isSaveButtonHidden: false,
    onClickOfSaveButton,
    customColor,
    customTitle: <LabelItem {...labelItemProps} />
  };

  return (
    <Menu
      keepMounted
      open={!!menuState.id}
      onClose={handleClose}
      anchorReference={'anchorPosition'}
      anchorPosition={
        menuState.mouseY !== null && menuState.mouseX !== null
          ? { top: menuState?.mouseY, left: menuState?.mouseX }
          : undefined
      }
    >
      <Grid className={classes.wrapper}>
        <HeaderOfAddDateToPakeep {...headerOfAddDateToPakeepProps} />

        {menuLabelListArr.map(({ title, icon: Icon, onClick: onMenuItemClick, dynamicComponent = {}, name }, idx) => {
          const DynamicComponent = dynamicComponent?.component ?? Grid;

          const correctName = name === menuItemState.name;
          const isDynamicComponentShouldBeShown = correctName && dynamicComponent.component;
          const dynamicComponentProps = { customColor: reversedCustomColor, ...dynamicComponent.props };

          const onClick = () => (onMenuItemClick ? onMenuItemClick() : setMenuItemState(state => ({ ...state, name })));

          const dynamicItemProps = { onClick };

          const DynamicMenuItemProps = {
            DynamicComponent,
            dynamicComponentProps,
            isActiveIcon: false,
            title,
            isDynamicItemGridMarginIsZero: true,
            isDynamicComponentShouldBeShown,
            dynamicItemProps,
            isPreventClickOfMenuItem: false,
            //@ts-ignore
            icon: <Icon />,
            customColor
          };
          //@ts-ignore
          return <DynamicMenuItem {...DynamicMenuItemProps} />;
        })}
      </Grid>
    </Menu>
  );
};

export default MenuOfLabelPart;
