import { SumOfPakeepsReduceFuncType } from 'models/types';
import { OrderNamesType, PakeepsType } from 'store/modules/App/types';
import { OnDragEndType, PropsOfColumnOfPakeepListContainerPropsType } from '../../types';

export type PakeepListContainerPropsType = {
  pakeeps: PakeepsType;
  responsiveColumnOrder: OrderNamesType;
  columns: SumOfPakeepsReduceFuncType;
  onDragEnd: OnDragEndType;
  onDragStart: () => void;
  columnOfPakeepListContainerProps: PropsOfColumnOfPakeepListContainerPropsType;
};
