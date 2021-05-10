import { Typography } from '@material-ui/core';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  typography: {
    flexGrow: 1
  }
}));

const MainBar = ({ handleDrawerOpen, isMenuOpen }) => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        aria-label={'open drawer'}
        onClick={handleDrawerOpen}
        edge={'start'}
        className={clsx(classes.menuButton, isMenuOpen && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant={'h6'} className={classes.typography}>
        Pakeeps
      </Typography>
    </>
  );
};

MainBar.propTypes = {
  handleDrawerOpen: PropTypes.func,
  isMenuOpen: PropTypes.bool
};

export default MainBar;
