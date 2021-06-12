import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Grid, Menu, makeStyles } from '@material-ui/core';
import { colord } from 'colord';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';

const useStyles = makeStyles(theme => ({
  paper: ({ customColor }) => ({
    padding: theme.spacing(0.6,0.8),
    background: customColor && customColor?.hover,
    color: customColor && customColor?.bgUnHover,
    // border: '1px solid',
    // boxShadow: !useIsColorDark(customColor?.hover) && `0px 0px 2px 1px ${customColor?.bgUnHover}`,
    // borderColor:useIsColorDark(customColor?.hover) && customColor?.bgHover,
  }),
  popover: {
    pointerEvents: 'none'
  },
  menuContainer: ({ customColor }) => ({
    '& > div': {
      backgroundColor: customColor?.hover
    }
  })
}));

const PopoverAndMenu = ({
  name,
  isMenuOpen,
  handlePopoverClose,
  isPopoverOpen,
  handleMenuClose,
  currentTarget,
  popoverText,
  menuComponentsProps,
  MenuComponents,
  popoverTypographyVariant = 'subtitle2',
  menuLocation = 'default',
  popoverLocation = 'default',
  popoverLevel = 'first',
  customColor
}) => {
  const classes = useStyles({ customColor });


  const defaultLocationOfPopoverToWitCentered = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center'
    }
  };

  const defaultLocationOfMenuToWitRightSite = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    }
  };

  const leftSiteLocation = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    }
  };

  const locationOfPopover =
    popoverLocation === 'default'
      ? defaultLocationOfPopoverToWitCentered
      : popoverLocation === 'left'
      ? leftSiteLocation
      : defaultLocationOfMenuToWitRightSite;

  const locationOfMenu =
    menuLocation === 'default'
      ? defaultLocationOfMenuToWitRightSite
      : menuLocation === 'center'
      ? defaultLocationOfPopoverToWitCentered
      : leftSiteLocation;

  const popoverProps = {
    ...locationOfPopover,
    className: classes.popover,
    classes: { paper: classes.paper },

    open: isPopoverOpen,
    anchorEl: currentTarget,
    onClose: handlePopoverClose,
    disableRestoreFocus: true
  };

  const menuProps = {
    ...locationOfMenu,
    anchorEl: currentTarget,
    keepMounted: true,
    open: isMenuOpen,
    onClose: handleMenuClose,
    className: classes.menuContainer
  };

  const allMenuComponentsProps = { ...menuComponentsProps, customColor };
  return (
    <>
      <Popover {...popoverProps}>
        <Typography variant={popoverTypographyVariant}>{popoverText}</Typography>
      </Popover>

      {!!MenuComponents && (
        <Menu {...menuProps}>
          <MenuComponents {...allMenuComponentsProps} />
        </Menu>
      )}
    </>
  );
};

PopoverAndMenu.propTypes = {
  handlePopoverAndMenuState: PropTypes.func,
  mainComponent: PropTypes.any,
  menuComponents: PropTypes.any,
  menuLocation: PropTypes.string,
  name: PropTypes.string,
  onlyMenu: PropTypes.bool,
  onlyPopover: PropTypes.bool,
  popoverLocation: PropTypes.string,
  popoverText: PropTypes.string,
  popoverTypographyVariant: PropTypes.string
};

export default PopoverAndMenu;
