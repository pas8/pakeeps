import _ from 'lodash';
import { FC, memo } from 'react';
import { useMakeDraggableArr } from 'hooks/useMakeDraggableArr.hook';
import PakeepListContainer from './components/Container';
import { NewOrderNamesReduceFunc, OnDragEndType, WrapperOfContainerOfPakeepListType } from './types';
import { OrderNamesType, OrderNameType } from 'store/modules/App/types';
import { useSelector } from 'react-redux';
import { getIsCurrentNumberOfPakeepColumnsIsOne } from 'store/modules/App/selectors';

export const placeholderName = 'placeholder';

const WrapperOfContainerOfPakeepList: FC<WrapperOfContainerOfPakeepListType> = ({
  pakeeps,
  pakeepsOrderNames,
  handleSetPakeepsOrderNames,
  setIsPakeepDragging,
  columnOfPakeepListContainerProps
}) => {
  const isCurrentNumberOfPakeepColumnsIsOne = useSelector(getIsCurrentNumberOfPakeepColumnsIsOne);

  const { columns, responsiveColumnOrder } = useMakeDraggableArr(handleSetPakeepsOrderNames);

  const onDragStart = () => setIsPakeepDragging(true);

  const onDragEnd: OnDragEndType = ({ destination, source }) => {
    if (!destination) return;

    setIsPakeepDragging(false);
    const isSameColumn = source.droppableId === destination.droppableId;
    if (source.index === destination.index && isSameColumn) return;

    const sourceDroppableNumber = +source.droppableId;
    const destinationDroppableNumber = +destination.droppableId;

    if (isCurrentNumberOfPakeepColumnsIsOne) {
      const newOrderNames = Array.from(pakeepsOrderNames);
      const [destinationId] = newOrderNames.splice(source.index, 1);
      newOrderNames.splice(destination.index, 0, destinationId!);

      return handleSetPakeepsOrderNames(newOrderNames);
    }
    const columnOrderLenght = responsiveColumnOrder.length;
    const sourceArrFilterFunc = (el: OrderNameType, idx: number) =>
      (idx + columnOrderLenght) % columnOrderLenght === sourceDroppableNumber % columnOrderLenght && el;

    const sourceArr = pakeepsOrderNames.filter(sourceArrFilterFunc);
    const clonedSourceArr = _.clone(sourceArr);

    const sumLengthOfAllPakeeps = pakeepsOrderNames.length;

    const toCorrect = +destinationDroppableNumber !== 0;

    if (isSameColumn) {
      // clonedSourceArr.push('placeholder');
      // console.log(clonedSourceArr)
      _.fill(clonedSourceArr, sourceArr[source.index], destination.index, destination.index + 1);
      _.fill(clonedSourceArr, sourceArr[destination.index], source.index, source.index + 1);

      const newOrderNamesReduceFunc: NewOrderNamesReduceFunc = (sum, el, idx) => {
        const correntIdx =
          Math.ceil(((sumLengthOfAllPakeeps / columnOrderLenght) * idx) / sumLengthOfAllPakeeps) - +toCorrect;
        const isItemShoulBePasted =
          (idx + columnOrderLenght) % columnOrderLenght === sourceDroppableNumber % columnOrderLenght;

        const newOrderNamesPakeepsElementId = isItemShoulBePasted ? clonedSourceArr[correntIdx] : el;
        return [...sum, newOrderNamesPakeepsElementId];
      };

      const validetedPakeepsOrderNames = pakeepsOrderNames;
      const newOrderNames = validetedPakeepsOrderNames.reduce(newOrderNamesReduceFunc, []);
      return handleSetPakeepsOrderNames(newOrderNames);
    }

    const destinationArrFilterFunc = (el: OrderNameType, idx: number) => {
      return (idx + columnOrderLenght) % columnOrderLenght === destinationDroppableNumber % columnOrderLenght && el;
    };
    const destinationArr = pakeepsOrderNames.filter(destinationArrFilterFunc);
    // console.log(sourceArr.length);
    const clonedDestinationArr = _.clone(destinationArr);

    _.remove(clonedSourceArr, sourceIdx => sourceIdx === sourceArr[source.index]);

    clonedDestinationArr.push(placeholderName);
    _.fill(clonedDestinationArr, sourceArr[source.index], destination.index, destination.index + 1);
    _.remove(clonedDestinationArr, (el, idx) => idx > destination.index);

    const partOfDestinationArrWhichWillBeConcated = destinationArr.filter((el, idx) => idx >= destination.index);
    const concatedDestinationArr = _.concat(clonedDestinationArr, partOfDestinationArrWhichWillBeConcated);

    const newOrderNamesReduceFunc: NewOrderNamesReduceFunc = (sum, el, idx) => {
      const correntIdx = Math.floor(((sumLengthOfAllPakeeps / columnOrderLenght) * idx) / sumLengthOfAllPakeeps);
      const remainderValue = (idx + columnOrderLenght) % columnOrderLenght;
      const isItemWhichShouldBePastedIsInSourceArr = remainderValue === sourceDroppableNumber % columnOrderLenght;
      const isItemWhichShouldBePastedIsInDestinationArr =
        remainderValue === destinationDroppableNumber % columnOrderLenght;

      const sourceArrItem = (isItemWhichShouldBePastedIsInSourceArr && clonedSourceArr[correntIdx]) ?? placeholderName;
      const destinationArrItem =
        (isItemWhichShouldBePastedIsInDestinationArr && concatedDestinationArr[correntIdx]) ?? placeholderName;

      const newOrderNamesPakeepsElementId = destinationArrItem || sourceArrItem || el;

      if (!newOrderNamesPakeepsElementId) return sum;
      return [...sum, newOrderNamesPakeepsElementId];
    };

    const isLengthOfColumnMoreThanAverage = concatedDestinationArr.length > sumLengthOfAllPakeeps / columnOrderLenght;
    const fillValue = concatedDestinationArr.length * columnOrderLenght - sumLengthOfAllPakeeps;

    const placholderArrWhichShouldBeConcated =
      isLengthOfColumnMoreThanAverage && Array(fillValue).fill(placeholderName);

    const newPakeepsOrderNames = _.concat(pakeepsOrderNames, placholderArrWhichShouldBeConcated);
    const reducedOrderNames = _.reduce(newPakeepsOrderNames, newOrderNamesReduceFunc, []);

    const uniqName = 'FUCK_UP';
    const stringNewOrderNames = _.join(reducedOrderNames, uniqName);
    const placeholderPattern = _.join(Array(columnOrderLenght).fill(placeholderName), uniqName);

    const toRemoveNameString = 'toRemove';
    const toSplitNewOrderString = stringNewOrderNames.replaceAll(placeholderPattern, toRemoveNameString);
    const filteredNewOrderArr = _.split(toSplitNewOrderString, uniqName);

    const newOrderNames = _.filter(filteredNewOrderArr, string => string !== toRemoveNameString);

    return handleSetPakeepsOrderNames(newOrderNames);
  };

  const allPakeepListContainerProps = {
    columnOfPakeepListContainerProps,
    responsiveColumnOrder,
    columns,
    pakeeps,
    onDragEnd,
    onDragStart
  };
  return <PakeepListContainer {...allPakeepListContainerProps} />;
};

export default memo(WrapperOfContainerOfPakeepList);
