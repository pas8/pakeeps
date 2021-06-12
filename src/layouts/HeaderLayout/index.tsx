import HeaderByPas from 'components/Header/index';
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import {
  getDrawerWidth,
  getMenuOpenStatus,
  getPakeeps,
  getSelectedPakeeps,
  getSelectedPakeepsId
} from 'store/modules/App/selectors';
import HeaderWhenActiveSelecto from 'components/HeaderWhenActiveSelecto';
import { toCancelSelectingStatus, toChangePinStatusOfPakeeps } from 'store/modules/App/actions';
import { FC } from 'react';
import { LayoutChildrenType } from 'models/types';

const useStyles = makeStyles(({ spacing, transitions, breakpoints }) => ({
  container: {
    '& header': {
      paddingRight: '0px !important'
    }
  },
  content: {
    flexGrow: 1,
    padding: spacing(2.8),
    transition: transitions.create('margin', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen
    }),

    // marginLeft: ({ isMenuNavigationHasDialogView, drawerWidth }) => isMenuNavigationHasDialogView && drawerWidth,
    [breakpoints.between('xs', 'sm')]: {
      padding: spacing(1.8)
    },
    [breakpoints.down('md')]: {
      padding: spacing(2)
    }
    // [breakpoints.down('sm')]: {
    //   padding: spacing(1.8),
    // }
  },
  contentShift: {
    transition: transitions.create('margin', {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen
    }),
    marginLeft: ({
      drawerWidth,
      navigationViewLikeTelegram
    }: {
      drawerWidth: number;
      navigationViewLikeTelegram: boolean;
    }) => (navigationViewLikeTelegram ? drawerWidth : 0)
  }
}));

const HeaderLayout: FC<LayoutChildrenType> = ({ children }) => {
  const dispatch = useDispatch();

  const isMenuOpen = useSelector(getMenuOpenStatus);
  const drawerWidth = useSelector(getDrawerWidth);
  const selectedPakeeps = useSelector(getSelectedPakeeps);
  const navigationViewLike = useSelector(getNavigationViewLike);
  const selectedPakeepsId = useSelector(getSelectedPakeepsId);

  const navigationViewLikeTelegram = navigationViewLike === 'telegram';
  const navigationViewLikeGoogleKeep = navigationViewLike === 'googleKeep';
  const navigationViewLikePakeeps = navigationViewLike === 'pakeeps';

  const classes = useStyles({ drawerWidth, navigationViewLikeTelegram });

  const headerByPasProps = {
    navigationViewLikeGoogleKeep,
    navigationViewLikeTelegram,
    navigationViewLikePakeeps,
    isMenuOpen,
    drawerWidth
  };
  const isShouldBeHeaderWhenActiveSelecto = selectedPakeeps.length > 0;

  const headerWhenActiveSelectoProps = {
    selectedPakeeps,
    selectedPakeepsId
  };

  return (
    <Grid className={classes.container}>
      {isShouldBeHeaderWhenActiveSelecto ? (
        <HeaderWhenActiveSelecto {...headerWhenActiveSelectoProps} />
      ) : (
        <HeaderByPas {...headerByPasProps} />
      )}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isMenuOpen
        })}
      >
        {children}
      </main>
    </Grid>
  );
};

export default HeaderLayout;
