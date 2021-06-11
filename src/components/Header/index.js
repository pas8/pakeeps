import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { AppBar,  makeStyles, Toolbar, Grid } from '@material-ui/core';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import { operateToChangeMenuOpenStatus } from 'store/modules/App/operations';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import HeaderSearch from './components/Search';
import HeaderDrawer from './components/Drawer';
import HeaderProfileUtils from './components/ProfileUtils';
import MainBar from './components/MainBar';
import ViewLikeInTelegram from './components/ViewLikeInTelegram';

const useStyles = makeStyles(theme => ({
  root: ({ navigationViewLikeTelegram }) => ({
    display: 'flex',
    marginBottom: navigationViewLikeTelegram && theme.spacing(4)
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
    width: ({ isMenuOpen, drawerWidth, navigationViewLikeTelegram }) =>
      navigationViewLikeTelegram && isMenuOpen && `calc(100% - ${drawerWidth}px)`,
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

const HeaderByPas = ({
  operateToChangeMenuOpenStatus,
  isMenuOpen,

  drawerWidth,
  navigationViewLikeGoogleKeep,
  navigationViewLikeTelegram,
  navigationViewLikePakeeps
}) => {
  const [breakpoint] = useCustomBreakpoint();

  const handleDrawerOpen = () => operateToChangeMenuOpenStatus(!isMenuOpen);
  const handleDrawerClose = () => operateToChangeMenuOpenStatus(false);

  const isSmallSize = breakpoint === 'xs';

  const classes = useStyles({ drawerWidth, navigationViewLikeTelegram, navigationViewLikePakeeps, isMenuOpen });

  return (
      <Grid className={classes.root} container>
        <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })}>
          <Toolbar className={classes.toolBar}>
            {(navigationViewLikePakeeps || navigationViewLikeGoogleKeep) && (
              <>
                <MainBar
                  handleDrawerOpen={handleDrawerOpen}
                  isMenuOpen={navigationViewLikePakeeps ? false : isMenuOpen}
                  isSmallSize={isSmallSize}
                />
                <HeaderSearch isSmallSize={isSmallSize} />
                <HeaderProfileUtils isSmallSize={isSmallSize} />
              </>
            )}
            {navigationViewLikeTelegram && (
              <ViewLikeInTelegram handleDrawerOpen={handleDrawerOpen} isMenuOpen={isMenuOpen} />
            )}
          </Toolbar>
        </AppBar>
        {navigationViewLikeTelegram && <HeaderDrawer isMenuOpen={isMenuOpen} handleDrawerClose={handleDrawerClose} />}
      </Grid>
  );
};

HeaderByPas.propTypes = {
  drawerWidth: PropTypes.number,
  isMenuOpen: PropTypes.bool,
  navigationViewLikeGoogleKeep: PropTypes.bool,
  navigationViewLikePakeeps: PropTypes.bool,
  navigationViewLikeTelegram: PropTypes.bool,
  operateToChangeMenuOpenStatus: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  operateToChangeMenuOpenStatus: boolStatus => dispatch(operateToChangeMenuOpenStatus(boolStatus))
});

export default connect(null, mapDispatchToProps)(HeaderByPas);
