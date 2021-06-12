import { ReactNode } from 'react';
export type IconColorType = string;

export type IconClassType = {
  iconColor: IconColorType;
  rotate?: string;
  isArctiveIconPresent: boolean;
  isIconActive: boolean;
  fillOpacity: number;
};

export type IconButtonByPasType = IconClassType & {

  badgeContent:any;
  onClick :Function,
  rotateDeg:number,
  icon: ReactNode,
  iconName:string,
  activeIconName:string,
  activeProperty = false,
  size:IconSizeType,
  customColor = false,
  handleAverageMainComponentWidth = false,
  badgeContent

}
