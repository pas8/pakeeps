import { Badge, IconButton, makeStyles } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

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
