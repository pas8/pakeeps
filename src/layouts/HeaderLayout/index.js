import HeaderByPas from 'components/Header/index';
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import { getDrawerWidth, getSelectedPakeep, getSelectedPakeepsId } from 'store/modules/App/selectors';
import HeaderWhenActiveSelecto from 'components/HeaderWhenActiveSelecto';
import { handleCancelSelectingStatusThunk, handleSelectedPakeepsPropertyThunk } from 'store/modules/App/operations';

const useStyles = makeStyles(theme => ({
  container: {
    '& header': {
      padding: '0px !important'
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2.8),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),

    // marginLeft: ({ isMenuNavigationHasDialogView, drawerWidth }) => isMenuNavigationHasDialogView && drawerWidth,
    [theme.breakpoints.between('xs', 'sm')]: {
      padding: theme.spacing(1.8)
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2)
    }
    // [theme.breakpoints.down('sm')]: {
    //   padding: theme.spacing(1.8),
    // }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: ({ drawerWidth, navigationViewLikeTelegram }) => navigationViewLikeTelegram && drawerWidth
  }
}));

const HeaderLayout = ({
  children,
  isMenuOpen,
  drawerWidth,
  navigationViewLike,
  selectedPakeepsId,
  handleCancelSelectingStatusThunk,
  handleSelectedPakeepsPropertyThunk,
  selectedPakeeps
}) => {
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

  const cancelSelectedPakeepsId = () => {
    handleCancelSelectingStatusThunk(true);
  };
  const headerWhenActiveSelectoProps = {
    selectedPakeeps,
    cancelSelectedPakeepsId,
    handleSelectedPakeepsPropertyThunk
  };

  return (
    <Grid className={classes.container}>
      {true ? <HeaderWhenActiveSelecto {...headerWhenActiveSelectoProps} /> : <HeaderByPas {...headerByPasProps} />}
      {/* {isShouldBeHeaderWhenActiveSelecto ? <HeaderWhenActiveSelecto /> : <HeaderByPas {...headerByPasProps} />} */}
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

HeaderLayout.propTypes = {
  children: PropTypes.node,
  drawerWidth: PropTypes.number,
  handleCancelSelectingStatusThunk: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  navigationViewLike: PropTypes.string,
  selectedPakeeps: PropTypes.array,
  
};
const mapStateToProps = ({
  app: { isMenuOpen, drawerWidth, selectedPakeepsId,pakeeps },
  settings: { navigationViewLike }
}) => ({
  isMenuOpen,
  drawerWidth: getDrawerWidth(drawerWidth),
  selectedPakeeps: getSelectedPakeep(selectedPakeepsId,pakeeps),
  navigationViewLike: getNavigationViewLike(navigationViewLike)
});

const mapDispatchToProps = dispatch => ({
  handleCancelSelectingStatusThunk: boolValue => dispatch(handleCancelSelectingStatusThunk(boolValue)),
  handleSelectedPakeepsPropertyThunk:(newPakeeps, propertyVariant) =>dispatch(handleSelectedPakeepsPropertyThunk(newPakeeps, propertyVariant))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLayout);
