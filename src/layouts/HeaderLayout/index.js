import HeaderByPas from 'components/Header/index';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import { getDrawerWidth, getSelectedPakeepsId } from 'store/modules/App/selectors';
import HeaderWhenActiveSelecto from 'components/HeaderWhenActiveSelecto';


const useStyles = makeStyles(theme => ({
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

const HeaderLayout = ({ children, isMenuOpen, drawerWidth, navigationViewLike, selectedPakeepsId }) => {
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
  const isShouldBeHeaderWhenActiveSelecto = selectedPakeepsId.length > 0;

  const headerWhenActiveSelectoProps = {
    selectedPakeepsId
  };

  return (
    <>
      {true ? <HeaderWhenActiveSelecto {...headerWhenActiveSelectoProps} /> : <HeaderByPas {...headerByPasProps} />}
      {/* {isShouldBeHeaderWhenActiveSelecto ? <HeaderWhenActiveSelecto /> : <HeaderByPas {...headerByPasProps} />} */}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isMenuOpen
        })}
      >
        {children}
      </main>
    </>
  );
};

HeaderLayout.propTypes = {
  children: PropTypes.node
};
const mapStateToProps = ({
  app: { isMenuOpen, drawerWidth, selectedPakeepsId },
  settings: { navigationViewLike }
}) => ({
  isMenuOpen,
  drawerWidth: getDrawerWidth(drawerWidth),
  selectedPakeepsId: getSelectedPakeepsId(selectedPakeepsId),
  navigationViewLike: getNavigationViewLike(navigationViewLike)
});

export default connect(mapStateToProps, null)(HeaderLayout);
