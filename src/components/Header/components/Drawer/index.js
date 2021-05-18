import PropTypes from 'prop-types';
import { Drawer, Grow, IconButton, makeStyles, Modal, useTheme, Zoom } from '@material-ui/core';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

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
  },
  modal: {
    backdropFilter: 'blur(4px)',
    // filter:'blur(4px)'
    transition: theme.transitions.create('backdropFilter', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    })
  }
}));

const HeaderDrawer = ({ isMenuOpen, handleDrawerClose, isMenuNavigationHasDialogView }) => {
  // const drawerWidth = takePercentage();

  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <Drawer
      className={classes.drawer}
      variant={'persistent'}
      anchor={'right'}
      open={isMenuOpen}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ArrowBackIosOutlinedIcon /> : <ArrowForwardIosOutlinedIcon />}
        </IconButton>
      </div>
    </Drawer>
  );

  if (!isMenuNavigationHasDialogView)
    return (
      <Modal open={isMenuOpen} className={classes.modal}>
        {drawer}
      </Modal>
    );
  return drawer;
};

HeaderDrawer.propTypes = {
  handleDrawerClose: PropTypes.func,
  isMenuOpen: PropTypes.bool
};

export default HeaderDrawer;
