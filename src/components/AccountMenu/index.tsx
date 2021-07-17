import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuAccountUtilsArr, } from 'store/modules/App/selectors';
import HeaderMenuContainer from 'components/Header/components/MenuContainer';
import { AccountMenuPropsType } from './types';

const AccountMenu: FC<AccountMenuPropsType> = ({ id, customColor, mouseX: left, mouseY: top, onClose }) => {
  const dispatch = useDispatch();
  const arr = useSelector(getMenuAccountUtilsArr);
  // arr
  return <HeaderMenuContainer arr={arr} coordinates={{ top, left }} onClose={onClose} />;
};

export default AccountMenu;
