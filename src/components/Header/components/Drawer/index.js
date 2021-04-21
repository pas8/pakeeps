import PropTypes from 'prop-types';
import { Drawer, IconButton, makeStyles, useTheme } from '@material-ui/core';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { takePercentage } from 'hooks/takePercentage.hook';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '240px',
    flexShrink: 0
  },
  drawerPaper: {
    width: '240px'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}));

const HeaderDrawer = ({ open, handleDrawerClose }) => {
  // const drawerWidth = takePercentage();

  const classes = useStyles();
  const theme = useTheme();
  return (
    <Drawer
      className={classes.drawer}
      variant={'persistent'}
      anchor={'right'}
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ArrowBackIosOutlinedIcon /> : <ArrowForwardIosOutlinedIcon />}
        </IconButton>
      </div>
      ewfjkhjhkwefbvwefvnm
    </Drawer>
  );
};

HeaderDrawer.propTypes = {
  handleDrawerClose: PropTypes.func,
  open: PropTypes.bool
};

export default HeaderDrawer;
