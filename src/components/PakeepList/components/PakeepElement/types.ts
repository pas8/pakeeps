import { UseStylesCustomColorType } from 'models/types';
import { LabelsOfPakeepType, PakeepIdType, TitleAndTextOfPakeepType } from 'store/modules/App/types';

export type ColorOfPakeepType = { backgroundColor: string; color?: string };

export type UseStylesProps = UseStylesCustomColorType &
  ColorOfPakeepType & {
    isUtilsHaveViewLikeInGoogleKeep?: boolean;
  };

export type PropertyiesNamesOfPakeepElement = 'isSelecting' | 'isDragging' | 'isPinIconShouldBeShownInPakeep';
export type PropertyiesOfPakeepElement = {
  [Propety in PropertyiesNamesOfPakeepElement]: boolean;
};

export type PakeepElementPropsType = {
  labels: LabelsOfPakeepType;
  handlePinStatusPakeep: Function;
  id: PakeepIdType;
} & TitleAndTextOfPakeepType &
  PropertyiesOfPakeepElement &
  ColorOfPakeepType &
  PropsFromPakeepListToPakeepElementType;

export type NullityStatusState = {
  isHovered: boolean;
  isLoaded: boolean;
};

export type OnClickOfPakeepElementType = (id: PakeepIdType) => void;
export type PropsFromPakeepListToPakeepElementType = { onClickOfPakeepElement: OnClickOfPakeepElementType };
