import firebase from 'firebase/app';
import 'firebase/auth';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import { getUserData } from 'store/modules/App/selectors';
import { toChangeLoginStatus } from 'store/modules/Auth/actions';
import { SETTINGS_ACCOUNT_BASE_URL } from 'layouts/RouterLayout/denotation';
import HeaderMenuContainer from 'components/Header/components/MenuContainer';
import { AccountMenuPropsType } from './types';

const AccountMenu: FC<AccountMenuPropsType> = ({ id, customColor, mouseX: left, mouseY: top, onClose }) => {
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
      onClick: () => router.push(SETTINGS_ACCOUNT_BASE_URL),
      iconName: 'account',
      id: 'ACCOUNT'
    },
    { text: 'Sign Out ', onClick: handleSignOut, iconName: 'signout', id: 'SIGNOUT' }
  ];

  return <HeaderMenuContainer arr={menuItemArr} coordinates={{ top, left }} onClose={onClose} />;
};

export default AccountMenu;
