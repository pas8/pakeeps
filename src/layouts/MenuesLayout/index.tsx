import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccountMenu from 'components/AccountMenu';
import MenuOfChangingGlobalEventItem from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/MenuOfChangingGlobalEventItem';
import WrapperOfMenuOfLabelPart from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/MenuWrapper';
import { useFilterMenusNamesOfMenuLayout } from 'hooks/useFilterMenusNamesOfMenuLayout.hook';
import NotificationMenu from 'components/NotificationMenu';
import { customColorPlaceholder } from 'components/AccountAvatar';
import { MenusLayoutName } from 'models/unums';
import { toChangeDefaultLayoutMenuProps } from 'store/modules/App/actions';
import { getDefaultMenuPropsOfTemporaryData } from 'store/modules/App/selectors';
import { MenuesLayoutPropsType } from './types';

const MenuesLayout: FC<MenuesLayoutPropsType> = ({ children }) => {
  const defaultMenuProps = useSelector(getDefaultMenuPropsOfTemporaryData);
  const dispatch = useDispatch();
  const namesArr = useFilterMenusNamesOfMenuLayout();
  if (defaultMenuProps === MenusLayoutName.NONE) return <> {children} </>


  const menuesComponentsArr = [
    { Component: WrapperOfMenuOfLabelPart, name: MenusLayoutName.LABELS },
    { Component: MenuOfChangingGlobalEventItem, name: MenusLayoutName.EVENTS },
    { Component: AccountMenu, name: MenusLayoutName.ACCOUNT },
    { Component: NotificationMenu, name: MenusLayoutName.NOTIFICATION }
  ];

  return (
    <>
      {children}
      {menuesComponentsArr.map(({ Component, name }, idx) => {
        if (namesArr.includes(name)) return null;
        const findedItem = defaultMenuProps.find(({ name: globalName }) => globalName === name);
        if (!findedItem) return null;

        const onClose = () => {
          dispatch(toChangeDefaultLayoutMenuProps({ props: { name, isShouldBeClosed: true } }));
        };

        const defaultMenuLayoutElementProps = {
          ...findedItem,
          onClose,
          customColor: findedItem.customColor || customColorPlaceholder
        };

        return <Component {...defaultMenuLayoutElementProps} key={`menuesComponentsArr-${name}-${idx}`} />;
      })}
    </>
  );
};

export default MenuesLayout;
