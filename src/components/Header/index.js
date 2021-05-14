import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderSearch from './components/Search';
import HeaderDrawer from './components/Drawer';
import HeaderProfileUtils from './components/ProfileUtils';
import MainBar from './components/MainBar';
import { connect } from 'react-redux';
import { setMenuOpenStatusThunk } from 'store/modules/App/operations';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    backgroundColor: '#424242',
    color: 'white',
    display: 'flex',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolBar: {
    flexGrow: 1
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  headerGroupFloatedToEnd: {
    // justifySelf: 'flex-end'
    display: 'flex'
    // padding: theme.spacing(3)
  }
}));

const HeaderByPas = ({ setMenuOpenStatusThunk, isMenuOpen }) => {
  const classes = useStyles();
  const [breakpoint] = useCustomBreakpoint();

  const handleDrawerOpen = () => setMenuOpenStatusThunk(true);
  const handleDrawerClose = () => setMenuOpenStatusThunk(false);

  const isSmallSize = breakpoint === 'xs';

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })}>
        <Toolbar className={classes.toolBar}>
          <MainBar handleDrawerOpen={handleDrawerOpen} isMenuOpen={isMenuOpen}  isSmallSize={isSmallSize}/>
          <HeaderSearch isSmallSize={isSmallSize} />
          <HeaderProfileUtils isSmallSize={isSmallSize} />
        </Toolbar>
      </AppBar>
      <HeaderDrawer isMenuOpen={isMenuOpen} handleDrawerClose={handleDrawerClose} />
    </div>
  );
};

HeaderByPas.propTypes = {
  isMenuOpen: PropTypes.bool,
  setMenuOpenStatusThunk: PropTypes.func
};

const mapStateToProps = ({ app: { isMenuOpen } }) => ({ isMenuOpen });

const mapDispatchToProps = dispatch => ({
  setMenuOpenStatusThunk: boolStatus => dispatch(setMenuOpenStatusThunk(boolStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderByPas);
