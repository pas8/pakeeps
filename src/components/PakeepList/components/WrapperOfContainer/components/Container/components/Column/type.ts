import { PropsOfColumnOfPakeepListContainerPropsType } from 'components/PakeepList/components/WrapperOfContainer/types';
import { ColumnElementType, SumOfPakeepsReduceFuncType } from 'models/types';
import { DefaultFolderElementPropertyNamesType, PakeepElementType, PakeepsType } from 'store/modules/App/types';

export type ColumnOfPakeepListContainerPropsType = PropsOfColumnOfPakeepListContainerPropsType & {
  column: ColumnElementType;
  pakeepsInColumn: (PakeepElementType | null)[];
  isLastColumn: boolean;
  isFirstColumn: boolean;
};
