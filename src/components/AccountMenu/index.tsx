import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import { getMenuAccountUtilsArr, getUserData } from 'store/modules/App/selectors';
import { toChangeLoginStatus } from 'store/modules/Auth/actions';
import { SETTINGS_ACCOUNT_BASE_URL } from 'layouts/RouterLayout/denotation';
import HeaderMenuContainer from 'components/Header/components/MenuContainer';
import { AccountMenuPropsType } from './types';

const AccountMenu: FC<AccountMenuPropsType> = ({ id, customColor, mouseX: left, mouseY: top, onClose }) => {
  const dispatch = useDispatch();
  const notValidatedArr = useSelector(getMenuAccountUtilsArr);
  // arr
  return <HeaderMenuContainer arr={menuItemArr} coordinates={{ top, left }} onClose={onClose} />;
};

export default AccountMenu;
