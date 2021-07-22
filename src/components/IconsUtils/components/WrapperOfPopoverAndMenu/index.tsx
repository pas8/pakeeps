import IconButtonByPas from 'components/IconButton';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { ClosePopoverOrMenuType } from 'models/types';
import { FC, MouseEvent, MouseEventHandler, ReactNode, useRef, useState } from 'react';
import { Optional } from 'utility-types';
import PopoverAndMenu from './components/PopoverAndMenu';
import { WrapperOfPopoverAndMenuType } from './types';

const WrapperOfPopoverAndMenu: FC<WrapperOfPopoverAndMenuType> = ({
  buttonUtilsArr,
  keyName,
  isIconNameExtended = false,
  iconSize = 'medium',
  handleAverageMainComponentWidth,
  customColor: notReversedCustomColor,
  isCustomColorReversed = false
}) => {
  const reversedColor = useGetReversedCustomColor(notReversedCustomColor);
  const customColor = isCustomColorReversed ? reversedColor : notReversedCustomColor;

  const nullityOfAnchorEl = {
    name: '',
    isMenuOpen: false,
    isPopoverOpen: false,
    onMenuClose: null,
    currentTarget: null,
    popoverText: '',
    cordinates: { left: 0, top: 0 },
    menuComponentsProps: {},
    MenuComponents: null as ReactNode
  };

  const [anchorElState, setAnchorElState] = useState<Optional<typeof nullityOfAnchorEl>>(nullityOfAnchorEl);

  const handleMenuClose: ClosePopoverOrMenuType = e => setAnchorElState(nullityOfAnchorEl);
  const handlePopoverClose = (e: any) => setAnchorElState(state => ({ ...state, isPopoverOpen: false }));

  const popoverAndMenuProps = { ...anchorElState, handleMenuClose, handlePopoverClose, customColor, reversedColor };
  return (
    <>
      {buttonUtilsArr.map(
        (
          {
            icon: Icon,
            popoverText: notActivePopoverText,
            name: buttonUtilsName,
            onClick,
            ActiveIcon,
            isIconActive,
            menuComponents: MenuComponents,
            menuComponentsProps,
            hidden = false,
            customElementComponentOfIconGroup = false,
            rotateDeg = 0,
            badgeContent = 0,
            activePopoverText = notActivePopoverText
          },
          idx
        ) => {
          if (hidden) return;
          if (customElementComponentOfIconGroup) return customElementComponentOfIconGroup;

          const iconName = isIconNameExtended ? { keyName, buttonUtilsName } : buttonUtilsName;

          const isArctiveIconPresent = !customColor.isUseDefault && isIconActive && !!ActiveIcon;
          const icon = isArctiveIconPresent ? ActiveIcon : Icon;
          const popoverText = isIconActive ? activePopoverText : notActivePopoverText;

          const allMenuComponentsProps = { onMenuClose: handleMenuClose, customColor, ...menuComponentsProps };

          const handlePopoverOpen: MouseEventHandler<HTMLElement> = ({ currentTarget, clientX: left, clientY: top }) =>
            setAnchorElState(state => ({
              ...state,
              cordinates: { left, top },
              currentTarget,
              isPopoverOpen: true,
              name: buttonUtilsName,
              popoverText
            }));

          const handleMenuOpen: MouseEventHandler<HTMLElement> = ({ clientX: left, clientY: top }) =>
            setAnchorElState(state => ({
              ...state,
              cordinates: { left, top },
              handleMenuClose,
              menuComponentsProps: allMenuComponentsProps,
              MenuComponents,
              name: buttonUtilsName,
              isMenuOpen: true,
              onMenuClose: null
            }));

          const iconButtonProps = {
            icon,
            isArctiveIconPresent,
            badgeContent,
            customColor,
            iconName,
            rotateDeg,
            size: iconSize,
            isIconActive,
            activeIconName: anchorElState.name,
            activeProperty: anchorElState.isPopoverOpen,
            handleAverageMainComponentWidth,
            onMouseEnter: handlePopoverOpen,
            onMouseLeave: handlePopoverClose,
            // ref: anchorElRef,
            onClick: onClick || handleMenuOpen
          };
          return <IconButtonByPas {...iconButtonProps} key={buttonUtilsName} />;
        }
      )}
      <PopoverAndMenu {...popoverAndMenuProps} />
    </>
  );
};

export default WrapperOfPopoverAndMenu;
