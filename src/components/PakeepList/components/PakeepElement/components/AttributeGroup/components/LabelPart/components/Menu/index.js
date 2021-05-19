import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ColorPickerByPas from 'components/ColorChanger';

const useStyles = makeStyles(theme => ({}));

const MenuOfLabelPart = ({ menuState, handleDeleteLabel, handleClose }) => {
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
      icon: ViewWeekOutlinedIcon,
      name: 'nextWeek',
      dynamicComponent: {
        component: DynamicInputDateAndTimePickers,
        className: null,
        props: { onlyTime: false }
      }
    },
    { title: 'Add to dashboard', icon: DashboardOutlinedIcon, onClick: placeholderFunc, name: 'addToDashboard' },
    {
      title: 'Add Date & Time',
      icon: EventNoteOutlinedIcon,
      onClick: placeholderFunc,
      dynamicComponent: { component: DynamicInputDateAndTimePickers, className: null, props: { onlyTime: false } },
      name: 'addDateAndTime'
    },
    { title: 'Add Location', icon: AddLocationOutlinedIcon, onClick: placeholderFunc, name: 'addLocation' },
    {
      title: 'Add More Events',
      icon: DateRangeOutlinedIcon,
      hidden: !true,
      name: 'addMoreEvents',
      dynamicComponent: {
        component: DynamicAddMoreEvents,
        className: null,
        props: { onlyTime: false, onChangeOfAddMoreEvents }
      }
    }
  ];

  DynamicComponent,
    dynamicComponentProps,
    title,
    isActiveIcon,
    isDynamicComponentShouldBeShown,
    menuItemProps,
    (isPreventClickOfMenuItem = false),
    Icon;

  return (
    <Menu
      keepMounted
      open={menuState.id !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        menuState.mouseY !== null && menuState.mouseX !== null
          ? { top: menuState.mouseY, left: menuState.mouseX }
          : undefined
      }
    >
      <HeaderOfAddDateToPakeep buttonSaveState={false} arrowButtonFunc={handleClose} dynamicTitle={'Label'} />
      <MenuItem onClick={handleDeleteLabel}>Delete label</MenuItem>
      <MenuItem onClick={handleClose}>Print</MenuItem>
      <MenuItem onClick={handleClose}>Highlight</MenuItem>
      <MenuItem onClick={handleClose}>Email</MenuItem>
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
