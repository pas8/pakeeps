import { IconButton, makeStyles, Button, Tooltip, Grid, Menu, MenuItem, Typography } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { ACCOUNT_URL } from 'components/Folders';
import MenuByPas from 'components/Menu';
import firebase from 'firebase';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { NONE } from 'models/denotation';
import { useRouter } from 'next/dist/client/router';
import { FC, MouseEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvatarProperties, getUserData } from 'store/modules/App/selectors';
import { toChangeLoginStatus } from 'store/modules/Auth/actions';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  containerOfHeaderAvatarButton: {
    maxWidth: spacing(4.2),
    height: spacing(4.2),
    marginLeft: spacing(0.8),
    // transform: 'scale(0.5)',
    padding: 0,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      // padding:spacing(0.4),
      // border:'1px solid black',
      height: '100%'
    }
  },
  menuItemContainer: {
    '& div':{
      zIndex:100000000,


    },
    '&:hover .MuiTouchRipple-root': {
      background: useAlpha(palette.secondary.main,0.42),
      // background: useAlpha(palette.secondary.main,1),
      // color:palette.background.default
    },
    '& svg': {
      margin: spacing(0, 0.8, 0, -0.4)
    }
  },
  menuChildContainer: { borderRadius, overflow: 'hidden' }
}));

const AvatarButton: FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const router = useRouter();

  const { url, backgroundColor, borderRadius } = useSelector(getAvatarProperties);
  const { userName, name, email } = useSelector(getUserData);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<any>(null);

  const handleOpenMenu: MouseEventHandler<HTMLDivElement> = ({ currentTarget, clientX, clientY }) => {
    setProfileMenuAnchorEl(currentTarget);
  };

  const handleCloseMenu = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    dispatch(toChangeLoginStatus({ isLogined: false }));
  };

  const menuItemArr = [
    { text: `Sign in as ${name || userName || email}`, route: () => router.push(ACCOUNT_URL), iconName: 'account' },
    { text: 'Sign Out ', onClick: handleSignOut, iconName: 'signout' }
  ];

  return (
    <Grid onClick={handleOpenMenu}>
      <Tooltip title={'Open your profile'}>
        {url === NONE ? (
          <IconButton aria-label={'account of current user'} aria-haspopup={'true'} color={'inherit'}>
            <AccountCircleOutlinedIcon />
          </IconButton>
        ) : (
          <Grid
            className={classes.containerOfHeaderAvatarButton}
            style={{ backgroundColor, borderRadius: `${borderRadius}%` }}
          >
            <img src={url} />
          </Grid>
        )}
      </Tooltip>

      <Menu
        open={!!profileMenuAnchorEl}
        anchorEl={profileMenuAnchorEl}
        onClose={handleCloseMenu}
        style={{ marginTop: 42 }}
      >
        <Grid className={classes.menuChildContainer}>
          {menuItemArr.map(({ text, route = false, onClick, iconName = '' }) => {
            const [icon] = useTakeIcon(iconName);

            return (
              <MenuItem onClick={onClick} className={classes.menuItemContainer}>
                <Grid container alignItems={'center'}>
                  {!!iconName ? icon : null}
                  {text}
                </Grid>
              </MenuItem>
            );
          })}
        </Grid>
      </Menu>
    </Grid>
  );
};

export default AvatarButton;
