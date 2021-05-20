import { Grid, makeStyles, Menu } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ColorPickerByPas from 'components/ColorChanger';
import HeaderOfAddDateToPakeep from 'components/IconsUtils/components/AddDateToPakeep/components/HeaderOfAddDateToPakeep';
import DynamicMenuItem from 'components/IconsUtils/components/AddDateToPakeep/components/DynamicMenuItem';
import ViewOfOutlineLabelIcon from 'components/Icons/components/ViewOfOutlineLabel';
import { useState } from 'react';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import PreparedIconSelectingList from './components/PreparedIconSelectingList';
import { iconsArr } from 'components/Icons';
const useStyles = makeStyles(theme => ({}));

const MenuOfLabelPart = ({
  menuState,
  handleDeleteLabel,
  handleClose,
  handleChangeLabelColor: handleSave,
  handleChangeLabelVariant,
  handleChangeLabelIconName
}) => {
  const classes = useStyles();
  const nullifyOfMenuItemState = {
    name: ''
  };
  const [menuItemState, setMenuItemState] = useState(nullifyOfMenuItemState);

  const menuLabelListArr = [
    {
      title: 'Delete label',
      icon: DeleteOutlinedIcon,
      name: 'deletelabel',
      onClick: handleDeleteLabel
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
      title: menuState.labelIconName ?  'Change icon' : 'Add icon',
      icon: CategoryOutlinedIcon,
      dynamicComponent: {
        component: PreparedColorExamples,
        className: null,
        props: {
          isColor: false,
          customColumnElementProps: { handleChangeLabelIconName },
          CustomColumnElement: PreparedIconSelectingList,
          columnArr: iconsArr
        }
      },
      name: 'changeLabelIcon'
    }

    // { title: 'Add Location', icon: AddLocationOutlinedIcon, onClick: placeholderFunc, name: 'addLocation' },
    // {
    //   title: 'Add More Events',
    //   icon: DateRangeOutlinedIcon,
    //   hidden: !true,
    //   name: 'addMoreEvents',
    //   dynamicComponent: {
    //     component: DynamicAddMoreEvents,
    //     className: null,
    //     props: { onlyTime: false, onChangeOfAddMoreEvents }
    //   }
    // }
  ];

  // DynamicComponent,
  //   dynamicComponentProps,
  //   title,
  //   isActiveIcon,
  //   isDynamicComponentShouldBeShown,
  //   menuItemProps,
  //   (isPreventClickOfMenuItem = false),
  //   Icon;

  return (
    <Menu
      keepMounted
      open={menuState.id !== null}
      onClose={handleClose}
      anchorReference={'anchorPosition'}
      anchorPosition={
        menuState.mouseY !== null && menuState.mouseX !== null
          ? { top: menuState?.mouseY, left: menuState?.mouseX }
          : undefined
      }
    >
      <HeaderOfAddDateToPakeep
        buttonSaveState={false}
        arrowButtonFunc={handleClose}
        dynamicTitle={'Label'}
        isSaveButtonHidden
      />
      {menuLabelListArr.map(
        ({ title, icon: Icon, onClick: onMenuItemClick, hidden, dynamicComponent = false, name }, idx) => {
          const DynamicComponent = dynamicComponent?.component ?? Grid;

          const correctName = name === menuItemState.name;
          const isDynamicComponentShouldBeShown = correctName && dynamicComponent.component;
          const dynamicComponentProps = { ...dynamicComponent.props };
          const onClick = () => (onMenuItemClick ? onMenuItemClick() : setMenuItemState(state => ({ ...state, name })));
          const menuItemProps = {
            onClick
          };
          const DynamicMenuItemProps = {
            DynamicComponent,
            dynamicComponentProps,
            isActiveIcon: false,
            title,
            isDynamicItemGridMarginIsZero: true,
            isDynamicComponentShouldBeShown,
            menuItemProps,
            isPreventClickOfMenuItem: false,
            Icon
          };
          return <DynamicMenuItem {...DynamicMenuItemProps} />;
        }
      )}
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
