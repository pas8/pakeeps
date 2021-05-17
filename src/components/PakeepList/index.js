import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  addNewPaKeepThunk,
  changePakeepColumnsDataThunk,
  changeTwoPakeepColumnsDataThunk,
  deletePakeepThunk,
  handlePakeepsOrderNamesThunk
} from 'store/modules/App/operations';
import { takeValueFromBreakpoints } from 'hooks/takeValueFromBreakpoints.hook';
import Column from './components/Column';
import { useMakeDraggableArr } from 'hooks/useMakeDraggableArr.hook';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(8, 0, 0, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(4, 0, 0, 0)
    }
  }
}));

const PakeepList = ({
  pakeeps,
  labels,
  changePakeepColumnsDataThunk,
  changeTwoPakeepColumnsDataThunk,
  isDraggableOptimizate,
  pakeepsOrderNames,
  handlePakeepsOrderNamesThunk
}) => {
  const classes = useStyles();

  const [columns, responsiveColumnOrder] = useMakeDraggableArr(
    pakeeps,
    pakeepsOrderNames,
    handlePakeepsOrderNamesThunk
  );
  // const [value, updateCookie, deleteCookie] = useCookie(state);

  // useEffect(() => _.isEqual(state, nulittyState) && setState(JSON.parse(value)), []);

  // usePageLeave(() =>  updateCookie(state));

  const placeholderName = 'placeholder';

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;

    // const destinationIdx = destination.index * responsiveColumnOrder.length + +destination.droppableId;
    // const sourceIdx = source.index * responsiveColumnOrder.length + +source.droppableId;
    // const newOrderNames = _.clone(pakeepsOrderNames);
    const sourceDroppableNumber = +source.droppableId;
    const destinationDroppableNumber = +destination.droppableId;

    const columnOrderLenght = responsiveColumnOrder.length;
    const sourceArrFilterFunc = (el, idx) =>
      (idx + columnOrderLenght) % columnOrderLenght === sourceDroppableNumber % columnOrderLenght && el;

    const sourceArr = pakeepsOrderNames.filter(sourceArrFilterFunc);
    const clonedSourceArr = _.clone(sourceArr);

    const sumLengthOfAllPakeeps = pakeepsOrderNames.length;

    const toCorrect = +(destination.droppableId !== 0);

    if (source.droppableId === destination.droppableId) {
      _.fill(clonedSourceArr, sourceArr[source.index], destination.index, destination.index + 1);
      _.fill(clonedSourceArr, sourceArr[destination.index], source.index, source.index + 1);

      const newOrderNamesReduceFunc = (sum, el, idx) => {
        const correntIdx =
          Math.ceil(((sumLengthOfAllPakeeps / columnOrderLenght) * idx) / sumLengthOfAllPakeeps) - toCorrect;
        const isItemShoulBePasted =
          (idx + columnOrderLenght) % columnOrderLenght === sourceDroppableNumber % columnOrderLenght;

        const newOrderNamesPakeepsElementId = isItemShoulBePasted ? clonedSourceArr[correntIdx] : el;

        return [...sum, newOrderNamesPakeepsElementId];
      };
      const newOrderNames = pakeepsOrderNames.reduce(newOrderNamesReduceFunc, []);

      return handlePakeepsOrderNamesThunk(newOrderNames);
    }

    const destinationArrFilterFunc = (el, idx) => {
      // console.log(el,(idx+ columnOrderLenght)  % columnOrderLenght === destination)
      return (idx + columnOrderLenght) % columnOrderLenght === destinationDroppableNumber % columnOrderLenght && el;
    };
    const destinationArr = pakeepsOrderNames.filter(destinationArrFilterFunc);
    // console.log(sourceArr.length);
    const clonedDestinationArr = _.clone(destinationArr);

    _.remove(clonedSourceArr, sourceIdx => sourceIdx === sourceArr[source.index]);

    // if (clonedDestinationArr.length === 1) clonedDestinationArr.push('placeholder');
    clonedDestinationArr.push('placeholder');
    _.fill(clonedDestinationArr, sourceArr[source.index], destination.index, destination.index + 1);
    _.remove(clonedDestinationArr, (el, idx) => idx > destination.index);

    const partOfDestinationArrWhichWillBeConcated = destinationArr.filter((el, idx) => idx >= destination.index);
    const concatedDestinationArr = _.concat(clonedDestinationArr, partOfDestinationArrWhichWillBeConcated);

    // console.log(
    //   sourceArr[source.index],
    //   destination.index,
    //   concatedDestinationArr,
    //   clonedDestinationArr,
    //   partOfDestinationArrWhichWillBeConcated,
    //   destinationArr,
    //   destination.index
    // );

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

      // console.log(destinationDroppableNumber, sourceDroppableNumber, newOrderNamesPakeepsElementId);

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
    return handlePakeepsOrderNamesThunk(newOrderNames);
  };
  // const placeholder = {
  //   title: 'Placeholder',
  //   text: '',
  //   bookmark: false,
  //   favorite: false,
  //   color: 'default',
  //   isPinned: true,
  //   id: 'placeholder'
  // };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container className={classes.container}>
        {responsiveColumnOrder?.map((columnId, idx) => {
          const column = columns[columnId];
          if (!column?.pakeepsId) return;

          const filterArrToMap = column.pakeepsId.filter(id => id !== placeholderName);
          const pakeepsInColumn = filterArrToMap.map(pakeepId => {
            return _.find(pakeeps, ({ id }) => id === pakeepId);
          });
          return (
            <Column
              key={column?.id}
              column={column}
              pakeepsInColumn={pakeepsInColumn}
              lastColumn={idx + 1 === responsiveColumnOrder.length ? true : false}
              firstColumn={idx === 0 ? true : false}
            />
          );
        })}
      </Grid>
    </DragDropContext>
  );
};

PakeepList.propTypes = {
  changePakeepColumnsDataThunk: PropTypes.func,
  changeTwoPakeepColumnsDataThunk: PropTypes.func,
  columnOrder: PropTypes.shape({
    slice: PropTypes.func
  }),
  columns: PropTypes.any,
  labels: PropTypes.any,
  pakeeps: PropTypes.any
};

const mapStateToProps = ({
  app: { pakeeps, labels, columns, columnOrder, pakeepsOrderNames },
  settings: { isDraggableOptimizate = true }
}) => ({
  pakeeps,
  labels,
  columns,
  columnOrder,
  pakeepsOrderNames,
  isDraggableOptimizate
});
const mapDispatchToProps = dispatch => ({
  changePakeepColumnsDataThunk: (newColumn, breakpointNames) =>
    dispatch(changePakeepColumnsDataThunk(newColumn, breakpointNames)),

  changeTwoPakeepColumnsDataThunk: (newColumnStart, newColumnFinish, breakpointNames) =>
    dispatch(changeTwoPakeepColumnsDataThunk(newColumnStart, newColumnFinish, breakpointNames)),
  handlePakeepsOrderNamesThunk: newOrder => dispatch(handlePakeepsOrderNamesThunk(newOrder))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepList);
