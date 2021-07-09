import PropTypes from 'prop-types';
import React, { FC, useEffect } from 'react';
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
import { toChangeHeaderHeigth, toChangeMenuOpenStatus } from 'store/modules/App/actions';
import { getMenuOpenStatus } from 'store/modules/App/selectors';
import { HeaderByPasPropsType, UseStylesOfHeaderByPasType } from './components/types';
import { menuOpenStatusDenotation, SIGN_IN_URL ,NEW_USER_URL} from 'models/denotation';
import { useRouter } from 'next/dist/client/router';
import { useMeasure } from 'react-use';

const useStyles = makeStyles(theme => ({
  root: ({ navigationViewLikeTelegram }: HeaderByPasPropsType) => ({
    display: 'flex',
    marginBottom: navigationViewLikeTelegram ? theme.spacing(4) : 0
  }),
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.maxEmphasis?.main,
    padding: 0,
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
  const { pathname } = useRouter();
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

  const isRouteIsSignIn = pathname === SIGN_IN_URL || pathname === NEW_USER_URL
  const [ref, { height: headerHeight }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    dispatch(toChangeHeaderHeigth({ headerHeight:headerHeight + 16 }));
  }, [headerHeight]);
  return (
    <Grid className={classes.root} container>
      {/* {isHeaderHavePakeepView ? ( */}
      <></>
      {/* ) : ( */}
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })} ref={ref}>
        <Toolbar className={classes.toolBar}>
          {(navigationViewLikePakeeps || navigationViewLikeGoogleKeep) && (
            <>
              <MainBar
                isMenuExtended={isMenuExtended}
                handleDrawerOpen={handleDrawerOpen}
                isMenuOpen={isMenuOpen}
                isSmallSize={isSmallSize}
              />
              {!isRouteIsSignIn && (
                <>
                  <HeaderSearch />
                  <HeaderProfileUtils />
                </>
              )}
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
