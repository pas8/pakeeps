import PropTypes from 'prop-types';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import TextRotationNoneOutlinedIcon from '@material-ui/icons/TextRotationNoneOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import IconButtonByPas from 'components/IconButton';
import ColorPickerByPas from 'components/ColorPicker';
import PopoverAndMenu from 'components/IconsUtils/components/PopoverAndMenu';
import AlarmAddOutlinedIcon from '@material-ui/icons/AlarmAddOutlined';
import { Grid } from '@material-ui/core';
import shortid from 'shortid';

const ButtonGroupUtilsOfDynamicAddMoreEvents = ({
  handlePopoverAndMenuState,
  writingTitleStatus,
  isInPatternList,
  popoverAndMenuState,
  addToPatternList,
  color,
  location,
  handlerOfTitleButton,
  addOneMoreEventFunc,
  keyName
}) => {
  const buttonUtils = [
    {
      icon: TextRotationNoneOutlinedIcon,
      popoverText: 'Add a title',
      name: 'addTitle',
      activeIcon: writingTitleStatus,
      onClick: handlerOfTitleButton
    },
    {
      icon: PaletteOutlinedIcon,
      popoverText: 'Set color',
      name: 'palette',
      activeIcon: isInPatternList,
      menuComponents: ColorPickerByPas,
      menuComponentsProps: { color }
    },
    {
      icon: PlaylistAddOutlinedIcon,
      popoverText: 'Add to pattern',
      name: 'pattern',
      activeIcon: isInPatternList,
      onlyPopover: true,
      onClick: addToPatternList
    },
    {
      icon: AddLocationOutlinedIcon,
      popoverText: 'Add location',
      name: 'location',
      activeIcon: location,
      menuComponents: null
    },
    {
      icon: AlarmAddOutlinedIcon,
      popoverText: 'Add one more event',
      name: 'addOneMoreEvent',
      activeIcon: false,
      onlyPopover: true,
      onClick: addOneMoreEventFunc
    }
  ];

  return (
    <Grid container justify={'space-between'}>
      {buttonUtils.map(
        ({
          icon: Icon,
          popoverText,
          name: buttonUtilsName,
          onClick,
          activeIcon,
          onlyPopover = false,
          menuComponents: MenuComponents,
          menuComponentsProps
        }) => {
          const iconName = { keyName, buttonUtilsName };
          const iconButtonProps = {
            icon: Icon,
            onClick: onClick,
            iconName,
            activeIcon,
            activeIconName: popoverAndMenuState.name,
            activeProperty: popoverAndMenuState.popoverIsOpen
          };

          const menuComponents = !onlyPopover && MenuComponents && (
            <MenuComponents {...menuComponentsProps} onMenuClose={popoverAndMenuState.onMenuClose} />
          );

          const mainComponent = <IconButtonByPas {...iconButtonProps} />;

          const popoverAndMenuProps = {
            name: iconName,
            popoverText,
            menuComponents,
            onlyPopover,
            handlePopoverAndMenuState,
            mainComponent
          };

          return <PopoverAndMenu {...popoverAndMenuProps} />;
        }
      )}
    </Grid>
  );
};

ButtonGroupUtilsOfDynamicAddMoreEvents.propTypes = {
  addToPatternList: PropTypes.any,
  color: PropTypes.any,
  handlePopoverAndMenuState: PropTypes.any,
  isInPatternList: PropTypes.any,
  location: PropTypes.any,
  popoverAndMenuState: PropTypes.shape({
    name: PropTypes.any,
    onMenuClose: PropTypes.any,
    popoverIsOpen: PropTypes.any
  }),
  writingTitleStatus: PropTypes.any
};

export default ButtonGroupUtilsOfDynamicAddMoreEvents;
