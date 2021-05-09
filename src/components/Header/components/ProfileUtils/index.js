import { Badge, IconButton, makeStyles, Grid, Typography } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Switch from 'react-switch';
import { useState } from 'react';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import ThemeChangerButton from './components/ThemeChangerButton';
const useStyles = makeStyles(theme => ({
  profileUtils: {
    // justifySelf: 'flex-end',
    display: 'flex'
    // justifyItems: 'flex-end'
  }
}));

const HeaderProfileUtils = () => {
  const classNames = useStyles();

  return (
    <div className={classNames.profileUtils}>
        <ThemeChangerButton />

      <IconButton aria-label={'Notifications'} color={'inherit'}>
        <Badge badgeContent={17} color={'secondary'}>
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>

      <IconButton
        edge={'end'}
        aria-label={'account of current user'}
        // aria-controls={menuId}
        aria-haspopup={'true'}
        // onClick={handleProfileMenuOpen}
        color={'inherit'}
      >
        <AccountCircleOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default HeaderProfileUtils;
