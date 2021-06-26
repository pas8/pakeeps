import { FolderPropetyType } from 'models/types';
import { PakeepsType } from 'store/modules/App/types';
import { HandleSetPakeepElementHeigthArrType, PakeepElementHeigthArrType } from '../../type';

export type RowOfColumnOfPakeepListContainerType = {
  data: {
    pakeepsInColumn: PakeepsType;
    defaultPakeepElementProps: DefaultPakeepElementPropsType;
    toggleResetItemSize: any;
    folderProperty: FolderPropetyType;
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
