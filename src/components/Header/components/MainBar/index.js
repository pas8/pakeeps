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

const MainBar = ({open,handleOpenStatusOFDrawer}) => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        aria-label={'open drawer'}
        onClick={handleOpenStatusOFDrawer}
        edge={'start'}
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant={'h6'} className={classes.typography}>
        Pakeeps  
      </Typography>
    </>
  );
};

MainBar.propTypes = {};

export default MainBar;
