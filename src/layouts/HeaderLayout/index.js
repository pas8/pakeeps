import HeaderByPas from 'components/Header/index';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2.8),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),

    marginLeft: -drawerWidth,
    [theme.breakpoints.between('xs', 'sm')]: {
      padding: theme.spacing(1.8),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
    // [theme.breakpoints.down('sm')]: {
    //   padding: theme.spacing(1.8),
    // }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const HeaderLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <HeaderByPas />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: !false
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

export default HeaderLayout;