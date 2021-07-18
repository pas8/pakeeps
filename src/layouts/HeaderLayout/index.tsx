import HeaderByPas from 'components/Header/index';
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect, useDispatch, useSelector } from 'react-redux';
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
import { toCancelSelectingStatus, toChangeHeaderHeigth, toChangePinStatusOfPakeeps } from 'store/modules/App/actions';
import { FC, useEffect } from 'react';
import { LayoutChildrenType } from 'models/types';
import { menuOpenStatusDenotation } from 'models/denotation';
import { useMeasure } from 'react-use';
import { useRouter } from 'next/dist/client/router';
import { BASE_URL } from 'layouts/RouterLayout/denotation';

const useStyles = makeStyles(({ spacing, transitions, breakpoints, palette }) => ({
  '@global': {
    body: {
      minHeight: '80vh',
      // overflow: 'visible !important',
      overflowX: 'hidden !important',
      overflow: 'hidden',
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

  const classes = useStyles({ drawerWidth, navigationViewLikeTelegram, headerHeight });

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
    <Grid className={classes.container} >
      {isShouldBeHeaderWhenActiveSelecto ? (
        <HeaderWhenActiveSelecto {...headerWhenActiveSelectoProps} />
      ) : (
        <HeaderByPas {...headerByPasProps} />
      )}
      <main
        className={clsx(classes.content, {
          // [classes.contentShift]: isMenuOpen
        })}
      >
        {children}
      </main>
    </Grid>
  );
};

export default HeaderLayout;
