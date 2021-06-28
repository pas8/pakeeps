import { PropsFromPakeepListToPakeepElementType } from 'components/PakeepList/components/PakeepElement/types';
import { PropsOfColumnOfPakeepListContainerPropsType } from 'components/PakeepList/components/WrapperOfContainer/types';
import { ColumnElementType, SumOfPakeepsReduceFuncType } from 'models/types';
import { DefaultFolderElementPropertyNamesType, PakeepElementType, PakeepsType } from 'store/modules/App/types';

export type ColumnOfPakeepListContainerPropsType = PropsOfColumnOfPakeepListContainerPropsType & {
  column: ColumnElementType;
  pakeepsInColumn: (PakeepElementType | null)[];
  isLastColumn: boolean;
  isFirstColumn: boolean;
  columnOrderIdx: number;
  pakeepListMeasure: {
    height: number;
    width: number | string;
  };
} & PropsFromPakeepListToPakeepElementType;

export type HandleSetPakeepElementHeigthArrType = ({ id, height }: { id: string; height: number }) => void;

export type PakeepElementHeigthArrType = { [key: string]: number };
