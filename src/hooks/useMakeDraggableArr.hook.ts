import { useEffect } from 'react';
import { OrderNamesType, PakeepsType } from 'store/modules/App/types';
import { PakeepsReduceFuncType } from 'models/types';
import { HandleSetPakeepsOrderNamesType } from 'components/PakeepList/types';
import { useTakeValueFromBreakpoints } from './useTakeValueFromBreakpoints.hook';

export const useMakeDraggableArr = (
  pakeeps: PakeepsType,
  pakeepsOrderNames: OrderNamesType,
  handlePakeepsOrderNames: HandleSetPakeepsOrderNamesType,
  maxColumnNumber = 6,
  defaultBreakpointValue = [6, 4, 3, 2, 1]
) => {
  useEffect(() => {
    pakeepsOrderNames.length === 0 && handlePakeepsOrderNames(pakeeps.map(({ id }) => id));
  }, [pakeeps]);

  const orderReduceFunc = (sum: string[], placeholder: any, idx: number) => [...sum, `${idx}`];

  const order = Array(maxColumnNumber).fill(maxColumnNumber).reduce(orderReduceFunc, []);

  const responsiveColumnOrder = order.slice(0, useTakeValueFromBreakpoints(defaultBreakpointValue));
  const columnArrLenght = responsiveColumnOrder.length;

  const pakeepsReduceFunc: PakeepsReduceFuncType = (sum, id, idx) => {
    const columnId = responsiveColumnOrder.filter((id, columnIndex) => {
      return (columnIndex + columnArrLenght) % columnArrLenght === idx % columnArrLenght && id;
    });
    const columnIdString = columnId?.toString();
    if (!columnIdString) return {};

    const restPakeeps = sum[columnIdString]?.pakeepsId ?? [];
    return {
      ...sum,
      [columnIdString]: {
        id: columnIdString,
        pakeepsId: [...restPakeeps, id]
      }
    };
  };

  const columns = pakeepsOrderNames.reduce(pakeepsReduceFunc, {});

  return {columns, responsiveColumnOrder}
};
