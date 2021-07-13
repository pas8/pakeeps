import firebase from 'firebase/app';
import 'firebase/auth';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { Grid, MenuItem, makeStyles, Menu } from '@material-ui/core';

import { useAlpha } from 'hooks/useAlpha.hook';
import { getUserData } from 'store/modules/App/selectors';
import { toChangeLoginStatus } from 'store/modules/Auth/actions';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { AccountMenuPropsType } from './types';
import { SETTINGS_ACCOUNT_BASE_URL } from 'layouts/RouterLayout/denotation';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  containerOfHeaderAvatarButton: {
    maxWidth: spacing(4.2),
    height: spacing(4.2),
    marginLeft: spacing(0.8),
    padding: 0,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%'
    }
  },
  menuItemContainer: {
    '& div': {
      zIndex: 10000
    },
    '&:hover .MuiTouchRipple-root': {
      background: useAlpha(palette.secondary.main, 0.42)
    },
    '& svg': {
      margin: spacing(0, 0.8, 0, -0.4)
    }
  },
  menuChildContainer: { borderRadius, overflow: 'hidden' }
}));

const AccountMenu: FC<AccountMenuPropsType> = ({ id, customColor, mouseX: left, mouseY: top, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { userName, name, email } = useSelector(getUserData);

  const handleSignOut = () => {
    firebase.auth().signOut();
    dispatch(toChangeLoginStatus({ isLogined: false }));
  };
  const menuItemArr = [
    {
      text: `Sign in as ${name || userName || email}`,
      route: () => router.push(SETTINGS_ACCOUNT_BASE_URL),
      iconName: 'account'
    },
    { text: 'Sign Out ', onClick: handleSignOut, iconName: 'signout' }
  ];

  return (
    <Menu
      open={true}
      onClose={onClose}
      anchorReference={'anchorPosition'}
      anchorPosition={!!top && !!left ? { top, left } : undefined}
    >
      <Grid className={classes.menuChildContainer}>
        {menuItemArr.map(({ text, onClick, iconName = '' }) => {
          const [icon] = useTakeIcon(iconName);

          return (
            <MenuItem onClick={onClick} className={classes.menuItemContainer} key={`menuItemContainer-${text}`}>
              <Grid container alignItems={'center'}>
                {!!iconName ? icon : null}
                {text}
              </Grid>
            </MenuItem>
          );
        })}
      </Grid>
    </Menu>
  );
};

export default AccountMenu;
