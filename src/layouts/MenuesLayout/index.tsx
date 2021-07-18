import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccountMenu from 'components/AccountMenu';
import MenuOfChangingGlobalEventItem from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/MenuOfChangingGlobalEventItem';
import WrapperOfMenuOfLabelPart from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/MenuWrapper';
import { useFilterMenusNamesOfMenuLayout } from 'hooks/useFilterMenusNamesOfMenuLayout.hook';
import { MenusLayoutName } from 'models/unums';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { nullityDefaultMenuProps } from 'store/modules/App/reducers';
import { getDefaultMenuPropsOfTemporaryData } from 'store/modules/App/selectors';
import { MenuesLayoutPropsType } from './types';
import NotificationMenu from 'components/NotificationMenu';

const MenuesLayout: FC<MenuesLayoutPropsType> = ({ children }) => {
  const { menuName, ...defaultMenuProps } = useSelector(getDefaultMenuPropsOfTemporaryData);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { defaultMenuProps: nullityDefaultMenuProps } }));
  };
  const namesArr = useFilterMenusNamesOfMenuLayout();

  const defaultMenuLayoutElemntProps = {
    ...defaultMenuProps,
    onClose,
    top: defaultMenuProps.mouseX,
    left: defaultMenuProps.mouseY
  };

  const menuesComponentsArr = [
    { Component: WrapperOfMenuOfLabelPart, props: defaultMenuLayoutElemntProps, name: MenusLayoutName.LABELS },
    { Component: MenuOfChangingGlobalEventItem, props: defaultMenuLayoutElemntProps, name: MenusLayoutName.EVENTS },
    { Component: AccountMenu, props: defaultMenuLayoutElemntProps, name: MenusLayoutName.ACCOUNT },
    { Component: NotificationMenu, props: defaultMenuLayoutElemntProps, name: MenusLayoutName.NOTIFICATION }
  ];

  // console.log(menuName)
  // const p = useProperty
  const menuesHidden = menuName === MenusLayoutName.NONE;
  return (
    <>
      {children}
      {!menuesHidden &&
        menuesComponentsArr.map(({ Component, props, name }, idx) => {
          if (namesArr.includes(name)) return null;

          if (name === menuName) return <Component {...props} key={`menuesComponentsArr-${name}-${idx}`} />;
          return null;
        })}
    </>
  );
};

export default MenuesLayout;
