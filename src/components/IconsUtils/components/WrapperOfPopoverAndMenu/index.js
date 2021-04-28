import IconButtonByPas from 'components/IconButton';
import PopoverAndMenu from '../PopoverAndMenu';

const WrapperOfPopoverAndMenu = ({
  buttonUtilsArr,
  handlePopoverAndMenuState,
  popoverAndMenuState,
  keyName,
  isIconNameExtended = false
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
          hidden = false
        }) => {
          if (hidden) return;

          const iconName = isIconNameExtended ? { keyName, buttonUtilsName } : buttonUtilsName;
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
    </>
  );
};

export default WrapperOfPopoverAndMenu;
