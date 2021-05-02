import PropTypes from 'prop-types';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import TextRotationNoneOutlinedIcon from '@material-ui/icons/TextRotationNoneOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import IconButtonByPas from 'components/IconButton';
import ColorPickerByPas from 'components/ColorPicker';
import PopoverAndMenu from 'components/IconsUtils/components/PopoverAndMenu';
import AlarmAddOutlinedIcon from '@material-ui/icons/AlarmAddOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import { Grid } from '@material-ui/core';

import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';

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
  keyName,
  iconName: iconNameOfEventElement,
  handlerOfEventButtonGroupIcon,
  KeyboardIcon
}) => {
  const buttonUtilsArr = [
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
      menuComponents: null,
      menuComponentsProps: { location, handlerOfEventButtonGroupIcon }
    },
    {
      icon: AlarmAddOutlinedIcon,
      popoverText: 'Add one more event',
      name: 'addOneMoreEvent',
      activeIcon: false,
      onlyPopover: true,
      onClick: addOneMoreEventFunc
    },
    {
      icon: CategoryOutlinedIcon,
      popoverText: 'Choose an icon',
      name: 'iconName',
      activeIcon: iconNameOfEventElement,
      onlyPopover: true,
      onClick: 'handlerOfEventButtonGroupIcon'
    },
    {
      icon: writingTitleStatus ? KeyboardIcon : TextRotationNoneOutlinedIcon,
      popoverText: 'Add a title',
      name: 'addTitle',
      activeIcon: writingTitleStatus,
      onClick: handlerOfTitleButton,
      onlyPopover: true
    }
  ];

  const wrapperOfPopoverAndMenuProps = {
    buttonUtilsArr,
    handlePopoverAndMenuState,
    isIconNameExtended: true,
    popoverAndMenuState,
    keyName
  };

  return (
    <Grid container justify={'space-between'}>
      <WrapperOfPopoverAndMenu {...wrapperOfPopoverAndMenuProps} />
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
