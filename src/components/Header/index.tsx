import PropTypes from 'prop-types';
import React, { FC } from 'react';
import clsx from 'clsx';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AppBar, makeStyles, Toolbar, Grid } from '@material-ui/core';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import HeaderSearch from './components/Search';
import HeaderDrawer from './components/Drawer';
import HeaderProfileUtils from './components/ProfileUtils';
import MainBar from './components/MainBar';
import ViewLikeInTelegram from './components/ViewLikeInTelegram';
import { toChangeMenuOpenStatus } from 'store/modules/App/actions';
import { getMenuOpenStatus } from 'store/modules/App/selectors';
import { HeaderByPasPropsType, UseStylesOfHeaderByPasType } from './components/types';
import { menuOpenStatusDenotation } from 'models/denotation';

const useStyles = makeStyles(theme => ({
  root: ({ navigationViewLikeTelegram }: HeaderByPasPropsType) => ({
    display: 'flex',
    marginBottom: navigationViewLikeTelegram ? theme.spacing(4) : 0
  }),
  appBar: {
    backgroundColor: '#424242',
    color: 'white',
    padding:0,  
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
    width: ({ isMenuOpen, drawerWidth, navigationViewLikeTelegram }: HeaderByPasPropsType) =>
      navigationViewLikeTelegram && isMenuOpen ? `calc(100% - ${drawerWidth}px)` : '',
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

const HeaderByPas: FC<HeaderByPasPropsType> = ({
  isMenuOpen,
  isMenuExtended,
  drawerWidth,
  navigationViewLikeGoogleKeep,
  navigationViewLikeTelegram,
  navigationViewLikePakeeps
}) => {
  const [breakpoint] = useCustomBreakpoint();

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    const menuOpenStatus = isMenuExtended ? menuOpenStatusDenotation.OPEN : menuOpenStatusDenotation.EXTENDED;
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus }));
  };
  // const handleDrawerClose = () => operateToChangeMenuOpenStatus(false);

  const isSmallSize = breakpoint === 'xs';

  //@ts-ignore
  const classes = useStyles({ drawerWidth, navigationViewLikeTelegram, navigationViewLikePakeeps, isMenuOpen });

  const isHeaderHavePakeepView = true;

  return (
    <Grid className={classes.root} container>
      {/* {isHeaderHavePakeepView ? ( */}
      <></>
      {/* ) : ( */}
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })}>
        <Toolbar className={classes.toolBar}>
          {(navigationViewLikePakeeps || navigationViewLikeGoogleKeep) && (
            <>
              <MainBar
                handleDrawerOpen={handleDrawerOpen}
                isMenuOpen={navigationViewLikePakeeps ? false : isMenuOpen}
                isSmallSize={isSmallSize}
              />
              <HeaderSearch />
              <HeaderProfileUtils isSmallSize={isSmallSize} />
            </>
          )}
          {/* {navigationViewLikeTelegram && (
              <ViewLikeInTelegram handleDrawerOpen={handleDrawerOpen} isMenuOpen={isMenuOpen} />
            )} */}
        </Toolbar>
      </AppBar>
      {/* )} */}
      {/* {navigationViewLikeTelegram && <HeaderDrawer isMenuOpen={isMenuOpen} handleDrawerClose={handleDrawerClose} />} */}
    </Grid>
  );
};

export default HeaderByPas;
