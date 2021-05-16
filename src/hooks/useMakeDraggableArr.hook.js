import compareFunc from 'compare-func';
import { takeValueFromBreakpoints } from './takeValueFromBreakpoints.hook';

export const useMakeDraggableArr = (pakeeps, maxColumnNumber = 6, defaultBreakpointValue = [6, 4, 3, 2, 1]) => {
  const orderReduceFunc = (sum, placeholder, idx) => [...sum, `${idx}`];

  const order = Array(maxColumnNumber).fill(maxColumnNumber).reduce(orderReduceFunc, []);

  const responsiveColumnOrder = order.slice(0, takeValueFromBreakpoints(defaultBreakpointValue));
  const columnArrLenght = responsiveColumnOrder.length;

  const pakeepsReduceFunc = (sum, el, idx) => {
    const columnId = responsiveColumnOrder.filter((id, columnIndex) => {
      return (columnIndex + columnArrLenght) % columnArrLenght === idx % columnArrLenght && id;
    });
    const columnIdString = columnId?.toString();
    if (!columnIdString) return {};

    const restPakeeps = sum[columnIdString]?.pakeeps ?? [];
    const pakeepsElement = { ...el };
    return {
      ...sum,
      [columnIdString]: {
        id: columnIdString,
        pakeeps: [...restPakeeps, pakeepsElement]
      }
    };
  };
  const sortedPakeeps = pakeeps.sort(compareFunc(['idx','date']));
  console.log(sortedPakeeps)
  const columns = sortedPakeeps.reduce(pakeepsReduceFunc, {});

  return [columns, responsiveColumnOrder];
};
