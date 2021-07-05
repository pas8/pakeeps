import { Grid } from '@material-ui/core';
import { CustomColorType } from 'models/types';
import { Component, FC, ReactComponentElement, ReactElement, ReactInstance, ReactNode } from 'react';

export type DynamicMenuItemPropsType = {
  DynamicComponent?: FC | typeof Grid | any; 
  dynamicComponentProps?: object;
  title?: string;
  isDynamicComponentShouldBeShown?: boolean;
  dynamicItemProps?: object;
  isPreventClickOfMenuItem?: boolean;
  icon?: FC | ReactNode | JSX.Element;
  customColor: CustomColorType;
  isDynamicItemGridMarginIsZero?: boolean;
  isMarginSmaller?: boolean;
};
