import { HandleSetSelectedPakeepsIdType } from 'components/PakeepList/types';
import { FolderPropetyType } from 'models/types';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { OrderNamesType, OrderNameType, PakeepsType } from 'store/modules/App/types';
import { PropsFromPakeepListToPakeepElementType } from '../PakeepElement/types';

export type PropsOfColumnOfPakeepListContainerPropsType =  {
  isPakeepDragContextPinned: boolean;
  folderProperty: FolderPropetyType;
  folderId: string;
  isSelecting: boolean;
} & PropsFromPakeepListToPakeepElementType

export type WrapperOfContainerOfPakeepListType = {
  pakeeps: PakeepsType;
  pakeepsOrderNames: OrderNamesType;
  handleSetPakeepsOrderNames: HandleSetSelectedPakeepsIdType;
  setIsPakeepDragging: Function;
  columnOfPakeepListContainerProps:PropsOfColumnOfPakeepListContainerPropsType ;
};

export type OnDragEndParamsType = {
  destination: { id: string; droppableId: string; index: number };
  source: { id: string; droppableId: string; index: number };
};
export type OnDragEndType = (result: DropResult, provided: ResponderProvided) => void;

export type NewOrderNamesReduceFunc = (sum: [] | OrderNamesType, el: OrderNameType, idx: number) => OrderNamesType;
