import { FC } from 'react';
import { Popover, Typography, Menu, makeStyles } from '@material-ui/core';
import { PopoverAndMenuType, UseStylesType } from './types';

const useStyles = makeStyles(theme => ({
  paper: ({ customColor }: UseStylesType) => ({
    padding: theme.spacing(0.6, 0.8),
    background: !customColor?.isUseDefault ? customColor?.hover : '',
    color: !customColor?.isUseDefault ? customColor?.bgUnHover : ''
    // border: '1px solid',
    // boxShadow: !useIsColorDark(customColor?.hover) && `0px 0px 2px 1px ${customColor?.bgUnHover}`,
    // borderColor:useIsColorDark(customColor?.hover) && customColor?.bgHover,
  }),
  popover: {
    pointerEvents: 'none'
  },
  menuContainer: ({ customColor }: UseStylesType) => ({
    '& > div': {
      backgroundColor: !customColor?.isUseDefault ? customColor?.hover : ''
    }
  })
}));

const PopoverAndMenu: FC<PopoverAndMenuType> = ({
  isMenuOpen,
  handlePopoverClose,
  isPopoverOpen,
  handleMenuClose,
  currentTarget,
  popoverText,
  menuComponentsProps,
  MenuComponents,
  popoverTypographyVariant = 'subtitle2',
  // menuLocation = 'default',
  // popoverLocation = 'default',
  customColor
}) => {
  if (!currentTarget) return null;
  const classes = useStyles({ customColor });

  const defaultLocationOfPopoverToWitCentered = {
    anchorOrigin: {
      vertical: 'bottom' as 'bottom',
      horizontal: 'center' as 'center'
    },
    transformOrigin: {
      vertical: 'top' as 'top',
      horizontal: 'center' as 'center'
    }
  };

  // const defaultLocationOfMenuToWitRightSite = {
  //   anchorOrigin: {
  //     vertical: 'top',
  //     horizontal: 'right'
  //   },
  //   transformOrigin: {
  //     vertical: 'top',
  //     horizontal: 'left'
  //   }
  // };

  // const leftSiteLocation = {
  //   anchorOrigin: {
  //     vertical: 'top',
  //     horizontal: 'right'
  //   },
  //   transformOrigin: {
  //     vertical: 'top',
  //     horizontal: 'left'
  //   }
  // };

  // const locationOfPopover =
  //   popoverLocation === 'default'
  //     ? defaultLocationOfPopoverToWitCentered
  //     : popoverLocation === 'left'
  //     ? leftSiteLocation
  //     : defaultLocationOfMenuToWitRightSite;

  // const locationOfMenu =
  //   menuLocation === 'default'
  //     ? defaultLocationOfMenuToWitRightSite
  //     : menuLocation === 'center'
  //     ? defaultLocationOfPopoverToWitCentered
  //     : leftSiteLocation;

  const popoverProps = {
    // ...locationOfPopover,
    ...defaultLocationOfPopoverToWitCentered,
    className: classes.popover,
    classes: { paper: classes.paper },

    open: isPopoverOpen!,
    anchorEl: currentTarget,
    onClose: handlePopoverClose,
    disableRestoreFocus: true
  };
  const menuProps = {
    // ...locationOfMenu,
    // ...defaultLocationOfMenuToWitRightSite,
    anchorEl: currentTarget,
    keepMounted: true,
    open: isMenuOpen!,
    onClose: handleMenuClose,
    className: classes.menuContainer
  };
  const allMenuComponentsProps = { ...menuComponentsProps, customColor };
  return (
    <>
  {!!currentTarget &&    <Popover {...popoverProps}>
        <Typography variant={popoverTypographyVariant}>{popoverText}</Typography>
      </Popover>}

      {!!MenuComponents  && (
        <Menu {...menuProps}>
          <MenuComponents {...allMenuComponentsProps} />
        </Menu>
      )}
    </>
  );
};

export default PopoverAndMenu;
