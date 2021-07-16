import firebase from 'firebase/app';
import 'firebase/auth';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { Grid, MenuItem, makeStyles, Menu, Typography } from '@material-ui/core';

import { useAlpha } from 'hooks/useAlpha.hook';
import { getUserData } from 'store/modules/App/selectors';
import { toChangeLoginStatus } from 'store/modules/Auth/actions';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { AccountMenuPropsType } from './types';
import { SETTINGS_ACCOUNT_BASE_URL } from 'layouts/RouterLayout/denotation';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette, typography: { subtitle2, subtitle1 } }) => ({
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
    '&:hover div': {
      color: palette.getContrastText(palette.secondary.main)
    },
    '& div': {
      color: palette.text.secondary,
      zIndex: 10000
    },
    '& p': {
      ...subtitle2,
      fontSize: subtitle1.fontSize
    },
    '&:hover .MuiTouchRipple-root': {
      background: useAlpha(palette.secondary.main, 1)
    },
    '& svg': {
      margin: spacing(0, 0.8, 0, -0.4)
    }
  },
  menuChildContainer: {
    borderRadius,
    overflow: 'hidden',
    background: palette.background.default,
    border: `1px solid ${palette.secondary.main}`
  }
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
                <Typography> {text} </Typography>
              </Grid>
            </MenuItem>
          );
        })}
      </Grid>
    </Menu>
  );
};

export default AccountMenu;
