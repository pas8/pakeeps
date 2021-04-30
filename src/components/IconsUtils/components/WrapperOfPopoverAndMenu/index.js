import PropTypes from 'prop-types';
import IconButtonByPas from 'components/IconButton';
import PopoverAndMenu from '../PopoverAndMenu';

const WrapperOfPopoverAndMenu = ({
  buttonUtilsArr,
  handlePopoverAndMenuState,
  popoverAndMenuState,
  keyName,
  isIconNameExtended = false,
  iconSize = 'default'
}) => {
  return (
    <>
      {buttonUtilsArr.map(
        ({
          icon: Icon,
          popoverText,
          name: buttonUtilsName,
          onClick,
          activeIcon,
          onlyPopover = false,
          menuComponents: MenuComponents,
          menuComponentsProps,
          hidden = false,
          customColor,
          customElementComponentOfIconGroup = false
        }) => {
          if (hidden) return;
          if (customElementComponentOfIconGroup) return customElementComponentOfIconGroup;

          const iconName = isIconNameExtended ? { keyName, buttonUtilsName } : buttonUtilsName;
          const iconButtonProps = {
            icon: Icon,
            customColor,
            onClick: onClick,
            iconName,
            size: iconSize,
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
    </>
  );
};

WrapperOfPopoverAndMenu.propTypes = {
  CustomElementComponentOfIconGroup: PropTypes.oneOf(['bool', 'node']),
  buttonUtilsArr: PropTypes.shape({
    map: PropTypes.func
  }),
  customElementComponentOfIconGroupProps: PropTypes.node,
  handlePopoverAndMenuState: PropTypes.func,
  iconSize: PropTypes.string,
  isIconNameExtended: PropTypes.bool,
  keyName: PropTypes.any,
  popoverAndMenuState: PropTypes.shape({
    name: PropTypes.any,
    onMenuClose: PropTypes.func,
    popoverIsOpen: PropTypes.bool
  })
};

export default WrapperOfPopoverAndMenu;
