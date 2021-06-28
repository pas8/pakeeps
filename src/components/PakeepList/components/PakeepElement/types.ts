import { UseStylesCustomColorType } from 'models/types';
import { LabelsOfPakeepType, PakeepIdType, TitleAndTextOfPakeepType } from 'store/modules/App/types';
import { DefaultPakeepElementPropsType } from '../WrapperOfContainer/components/Container/components/Column/components/Row/types';
import { HandleSetPakeepElementHeigthArrType } from '../WrapperOfContainer/components/Container/components/Column/type';

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
  pakeepElementHeigth:number;
  handleResetItemSize:any
  // handlePinStatusPakeep: Function;
  id: PakeepIdType;
} & TitleAndTextOfPakeepType &
  PropertyiesOfPakeepElement &
  DefaultPakeepElementPropsType &
  ColorOfPakeepType &
  PropsFromPakeepListToPakeepElementType;

export type NullityStatusState = {
  isHovered: boolean;
  isLoaded: boolean;
};

export type OnClickOfPakeepElementType = (id: PakeepIdType) => void;
export type PropsFromPakeepListToPakeepElementType = { onClickOfPakeepElement: OnClickOfPakeepElementType };
