import PropTypes from 'prop-types';
import IconButtonByPas from 'components/IconButton';
import PopoverAndMenu from '../PopoverAndMenu';
import { nanoid } from 'nanoid';
import { memo } from 'react';

const WrapperOfPopoverAndMenu = ({
  buttonUtilsArr,
  handlePopoverAndMenuState,
  popoverAndMenuState,
  keyName,
  isIconNameExtended = false,
  iconSize = 'default',
  handleAverageMainComponentWidth,
  customColor
}) => {
  return (
    <>
      {buttonUtilsArr.map(
        (
          {
            icon: Icon,
            popoverText,
            name: buttonUtilsName,
            onClick,
            ActiveIcon,
            isIconActive,
            onlyPopover = false,
            menuComponents: MenuComponents,
            menuComponentsProps,
            hidden = false,
            customElementComponentOfIconGroup = false,
            menuLocation,
            popoverLocation,
            rotateDeg = false,
            badgeContent = 0
          },
          idx
        ) => {
          if (hidden) return;
          if (customElementComponentOfIconGroup) return customElementComponentOfIconGroup;

          const menuComponents = !onlyPopover && MenuComponents && (
            <MenuComponents {...menuComponentsProps} onMenuClose={popoverAndMenuState.onMenuClose} />
          );

          const iconName = isIconNameExtended ? { keyName, buttonUtilsName } : buttonUtilsName;


          const isArctiveIconPresent = customColor && isIconActive && !!ActiveIcon
          const icon = isArctiveIconPresent ? ActiveIcon : Icon;

          const iconButtonProps = {
            icon,
            isArctiveIconPresent,
            badgeContent,
            customColor,
            onClick: onClick,
            iconName,
            rotateDeg,
            size: iconSize,
            isIconActive,
            activeIconName: popoverAndMenuState.name,
            activeProperty: popoverAndMenuState.popoverIsOpen,
            handleAverageMainComponentWidth
          };
          const mainComponent = <IconButtonByPas {...iconButtonProps} />;

          const popoverAndMenuProps = {
            name: iconName,
            key: idx,
            menuLocation,
            popoverLocation,
            popoverText,
            menuComponents,
            onlyPopover,
            handlePopoverAndMenuState,
            mainComponent
          };

          return <PopoverAndMenu {...popoverAndMenuProps} key={`${idx}-${buttonUtilsName}`} />;
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

export default memo( WrapperOfPopoverAndMenu);
