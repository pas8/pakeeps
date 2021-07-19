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
import {
  getFolderDimensions,
  getIsAuthedWithLocalPassword,
  getIsZenModeActive,
  getPakeepDimensions
} from 'store/modules/App/selectors';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { useAlpha } from 'hooks/useAlpha.hook';
import { usePropertyDueToRoute } from 'hooks/usePropertyDueToRoute.hook';

import { PakeepDimensionsType } from 'store/modules/App/types';
import { denotationOfCorrectLayoutCases } from 'layouts/RouterLayout/denotation';

const useStyles = makeStyles(({ spacing, palette, transitions, shape: { borderRadius }, breakpoints }) => ({
  root: ({ navigationViewLikeTelegram }: any) => ({
    display: 'flex',
    width: '100%'
    // marginBottom: navigationViewLikeTelegram ? spacing(4) : 0
  }),
  appBar: {
    backgroundColor: ({ isHeaderHavePaperColor }: any) =>
      isHeaderHavePaperColor ? palette.background.paper : palette.primary.main,
    color: palette.text.primary,
    padding: 0,
    display: 'flex',
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen
    })
  },
  toolBar: {
    flexGrow: 1
  },
  appBarShift: {
    width: ({ isMenuOpen, drawerWidth, navigationViewLikeTelegram }: any) =>
      navigationViewLikeTelegram && isMenuOpen ? `calc(100% - ${drawerWidth}px)` : '',
    // marginLeft: drawerWidth,
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen
    })
  },

  headerGroupFloatedToEnd: {
    // justifySelf: 'flex-end'
    display: 'flex',
    borderRadius
    // padding: spacing(3)
  },

  smallContainer: ({ pakeepDimensions }: any) => ({
    border: '1px solid',
    borderRadius,
    position: 'fixed',
    padding: spacing(0.2, 2),
    left: pakeepDimensions.container.paddingLeft,
    [breakpoints.down('xs')]: {
      top: pakeepDimensions.container.paddingTop / 1.42
    },
    top: pakeepDimensions.container.paddingTop,
    right: pakeepDimensions.container.paddingRight + pakeepDimensions.pakeepItem.gapX - 2,
    borderColor: useAlpha(palette.text.primary)
  })
}));

const HeaderByPas: FC<HeaderByPasPropsType> = ({
  isMenuOpen,
  isMenuExtended,
  drawerWidth,
  navigationViewLikeGoogleKeep,
  navigationViewLikeTelegram,
  navigationViewLikePakeeps
}) => {
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { isSizeSmall } = useBreakpointNames();
  const pakeepDimensions = useSelector(getPakeepDimensions);

  const classes = useStyles({
    drawerWidth,
    pakeepDimensions,
    navigationViewLikeTelegram,
    navigationViewLikePakeeps,
    isMenuOpen,
    isHeaderHavePaperColor
  });

  const isHeaderHavePakeepView = true;

  const isAuthedWithLocalPinCode = useSelector(getIsAuthedWithLocalPassword);

  const property = usePropertyDueToRoute();
  const isRouteIsAuth = denotationOfCorrectLayoutCases.FOLDER_LAYOUT_HIDDEN === property;

  const [ref, { height: headerHeight }] = useMeasure<HTMLDivElement>();
  useEffect(() => {
    dispatch(
      toChangeHeaderHeigth({
        headerHeight: isSizeSmall
          ? headerHeight + pakeepDimensions.container.paddingTop * 2
          : headerHeight + pakeepDimensions.container.paddingTop
      })
    );
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
    <Grid className={classes.root}>
      {isSizeSmall && !isRouteIsAuth ? (
        <Grid className={classes.smallContainer} ref={ref} component={'header'}>
          <Grid alignItems={'center'} container justify={'space-between'}>
            <Grid>
              <Grid container>
                {!isSeaching && <MainBar isMenuExtended={isMenuExtended} isMenuOpen={isMenuOpen} isRouteIsAuth={isRouteIsAuth}/>}
                <HeaderSearch {...headerSearchProps} />
              </Grid>
            </Grid>
            {!isSeaching && <HeaderProfileUtils />}
          </Grid>
        </Grid>
      ) : (
        <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })} ref={ref}>
          {!isZenModeActive && (
            <Toolbar className={classes.toolBar}>
              {!isOnlySearchVisible && <MainBar isMenuExtended={isMenuExtended} isMenuOpen={isMenuOpen} isRouteIsAuth={isRouteIsAuth} />}
              {!isRouteIsAuth && <HeaderSearch {...headerSearchProps} />}
              {!isRouteIsAuth && <HeaderProfileUtils />}
            </Toolbar>
          )}
        </AppBar>
      )}
    </Grid>
  );
};

export default HeaderByPas;
