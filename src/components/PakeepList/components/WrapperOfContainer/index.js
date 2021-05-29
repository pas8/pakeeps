import { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { usePrevious } from 'react-use';
import { useMakeDraggableArr } from 'hooks/useMakeDraggableArr.hook';
import PakeepListContainer from './components/Container';
import { connect } from 'react-redux';
import { getPakeepsOrderNames } from 'store/modules/App/selectors';

const WrapperOfContainerOfPakeepList = ({
  pakeeps,
  pakeepsOrderNames,
  handleSetPreviusOrderNamesFunc,
  isUsePreviuosOrder,
  pakeepListContainerProps
}) => {
  const placeholderName = 'placeholder';

  const previousPakeepsOrderNames = usePrevious(pakeepsOrderNames);

  useEffect(() => {
    console.log(isUsePreviuosOrder)
    handleSetPreviusOrderNamesFunc(previousPakeepsOrderNames);
  }, [isUsePreviuosOrder]);

  const [columns, responsiveColumnOrder] = useMakeDraggableArr(
    pakeeps,
    pakeepsOrderNames,
    handleSetPreviusOrderNamesFunc
    // pakeepListContainerProps.isPakeepDragContextPinned
  );

  const onDragStart = () => null;

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (!destination.id === source.index && destination.index === source.index) return;

    const isSameColumn = source.droppableId === destination.droppableId;
    if (source.index === destination.index && isSameColumn) return;

    const sourceDroppableNumber = +source.droppableId;
    const destinationDroppableNumber = +destination.droppableId;

    const columnOrderLenght = responsiveColumnOrder.length;
    const sourceArrFilterFunc = (el, idx) =>
      (idx + columnOrderLenght) % columnOrderLenght === sourceDroppableNumber % columnOrderLenght && el;

    const sourceArr = pakeepsOrderNames.filter(sourceArrFilterFunc);
    const clonedSourceArr = _.clone(sourceArr);

    const sumLengthOfAllPakeeps = pakeepsOrderNames.length;

    const toCorrect = +destinationDroppableNumber !== 0;
    if (isSameColumn) {
      // clonedSourceArr.push('placeholder');
      _.fill(clonedSourceArr, sourceArr[source.index], destination.index, destination.index + 1);
      _.fill(clonedSourceArr, sourceArr[destination.index], source.index, source.index + 1);

      const newOrderNamesReduceFunc = (sum, el, idx) => {
        const correntIdx =
          Math.ceil(((sumLengthOfAllPakeeps / columnOrderLenght) * idx) / sumLengthOfAllPakeeps) - +toCorrect;
        const isItemShoulBePasted =
          (idx + columnOrderLenght) % columnOrderLenght === sourceDroppableNumber % columnOrderLenght;

        const newOrderNamesPakeepsElementId = isItemShoulBePasted ? clonedSourceArr[correntIdx] : el;

        return [...sum, newOrderNamesPakeepsElementId];
      };
      const newOrderNames = pakeepsOrderNames.reduce(newOrderNamesReduceFunc, []);

      return handleSetPreviusOrderNamesFunc(newOrderNames);
    }

    const destinationArrFilterFunc = (el, idx) => {
      return (idx + columnOrderLenght) % columnOrderLenght === destinationDroppableNumber % columnOrderLenght && el;
    };
    const destinationArr = pakeepsOrderNames.filter(destinationArrFilterFunc);
    // console.log(sourceArr.length);
    const clonedDestinationArr = _.clone(destinationArr);

    _.remove(clonedSourceArr, sourceIdx => sourceIdx === sourceArr[source.index]);

    clonedDestinationArr.push('placeholder');
    _.fill(clonedDestinationArr, sourceArr[source.index], destination.index, destination.index + 1);
    _.remove(clonedDestinationArr, (el, idx) => idx > destination.index);

    const partOfDestinationArrWhichWillBeConcated = destinationArr.filter((el, idx) => idx >= destination.index);
    const concatedDestinationArr = _.concat(clonedDestinationArr, partOfDestinationArrWhichWillBeConcated);

    const newOrderNamesReduceFunc = (sum, el, idx) => {
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

    const stringNewOrderNames = _.join(reducedOrderNames, '_');
    const placeholderPattern = _.join(Array(columnOrderLenght).fill(placeholderName), '_');

    const toRemoveNameString = 'toRemove';
    const toSplitNewOrderString = stringNewOrderNames.replaceAll(placeholderPattern, toRemoveNameString);
    const filteredNewOrderArr = _.split(toSplitNewOrderString, '_');

    const newOrderNames = _.filter(filteredNewOrderArr, string => string !== toRemoveNameString);
    return handleSetPreviusOrderNamesFunc(newOrderNames);
  };

  const allPakeepListContainerProps = {
    ...pakeepListContainerProps,
    responsiveColumnOrder,
    columns,
    pakeeps,
    onDragEnd,
    onDragStart,
    placeholderName
  };
  console.log(pakeepsOrderNames)
  return <PakeepListContainer {...allPakeepListContainerProps} />;
};

WrapperOfContainerOfPakeepList.propTypes = {
  columnOrder: PropTypes.shape({
    slice: PropTypes.func
  }),
  columns: PropTypes.object,
  handleSetPreviusOrderNamesFunc: PropTypes.func,
  isUsePreviuosOrder: PropTypes.bool,
  labels: PropTypes.any,
  pakeepListContainerProps: PropTypes.any,
  pakeeps: PropTypes.any,
  pakeepsOrderNames: PropTypes.shape({
    filter: PropTypes.func,
    length: PropTypes.any,
    reduce: PropTypes.func
  })
};
const mapStateToProps = ({ app: { pakeepsOrderNames } }) => ({
  pakeepsOrderNames: getPakeepsOrderNames(pakeepsOrderNames)
});

export default connect(mapStateToProps)(WrapperOfContainerOfPakeepList);
