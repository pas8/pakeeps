import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMeasure } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, makeStyles, Toolbar, Grid } from '@material-ui/core';
import { menuOpenStatusDenotation, SIGN_IN_URL, NEW_USER_URL } from 'models/denotation';
import { toChangeHeaderHeigth, toChangeMenuOpenStatus } from 'store/modules/App/actions';
import { useRouter } from 'next/dist/client/router';

import HeaderSearch from './components/Search';
import HeaderProfileUtils from './components/ProfileUtils';
import MainBar from './components/MainBar';
import { HeaderByPasPropsType } from './types';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { getIsZenModeActive, getPakeepDimensions } from 'store/modules/App/selectors';

const useStyles = makeStyles(theme => ({
  root: ({ navigationViewLikeTelegram }: any) => ({
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
    width: ({ isMenuOpen, drawerWidth, navigationViewLikeTelegram }: any) =>
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
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { isSizeSmall } = useBreakpointNames();
  const pakeepDimensions = useSelector(getPakeepDimensions);


  const classes = useStyles({ drawerWidth, navigationViewLikeTelegram, navigationViewLikePakeeps, isMenuOpen });

  const isHeaderHavePakeepView = true;

  const isRouteIsSignIn = pathname === SIGN_IN_URL || pathname === NEW_USER_URL;
  const [ref, { height: headerHeight }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    dispatch(toChangeHeaderHeigth({ headerHeight: headerHeight + pakeepDimensions.container.paddingTop }));
  }, [headerHeight]);

  const [isSeaching, setIsSeaching] = useState(false);

  const isOnlySearchVisible = isSizeSmall && isSeaching;

  const headerSearchProps = {
    isSeaching,
    setIsSeaching,
    isOnlySearchVisible
  };

  const isZenModeActive = useSelector(getIsZenModeActive);

  return (
    <Grid className={classes.root} container>
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })} ref={ref}>
        {!isZenModeActive && (
          <Toolbar className={classes.toolBar}>
            {!isOnlySearchVisible && (
              <MainBar isMenuExtended={isMenuExtended}  isMenuOpen={isMenuOpen} />
            )}
            {!isRouteIsSignIn && <HeaderSearch {...headerSearchProps} />}
            {(!isRouteIsSignIn || !isOnlySearchVisible) && <HeaderProfileUtils />}
          </Toolbar>
        )}
      </AppBar>
    </Grid>
  );
};

export default HeaderByPas;
