import compareFunc from 'compare-func';
import { useEffect, useState } from 'react';
import { usePrevious } from 'react-use';
import { useTakeValueFromBreakpoints } from './useTakeValueFromBreakpoints.hook';

export const useMakeDraggableArr = (
  pakeeps,
  pakeepsOrderNames,
  handlePakeepsOrderNames,
  maxColumnNumber = 6,
  defaultBreakpointValue = [6, 4, 3, 2, 1],
  isPinned = true
) => {
  // const [columns, setColumns] = useState({});
  // _.filter(pakeeps, ({ isPinned }) => !!isPinned),

  // const pakeeps = isPinned ? defaultPakeeps.filter(({ isPinned }) => isPinned === true) : defaultPakeeps;
  useEffect(() => handlePakeepsOrderNames(pakeeps.map(({ id }) => id)), [pakeeps]);

  const orderReduceFunc = (sum, placeholder, idx) => [...sum, `${idx}`];

  const order = Array(maxColumnNumber).fill(maxColumnNumber).reduce(orderReduceFunc, []);

  const responsiveColumnOrder = order.slice(0, useTakeValueFromBreakpoints(defaultBreakpointValue));
  const columnArrLenght = responsiveColumnOrder.length;

  const pakeepsReduceFunc = (sum, id, idx) => {
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

  return [columns, responsiveColumnOrder];
};
