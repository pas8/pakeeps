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
          customColor
        }) => {
          if (hidden) return;

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

export default WrapperOfPopoverAndMenu;
