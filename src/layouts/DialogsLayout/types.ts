import { CustomColorType, LayoutChildrenType } from 'models/types';

export type DialogsLayoutPropsType = {} & LayoutChildrenType;

export type DefaultMenuLayoutElementPropsType = {
  onClose: () => void;
  id: string;
  customColor: CustomColorType;
};
