import { IconType, UseStylesCustomColorType } from 'models/types';

export type UseStylesOfMenuOfChangingGlobalAttributeItemType = {} & UseStylesCustomColorType;

export type MenuItemOfMenuOfChangingGlobalAttributeItemType = {
  title: string;
  icon: any;
  dynamicComponent?: {
    component?: any;
    props?: object;
  };
  name: string;
  onClick?: () => void;
};

export type MenuOfChangingGlobalAttributeItemPropsType = {
  menuItemsArr: MenuItemOfMenuOfChangingGlobalAttributeItemType[];
  onClose: () => void;
  onSave: () => void;
  customTitle: any;
  top: number;
  left: number;
} & UseStylesOfMenuOfChangingGlobalAttributeItemType;
