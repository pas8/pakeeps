import PropTypes from 'prop-types';
import IconButtonByPas from 'components/IconButton';
import PopoverAndMenu from './components/PopoverAndMenu';
import { nanoid } from 'nanoid';
import { memo, useState, useRef } from 'react';
import WrapperOfMainComponent from './components/WrapperOfMainComponent';
import includes from 'lodash.includes';

const WrapperOfPopoverAndMenu = ({
  buttonUtilsArr,
  keyName,
  isIconNameExtended = false,
  iconSize = 'default',
  handleAverageMainComponentWidth,
  customColor,
  arrOfButtonNamesWhichSholudBeHidden
}) => {
  const nullityOfAnchorEl = {
    name: '',
    isMenuOpen: false,
    isPopoverOpen: false,
    onMenuClose: null,
    currentTarget: null,
    popoverText: '',
    menuComponentsProps: null,
    MenuComponents: null
  };

  const [anchorElState, setAnchorElState] = useState(nullityOfAnchorEl);

  const handleMenuClose = () => setAnchorElState(nullityOfAnchorEl);
  const handlePopoverClose = () => setAnchorElState(state => ({ ...state, isPopoverOpen: false }));

  const popoverAndMenuProps = { ...anchorElState, handleMenuClose, handlePopoverClose };
  const anchorElRef = useRef(null);

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
            menuComponents: MenuComponents,
            menuComponentsProps: customMenuComponentsProps,
            hidden = false,
            customElementComponentOfIconGroup = false,
            rotateDeg = false,
            badgeContent = 0
          },
          idx
        ) => {
          if (includes(arrOfButtonNamesWhichSholudBeHidden, buttonUtilsName)) return;
          if (hidden) return;
          if (customElementComponentOfIconGroup) return customElementComponentOfIconGroup;

          const iconName = isIconNameExtended ? { keyName, buttonUtilsName } : buttonUtilsName;

          const isArctiveIconPresent = customColor && isIconActive && !!ActiveIcon;
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
            activeIconName: anchorElState.name,
            activeProperty: anchorElState.isPopoverOpen,
            handleAverageMainComponentWidth
          };
          const mainComponent = <IconButtonByPas {...iconButtonProps} />;
          const menuComponentsProps = { ...customMenuComponentsProps, onMenuClose: handleMenuClose };

          const handlePopoverOpen = ({ currentTarget }) =>
            setAnchorElState(state => ({
              ...state,
              currentTarget,
              isPopoverOpen: true,
              name: buttonUtilsName,
              popoverText
            }));

          const handleMenuOpen = ({ currentTarget }) =>
            setAnchorElState(state => ({
              ...state,
              currentTarget,
              handleMenuClose,
              menuComponentsProps,
              MenuComponents,
              name: buttonUtilsName,
              isMenuOpen: true,
              onMenuClose: null
            }));

          const wrapperOfMainComponentProps = {
            onMouseEnter: handlePopoverOpen,
            // onMouseLeave: !anchorEl.menu ? handlePopoverClose : null,

            onMouseLeave: handlePopoverClose,
            ref: anchorElRef,
            onClick: handleMenuOpen,
            key: buttonUtilsName
          };

          return <WrapperOfMainComponent {...wrapperOfMainComponentProps}>{mainComponent}</WrapperOfMainComponent>;
        }
      )}
      <PopoverAndMenu {...popoverAndMenuProps} />
    </>
  );
};

WrapperOfPopoverAndMenu.propTypes = {
  CustomElementComponentOfIconGroup: PropTypes.oneOf(['bool', 'node']),
  arrOfButtonNamesWhichSholudBeHidden: PropTypes.array,
  buttonUtilsArr: PropTypes.shape({
    map: PropTypes.func
  }),
  customColor: PropTypes.any,
  customElementComponentOfIconGroupProps: PropTypes.node,
  handleAverageMainComponentWidth: PropTypes.any,
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
