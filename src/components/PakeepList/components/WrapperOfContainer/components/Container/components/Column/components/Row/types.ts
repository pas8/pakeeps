import { FolderPropetyType } from 'models/types';
import { DraggableProps } from 'react-beautiful-dnd';
import { Omit } from 'utility-types';
import { DefaultFolderElementPropertyType, PakeepElementType, PakeepsType } from 'store/modules/App/types';
import { HandleSetPakeepElementHeigthArrType, PakeepElementHeigthArrType } from '../../type';
import { PakeepElementPropsType } from 'components/PakeepList/components/PakeepElement/types';

export type RowOfColumnOfPakeepListContainerType = {
  data: {
    pakeepsInColumn: PakeepsType;
    defaultPakeepElementProps: DefaultPakeepElementPropsType;
    toggleResetItemSize: any;
    pakeepElementGapX: number;
    pakeepElementHeigthArr: PakeepElementHeigthArrType;
  };
  index: number;
  style: any;
};

export type DefaultPakeepElementPropsType = {
  isSelecting: boolean;
  onClickOfPakeepElement: any;
  handleSetPakeepElementHeigthArr: HandleSetPakeepElementHeigthArrType;
};

export type GetStyleOfDraggableContainerOfPakeepElementType = {
  draggableStyle: any;
  pakeepElementGapX: number;
  virtualStyle: any;
  isDragging: boolean;
};
export type DraggableContainerOfPakeepElementPropsType = {
  draggableProps: Omit<DraggableProps,'children'>;
  pakeepElementGapX: number;
  isDraggingOver: boolean;
  style: any;
  pakeepElementProps:Omit<PakeepElementPropsType,'isDragging'> ;
};
