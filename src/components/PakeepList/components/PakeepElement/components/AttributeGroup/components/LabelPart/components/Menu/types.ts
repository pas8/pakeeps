import { ClosePopoverOrMenuType, CustomColorType } from 'models/types';
import {
  HandleChangeLabelColorType,
  HandleChangeLabelIconNameType,
  HandleChangeLabelTitleType,
  MenuStateOfChangingLabelMenuType
} from '../MenuWrapper/types';

export type MenuOfLabelPartPropsType = UseStylesType & {
  menuState: MenuStateOfChangingLabelMenuType;
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
