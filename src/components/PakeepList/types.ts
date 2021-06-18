import { CustomColorType, SelectedPakeepsIdType } from 'models/types';
import { Dispatch, SetStateAction } from 'react';
import { OrderNamesType } from 'store/modules/App/types';

export type HandleSetSelectedPakeepsIdType = (selectedPakeepsId: SelectedPakeepsIdType) => void;

export type PakeepDialogPropsType = {
  id: string;
  customColor: CustomColorType;
  dialogIconsUtilsProps: object;
  correctColor: string;
  correctBackground: string;
  title: string;
  text: string;
  dialogAttributeGroupProps: object;
};

export type HandleSetPakeepsOrderNamesType = (pakeepsOrderNames: OrderNamesType) => void;
export type HandleSetPinnedPakeepsOrderNamesType = (pinnedPakeepsOrderNames: OrderNamesType) => void;

export type PakeepHoveringContextPropviderPropsValueType = {
  setIsPakeepHovering: Dispatch<SetStateAction<boolean>>;
  onClickOfPakeepElement: (props: PakeepDialogPropsType) => void;
  isSomePakeepsSelected: boolean;
};
