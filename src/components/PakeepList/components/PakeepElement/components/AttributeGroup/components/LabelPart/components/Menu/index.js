import { Grid, Menu, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
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
import { themeColors } from 'components/theme';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';

const useStyles = makeStyles(theme => ({}));

const MenuOfLabelPart = ({
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
  const color = !menuState?.color ? themeColors.primaryMain : menuState.color;


const reversedCustomColor = useGetReversedCustomColor(customColor,true)

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
            customColor:reversedCustomColor
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
    customColor
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
      <Grid style={{ background: !!customColor ? customColor.bgHover : isThisMenuIsSecond && '#484848' }}>
        <HeaderOfAddDateToPakeep {...headerOfAddDateToPakeepProps} />

        {menuLabelListArr.map(
          ({ title, icon: Icon, onClick: onMenuItemClick, hidden, dynamicComponent = false, name }, idx) => {
            const DynamicComponent = dynamicComponent?.component ?? Grid;

            const correctName = name === menuItemState.name;
            const isDynamicComponentShouldBeShown = correctName && dynamicComponent.component;
            const dynamicComponentProps = { ...dynamicComponent.props, customColor:reversedCustomColor };
            const onClick = () =>
              onMenuItemClick ? onMenuItemClick() : setMenuItemState(state => ({ ...state, name }));
            const menuItemProps = {
              onClick
            };
            const DynamicMenuItemProps = {
              DynamicComponent,
              dynamicComponentProps,
              isActiveIcon: false,
              title,
              customColor,
              isDynamicItemGridMarginIsZero: true,
              isDynamicComponentShouldBeShown,
              menuItemProps,
              isPreventClickOfMenuItem: false,
              Icon
            };
            return <DynamicMenuItem {...DynamicMenuItemProps} />;
          }
        )}
      </Grid>
    </Menu>
  );
};

MenuOfLabelPart.propTypes = {
  handleClose: PropTypes.func,
  handleDeleteLabel: PropTypes.func,
  menuState: PropTypes.shape({
    id: PropTypes.string,
    mouseX: PropTypes.number,
    mouseY: PropTypes.number
  })
};

export default MenuOfLabelPart;
