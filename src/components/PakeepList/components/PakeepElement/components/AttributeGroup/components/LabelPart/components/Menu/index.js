import { Grid, makeStyles, Menu } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ColorPickerByPas from 'components/ColorChanger';
import HeaderOfAddDateToPakeep from 'components/IconsUtils/components/AddDateToPakeep/components/HeaderOfAddDateToPakeep';
import DynamicMenuItem from 'components/IconsUtils/components/AddDateToPakeep/components/DynamicMenuItem';
import ViewOfOutlineLabelIcon from 'components/Icons/components/ViewOfOutlineLabel';

const useStyles = makeStyles(theme => ({}));

const MenuOfLabelPart = ({ menuState, handleDeleteLabel, handleClose, handleChangeLabelColor: handleSave }) => {
  const classes = useStyles();

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
      title: 'Next week',
      icon: ViewOfOutlineLabelIcon,
      name: 'nextWeek',
      onClick:()=> console.log(';')
    },
    // { title: 'Add to dashboard', icon: DashboardOutlinedIcon, onClick: placeholderFunc, name: 'addToDashboard' },
    // {
    //   title: 'Add Date & Time',
    //   icon: EventNoteOutlinedIcon,
    //   onClick: placeholderFunc,
    //   dynamicComponent: { component: DynamicInputDateAndTimePickers, className: null, props: { onlyTime: false } },
    //   name: 'addDateAndTime'
    // },
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
      <HeaderOfAddDateToPakeep buttonSaveState={false} arrowButtonFunc={handleClose} dynamicTitle={'Label'} />
      {menuLabelListArr.map(({ title, icon: Icon, onClick, hidden, dynamicComponent = false, name }, idx) => {
        const DynamicComponent = dynamicComponent.component ?? Grid;

        const dynamicComponentProps = { ...dynamicComponent.props };

        const menuItemProps = {
          onClick
        };
        const DynamicMenuItemProps = {
          DynamicComponent,
          dynamicComponentProps,
          isActiveIcon:false, title,
          isDynamicComponentShouldBeShown: false,
          menuItemProps,
          isPreventClickOfMenuItem: false,
          Icon
        };
        return <DynamicMenuItem {...DynamicMenuItemProps} />;
      })}
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
