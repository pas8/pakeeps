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
import { Grid } from '@material-ui/core';
import ViewLikeInTelegram from './components/ViewLikeInTelegram';

const useStyles = makeStyles(theme => ({
  root: ({ headerXsViewLikeIn }) => ({
    display: 'flex',
    marginBottom: headerXsViewLikeIn === 'telegram' && theme.spacing(4)
  }),
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
    width: ({ drawerWidth, isMenuNavigationHasDialogView }) =>
      isMenuNavigationHasDialogView && `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
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

const HeaderByPas = ({ setMenuOpenStatusThunk, isMenuOpen, isMenuNavigationHasDialogView, drawerWidth }) => {
  const [breakpoint] = useCustomBreakpoint();

  const handleDrawerOpen = () => setMenuOpenStatusThunk(true);
  const handleDrawerClose = () => setMenuOpenStatusThunk(false);

  const isSmallSize = breakpoint === 'xs';
  const headerXsViewLikeIn = 'pakeeps';
  const classes = useStyles({ isMenuNavigationHasDialogView, drawerWidth, headerXsViewLikeIn });

  return (
    <Grid className={classes.root} container>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })}>
        <Toolbar className={classes.toolBar}>
          {headerXsViewLikeIn === 'pakeeps' && (
            <>
              <MainBar handleDrawerOpen={handleDrawerOpen} isMenuOpen={isMenuOpen} isSmallSize={isSmallSize} />
              <HeaderSearch isSmallSize={isSmallSize} />
              <HeaderProfileUtils isSmallSize={isSmallSize} />
            </>
          )}
          {headerXsViewLikeIn === 'telegram' && (
            <ViewLikeInTelegram handleDrawerOpen={handleDrawerOpen} isMenuOpen={isMenuOpen} />
          )}
        </Toolbar>
      </AppBar>
      <HeaderDrawer
        isMenuOpen={isMenuOpen}
        handleDrawerClose={handleDrawerClose}
        isMenuNavigationHasDialogView={isMenuNavigationHasDialogView}
      />
    </Grid>
  );
};

HeaderByPas.propTypes = {
  isMenuOpen: PropTypes.bool,
  setMenuOpenStatusThunk: PropTypes.func
};

const mapStateToProps = ({
  app: { isMenuOpen, drawerWidth },
  settings: { headerXsViewLikeIn, isMenuNavigationHasDialogView }
}) => ({
  isMenuOpen,
  drawerWidth,
  headerXsViewLikeIn,
  isMenuNavigationHasDialogView
});

const mapDispatchToProps = dispatch => ({
  setMenuOpenStatusThunk: boolStatus => dispatch(setMenuOpenStatusThunk(boolStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderByPas);
