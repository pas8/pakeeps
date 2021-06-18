import { ClosePopoverOrMenuType, CustomColorType } from 'models/types';
import {
  HandleChangeLabelColorType,
  HandleChangeLabelIconNameType,
  HandleChangeLabelTitleType
} from '../MenuWrapper/types';
import { MenuStateType } from './../../types';

export type MenuOfLabelPartPropsType = UseStylesType & {
  menuState: MenuStateType;
  handleDeleteLabel: Function;
  handleClose: ClosePopoverOrMenuType;
  handleChangeLabelColor: HandleChangeLabelColorType;
  handleChangeLabelVariant: () => void;
  handleChangeLabelIconName: HandleChangeLabelIconNameType;
  buttonSaveState?: any;
  onClickOfSaveButton: () => void;
  handleChangeLabelTitle: HandleChangeLabelTitleType;
};

export type UseStylesType = {
  isThisMenuIsSecond?: boolean;
  customColor: CustomColorType;
};
