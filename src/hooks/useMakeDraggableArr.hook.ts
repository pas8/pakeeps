import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PakeepsReduceFuncType } from 'models/types';
import {
  getIsCurrentNumberOfPakeepColumnsIsOne,
  getOrderOfOnlyOnePakeepColumn,
  getPakeeps,
  getPakeepsOrderNames
} from 'store/modules/App/selectors';
import { toChangeOrderOfOnlyOnePakeepColumn, toChangeTemporaryData } from 'store/modules/App/actions';
import { HandleSetPakeepsOrderNamesType } from 'components/PakeepList/types';
import { useBreakpointNames } from './useBreakpointNames.hook';
import { useTakeValueFromBreakpoints } from './useTakeValueFromBreakpoints.hook';

export const useMakeDraggableArr = (
  handlePakeepsOrderNames: HandleSetPakeepsOrderNamesType,
  maxColumnNumber = 6,
  defaultBreakpointValue = [6, 4, 3, 2, 2]
) => {
  const dispatch = useDispatch();

  const pakeepsOrderNames = useSelector(getPakeepsOrderNames);
  const orderOfOnlyOnePakeepColumn = useSelector(getOrderOfOnlyOnePakeepColumn);
  const isCurrentNumberOfPakeepColumnsIsOne = useSelector(getIsCurrentNumberOfPakeepColumnsIsOne);
  const pakeeps = useSelector(getPakeeps);
  const { isSiveIsXs } = useBreakpointNames();

  useEffect(() => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { isCurrentNumberOfPakeepColumnsIsOne: isSiveIsXs } }));
  }, [isSiveIsXs]);

  useEffect(() => {
    const newPakeepOrder = pakeeps.map(({ id }) => id);
    !pakeepsOrderNames.length && handlePakeepsOrderNames(newPakeepOrder);

    !orderOfOnlyOnePakeepColumn.length &&
      dispatch(toChangeOrderOfOnlyOnePakeepColumn({ orderOfOnlyOnePakeepColumn: newPakeepOrder }));
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

  const oneColumnId = '1';

  const oneColumn = { [oneColumnId]: { pakeepsId: orderOfOnlyOnePakeepColumn, id: oneColumnId } };
  const pakeepsColumns = pakeepsOrderNames.reduce(pakeepsReduceFunc, {});
  const columns = isCurrentNumberOfPakeepColumnsIsOne ? oneColumn : pakeepsColumns;

  return {
    columns,
    responsiveColumnOrder: isCurrentNumberOfPakeepColumnsIsOne ? [oneColumnId] : responsiveColumnOrder
  };
};
