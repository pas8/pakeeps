import { ClosePopoverOrMenuType, CustomColorType } from 'models/types';
import { Dispatch } from 'react';
import { MenuStateType } from '../../types';

export type WrapperOfMenuOfLabelPartPropsType = {
  handleClose: ClosePopoverOrMenuType;
  handleDeleteLabel: Function;
  menuState: MenuStateType;
  handleChangeGlobalLabelItem: Function;
  setMenuState: Dispatch<React.SetStateAction<MenuStateType>>;
  isThisMenuIsSecond?: boolean;
  customColor: CustomColorType;
};

export type HandleChangeLabelColorType = (color: string) => void;
export type HandleChangeLabelTitleType = ({ target: { value } }: { target: { value: string } }) => void;
export type HandleChangeLabelIconNameType = (labelIconName: string) => void;
