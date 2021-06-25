import WrapperOfMenuOfLabelPart from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/MenuWrapper';
import { useFindLabelItem } from 'hooks/useFindLabelItem.hook';
import React, { useState, FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMenuPropsOfTemporaryData, getTemporaryDataOfLabelItem } from 'store/modules/App/selectors';
import { MenuesLayoutPropsType } from './types';

const MenuesLayout: FC<MenuesLayoutPropsType> = ({ children }) => {
  const defaultMenuProps = useSelector(getDefaultMenuPropsOfTemporaryData);
  const defaultMenuLayoutElemntProps = {
    ...defaultMenuProps
  };
  const labelChangindMenuProps = { ...defaultMenuLayoutElemntProps };

  const menuesComponentsArr = [{ Component: WrapperOfMenuOfLabelPart, props: labelChangindMenuProps }];

  return (
    <>
      {children}
      {menuesComponentsArr.map(({ Component, props }, idx) => (
        <Component {...props} key={idx} />
      ))}
    </>
  );
};

export default MenuesLayout;
