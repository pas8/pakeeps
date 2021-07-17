import { ClosePopoverOrMenuType, CustomColorType, UseStylesCustomColorType } from 'models/types';
import {
  HandleChangeLabelColorType,
  HandleChangeLabelIconNameType,
  HandleChangeLabelTitleType,
  MenuStateOfChangingLabelMenuType
} from '../MenuWrapper/types';

export type MenuOfLabelPartPropsType = UseStylesOfMenuOfLabelPartPropsTypeType & {
  menuState: MenuStateOfChangingLabelMenuType;
  handleDeleteLabel: ()=> void;
  handleClose: ClosePopoverOrMenuType;
  handleChangeLabelColor: HandleChangeLabelColorType;
  handleChangeLabelVariant: () => void;
  handleChangeLabelIconName: HandleChangeLabelIconNameType;
  buttonSaveState?: any;
  onClickOfSaveButton: () => void;
  handleChangeLabelTitle: HandleChangeLabelTitleType;
};

export type UseStylesOfMenuOfLabelPartPropsTypeType = {} & UseStylesCustomColorType;
