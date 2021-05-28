import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Grid, Menu, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none'
  },
  padding: {
    padding: theme.spacing(0.8)
  }
}));

const PopoverAndMenu = ({
  name,
  isMenuOpen,
  handlePopoverClose,
  isPopoverOpen,
  handleMenuClose,
  currentTarget,
  popoverText,
  menuComponents,

  popoverTypographyVariant = 'subtitle2',
  menuLocation = 'default',
  popoverLocation = 'default',
  popoverLevel = 'first'
}) => {
  const classes = useStyles();

  // useEffect(
  //   () =>
  //     handlePopoverAndMenuState({
  //       name,
  //       menuIsOpen: anchorEl.menu,
  //       popoverIsOpen: anchorEl.popover,
  //       onMenuClose: handleMenuClose
  //     }),
  //   [anchorEl]
  // );
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
    classes: { paper: classes.padding },

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
    onClose: handleMenuClose
  };
  return (
    <>
      <Popover {...popoverProps}>
        <Typography variant={popoverTypographyVariant}>{popoverText}</Typography>
      </Popover>

      {!!menuComponents && <Menu {...menuProps}>{menuComponents && menuComponents}</Menu>}
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
