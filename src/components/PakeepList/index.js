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

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;

    const destinationIdx = destination.index * responsiveColumnOrder.length + +destination.droppableId;
    const sourceIdx = source.index * responsiveColumnOrder.length + +source.droppableId;
    // const newOrderNames = _.clone(pakeepsOrderNames);
    const sourceDroppableNumber = +source.droppableId;

    const columnOrderLenght = responsiveColumnOrder.length;
    const sourceArrFilterFunc = (el, idx) =>
      (idx + columnOrderLenght) % columnOrderLenght === source.droppableId % columnOrderLenght && el;

    const sourceArr = pakeepsOrderNames.filter(sourceArrFilterFunc);
    const clonedSourceArr = _.clone(sourceArr);
    _.fill(clonedSourceArr, sourceArr[source.index], destination.index, destination.index + 1);
    _.fill(clonedSourceArr, sourceArr[destination.index], source.index, source.index + 1);

    const sumLengthOfAllPakeeps = pakeepsOrderNames.length;

    if (source.droppableId === destination.droppableId) {
      const newOrderNamesReduceFunc = (sum, el, idx) => {
        const correntIdx = Math.ceil(((sumLengthOfAllPakeeps / columnOrderLenght) * idx) / sumLengthOfAllPakeeps) - 1;
        const isItemShoulBePasted =
          (idx + columnOrderLenght) % columnOrderLenght === sourceDroppableNumber % columnOrderLenght;

        const newOrderNamesPakeepsElementId = isItemShoulBePasted ? clonedSourceArr[correntIdx] : el;
        return [...sum, newOrderNamesPakeepsElementId];
      };
      const newOrderNames = pakeepsOrderNames.reduce(newOrderNamesReduceFunc, []);

      handlePakeepsOrderNamesThunk(newOrderNames);
    }

    const filterFunc = (el, idx) =>
    (idx + columnOrderLenght) % columnOrderLenght === source.droppableId % columnOrderLenght && el;

  // const destinationArr = pakeepsOrderNames.filter(filterFunc);
    // newOrderNames.splice(sourceIdx, 1);
    // newOrderNames.splice(destinationIdx, 0, draggableId);

    // handlePakeepsOrderNamesThunk(newOrderNames);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container className={classes.container}>
        {responsiveColumnOrder?.map((columnId, idx) => {
          const column = columns[columnId];
          if (!column) return;

          const pakeepsInColumn = column.pakeepsId.map(pakeepId => _.find(pakeeps, ({ id }) => id === pakeepId));
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
