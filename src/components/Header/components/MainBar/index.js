import { Typography } from '@material-ui/core';
import { Grid, IconButton, makeStyles,Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(1)
  },
  hide: {
    display: 'none'
  },
  typography: {
    flexGrow: 1
  }
}));

const MainBar = ({ handleDrawerOpen, isMenuOpen,isSmallSize }) => {
  const classes = useStyles();

  return (
    <>
        <Tooltip title={'Open Menu'} >
      <IconButton
        aria-label={'open drawer'}
        onClick={handleDrawerOpen}
        edge={'start'}
        className={clsx(classes.menuButton, isMenuOpen && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      </Tooltip>
      {!isSmallSize && (
        <Typography variant={'h6'} className={classes.typography}>
          Pakeeps
        </Typography>
      )}
    </>
  );
};

MainBar.propTypes = {
  handleDrawerOpen: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  isSmallSize: PropTypes.bool
}

export default MainBar;
