import LayoutHeader from 'components/Header';
import React from 'react';

const HeaderLayout = ({ children }) => {
  return <LayoutHeader> {children} </LayoutHeader>;
};

export default HeaderLayout;
