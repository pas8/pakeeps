import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMeasure } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, makeStyles, Toolbar, Grid } from '@material-ui/core';
import { toChangeHeaderHeigth } from 'store/modules/App/actions';
import { useRouter } from 'next/dist/client/router';

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
import { denotationOfCorrectLayoutCases } from 'layouts/RouterLayout/denotation';

import HeaderSearch from './components/Search';
import HeaderProfileUtils from './components/ProfileUtils';
import { HeaderByPasPropsType } from './types';
import dynamic from 'next/dynamic';
import { Skeleton } from '@material-ui/lab';


const MainBar = dynamic(() => import('./components/MainBar'), {
  loading: () => <Skeleton variant={'rect'} width={100} height={42} />
});



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
    display: 'flex',
    borderRadius
  },

  smallContainer: ({ pakeepDimensions }: any) => ({
    border: '1px solid',
    borderRadius,
    position: 'fixed',
    zIndex: 2,
    // backdropFilter: 'blur(4px)',
    background: palette.background.default,
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
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { isSizeSmall } = useBreakpointNames();

  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);
  const pakeepDimensions = useSelector(getPakeepDimensions);
  const isAuthedWithLocalPinCode = useSelector(getIsAuthedWithLocalPassword);
  const isZenModeActive = useSelector(getIsZenModeActive);

  const classes = useStyles({
    drawerWidth,
    isAuthedWithLocalPinCode,
    pakeepDimensions,
    navigationViewLikeTelegram,
    navigationViewLikePakeeps,
    isMenuOpen,
    isHeaderHavePaperColor
  });

  const property = usePropertyDueToRoute();
  const [ref, { height: headerHeight }] = useMeasure<HTMLDivElement>();
  const [isSeaching, setIsSeaching] = useState(false);

  const isHeaderHavePakeepView = true;
  const isRouteIsAuth = denotationOfCorrectLayoutCases.FOLDER_LAYOUT_HIDDEN === property || !isAuthedWithLocalPinCode;
  const isOnlySearchVisible = isSizeSmall && isSeaching;

  const headerSearchProps = {
    isSeaching,
    setIsSeaching,
    isOnlySearchVisible
  };

  useEffect(() => {
    dispatch(
      toChangeHeaderHeigth({
        headerHeight: isSizeSmall
          ? headerHeight + pakeepDimensions.container.paddingTop * 2
          : headerHeight + pakeepDimensions.container.paddingTop
      })
    );
  }, [headerHeight]);

  return (
    <Grid className={classes.root}>
      {  !isAuthedWithLocalPinCode ? <Grid ref={ref}/> :isSizeSmall && !isRouteIsAuth ? (
        <Grid className={classes.smallContainer} ref={ref} component={'header'}>
          <Grid alignItems={'center'} container justify={'space-between'}>
            <Grid>
              <Grid container>
                {!isSeaching && (
                  <MainBar isMenuExtended={isMenuExtended} isMenuOpen={isMenuOpen} isRouteIsAuth={isRouteIsAuth} />
                )}
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
              {!isOnlySearchVisible && (
                <MainBar isMenuExtended={isMenuExtended} isMenuOpen={isMenuOpen} isRouteIsAuth={isRouteIsAuth} />
              )}
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
