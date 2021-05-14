import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HeaderSearch from './components/Search';
import HeaderDrawer from './components/Drawer';
import HeaderProfileUtils from './components/ProfileUtils';
import { Box } from '@material-ui/core';
import MainBar from './components/MainBar';
import { connect } from 'react-redux';
import { setMenuOpenStatusThunk } from 'store/modules/App/operations';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    backgroundColor: '#424242',
    color: 'white',
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
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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

const HeaderByPas = ({ setMenuOpenStatusThunk, isMenuOpen }) => {
  const classes = useStyles();

  const handleDrawerOpen = () => setMenuOpenStatusThunk(true);
  const handleDrawerClose = () => setMenuOpenStatusThunk(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })}>
        <Toolbar className={classes.toolBar}>
          <MainBar handleDrawerOpen={handleDrawerOpen} isMenuOpen={isMenuOpen} />
          <HeaderSearch />
          <HeaderProfileUtils />
        </Toolbar>
      </AppBar>
      <HeaderDrawer isMenuOpen={isMenuOpen} handleDrawerClose={handleDrawerClose} />
    </div>
  );
};

HeaderByPas.propTypes = {
  isMenuOpen: PropTypes.bool,
  setMenuOpenStatusThunk: PropTypes.func
};

const mapStateToProps = ({ app: { isMenuOpen } }) => ({ isMenuOpen });

const mapDispatchToProps = dispatch => ({
  setMenuOpenStatusThunk: boolStatus => dispatch(setMenuOpenStatusThunk(boolStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderByPas);
