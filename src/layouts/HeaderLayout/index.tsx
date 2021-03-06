import { Grid, makeStyles } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useRouter } from 'next/dist/client/router';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import {
  getDrawerWidth,
  getHeaderHeight,
  getMenuOpenStatus,
  getPakeeps,
  getSelectedPakeeps,
  getSelectedPakeepsId
} from 'store/modules/App/selectors';
import HeaderWhenActiveSelecto from 'components/HeaderWhenActiveSelecto';
import { LayoutChildrenType } from 'models/types';
import { menuOpenStatusDenotation } from 'models/denotation';
import { AUTH_BASE_URL, BASE_URL } from 'layouts/RouterLayout/denotation';
import { Skeleton } from '@material-ui/lab';

const HeaderByPas = dynamic(() => import('components/Header'));

const useStyles = makeStyles(({ spacing, transitions, breakpoints, palette }) => ({
  '@global': {
    body: {
      minHeight: '80vh',
      // overflow: 'visible !important',
      overflowX: 'hidden !important',
      overflow: ({ isRouteIsBase }: any) => (isRouteIsBase ? 'hidden' : ''),
      background: palette.background.default,
      padding: '0 !important',
      scrollBehavior: 'smooth'
    },

    a: {
      color: 'inherit',
      textDecoration: 'none'
    },

    '*': {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,

      '&::-webkit-scrollbar': {
        height: '0.42em',
        width: '0.42em'
      },
      '&::-webkit-scrollbar-track': {
        border: 'none',
        background: 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '2em'
      },

      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      }
    },
    ul: {
      paddingTop: '0 !important',
      paddingBottom: '0 !important'
    },

    '.MuiBackdrop-root': {
      backdropFilter: 'blur(4px)'
    },

    // .MuiPickersCalendarHeader-switchHeader svg {
    //   transform: rotate(180deg);
    // }
    ' .MuiPickersModal-dialogRoot': {
      transform: 'scale(1.08)'
    },

    '.MuiSkeleton-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important'
    },

    // .MuiPickersTimePickerToolbar-hourMinuteLabelReverse {
    //   flex-direction: row !important;
    // }

    '.MuiPopover-paper': {
      overflow: 'visible !important'
    }
  },
  container: {
    '& header': {
      paddingRight: '0px !important'
    }
  },
  content: {
    flexGrow: 1,
    marginTop: ({ headerHeight }: any) => headerHeight
  }
}));

const HeaderLayout: FC<LayoutChildrenType> = ({ children }) => {
  const dispatch = useDispatch();

  const menuOpenStatus = useSelector(getMenuOpenStatus);
  const drawerWidth = useSelector(getDrawerWidth);
  const selectedPakeeps = useSelector(getSelectedPakeeps)!;
  const navigationViewLike = useSelector(getNavigationViewLike);
  const selectedPakeepsId = useSelector(getSelectedPakeepsId);
  const headerHeight = useSelector(getHeaderHeight);

  const navigationViewLikeTelegram = navigationViewLike === 'telegram';
  const navigationViewLikeGoogleKeep = navigationViewLike === 'googleKeep';
  const navigationViewLikePakeeps = navigationViewLike === 'pakeeps';

  const { route } = useRouter();

  const isRouteIsBase = route === BASE_URL;
  const isRouteIsAuthBase = route === AUTH_BASE_URL;

  const classes = useStyles({ drawerWidth, navigationViewLikeTelegram, headerHeight, isRouteIsBase });

  const isMenuExtended = menuOpenStatus === menuOpenStatusDenotation.EXTENDED;
  const isMenuOpen = menuOpenStatus === menuOpenStatusDenotation.OPEN;

  const headerByPasProps = {
    navigationViewLikeGoogleKeep,
    navigationViewLikeTelegram,
    navigationViewLikePakeeps,
    isMenuOpen,
    isMenuExtended,
    drawerWidth
  };
  const isShouldBeHeaderWhenActiveSelecto = selectedPakeeps.length > 0;

  const headerWhenActiveSelectoProps = {
    selectedPakeeps,
    selectedPakeepsId
  };

  return (
    <Grid className={classes.container}>
      {!isRouteIsAuthBase &&
        (isShouldBeHeaderWhenActiveSelecto ? (
          <HeaderWhenActiveSelecto {...headerWhenActiveSelectoProps} />
        ) : (
          <HeaderByPas {...headerByPasProps} />
        ))}
      <main className={clsx(classes.content)}>{children}</main>
    </Grid>
  );
};

export default HeaderLayout;
