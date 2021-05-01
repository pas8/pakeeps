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
  popoverText,
  mainComponent,
  menuComponents,
  popoverTypographyVariant = 'subtitle2',
  onlyMenu = false,
  onlyPopover = false,
  handlePopoverAndMenuState,
  name,
  menuLocation = 'default',
  popoverLocation = 'default',
  popoverLevel = 'first'
}) => {
  const classes = useStyles();
  const anchorElRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState({ name, currentTarget: null, menu: false, popover: false });

  const handlePopoverOpen = ({ currentTarget }) => setAnchorEl(state => ({ ...state, currentTarget, popover: true }));

  const handlePopoverClose = () =>
    setAnchorEl(state => ({ ...state, currentTarget: null, menu: false, popover: false }));

  const handleMenuOpen = ({ currentTarget }) =>
    setAnchorEl(state => ({ ...state, currentTarget, menu: true, popover: false }));

  const handleMenuClose = () => setAnchorEl(state => ({ ...state, currentTarget: null, menu: false, popover: false }));
  useEffect(
    () =>
      handlePopoverAndMenuState({
        name,
        menuIsOpen: anchorEl.menu,
        popoverIsOpen: anchorEl.popover,
        onMenuClose: handleMenuClose
      }),
    [anchorEl]
  );
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

  const wrapperOfMainComponentProps = {
    'aria-haspopup': true,
    onMouseEnter: handlePopoverOpen,
    onMouseLeave: !anchorEl.menu ? handlePopoverClose : null,
    ref: anchorElRef,
    onClick: handleMenuOpen
  };

  const popoverProps = {
    ...locationOfPopover,
    className: classes.popover,
    classes: { paper: classes.padding },

    open: Boolean(anchorEl.currentTarget) && anchorEl.popover,
    anchorEl: anchorEl.currentTarget,
    onClose: handlePopoverClose,
    disableRestoreFocus: true
  };

  const menuProps = {
    ...locationOfMenu,
    anchorEl: anchorEl.currentTarget,
    keepMounted: true,
    open: Boolean(anchorEl) && anchorEl.menu,
    onClose: handleMenuClose
  };
  return (
    <>
      <Grid {...wrapperOfMainComponentProps}>{mainComponent}</Grid>

      {!onlyMenu && (
        <Popover {...popoverProps}>
          <Typography variant={popoverTypographyVariant}>{popoverText}</Typography>
        </Popover>
      )}

      {!onlyPopover && <Menu {...menuProps}>{menuComponents && menuComponents}</Menu>}
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
