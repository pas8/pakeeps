import { useEffect,useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1)
  }
}));

const PopoverAndMenu = ({
  popoverName,
  menuName,
  popoverText,
  mainComponent,
  menuComponents,
  popoverTypographyVariant = 'subtitle2',
  onlyMenu = false,
  onlyPopover = false,
  handlePopoverAndMenuState,
  name
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState({ name, currentTarget: null, menu: false, popover: false });

  const handlePopoverOpen = ({ currentTarget }) => setAnchorEl(state => ({ ...state, currentTarget, popover: true }));

  const handlePopoverClose = () =>
    setAnchorEl(state => ({ ...state, currentTarget: null, menu: false, popover: false }));

  const handleMenuOpen = ({ currentTarget }) =>
    setAnchorEl(state => ({ ...state, currentTarget, menu: true, popover: false }));

  const handleMenuClose = () => setAnchorEl(state => ({ ...state, currentTarget: null, menu: false, popover: false }));
console.log(name)
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

  return (
    <>
      <Grid
        // aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup={'true'}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={!anchorEl.menu ? handlePopoverClose : null}
        onClick={handleMenuOpen}
      >
        {mainComponent}
      </Grid>
      {!onlyMenu && (
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          open={Boolean(anchorEl.currentTarget) && anchorEl.popover}
          anchorEl={anchorEl.currentTarget}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography variant={popoverTypographyVariant}>{popoverText}</Typography>
        </Popover>
      )}
      {!onlyPopover && (
        <Menu
          anchorEl={anchorEl.currentTarget}
          keepMounted
          open={Boolean(anchorEl) && anchorEl.menu}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          {menuComponents && menuComponents}
        </Menu>
      )}
    </>
  );
};

export default PopoverAndMenu;
