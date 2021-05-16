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

    // if (columnStart === columnFinish) {
    //   let newPaKeepIds = Array.from(columnStart.pakeepIds);

    //   newPaKeepIds.splice(source.index, 1);
    //   newPaKeepIds.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...columnStart,
    //     pakeepIds: newPaKeepIds
    //   };
    //   changePakeepColumnsDataThunk(newColumn, breakpointNames);
    //   return;
    // }
    const destinationIdx = destination.index * responsiveColumnOrder.length + +destination.droppableId;
    const sourceIdx = source.index * responsiveColumnOrder.length + +source.droppableId;
    // let startPaKeepIds = Array.from(columnStart.pakeepIds);
    // let finishPaKeepIds = Array.from(columnFinish.pakeepIds);
    const newOrderNames = _.clone(pakeepsOrderNames);
    newOrderNames.splice(sourceIdx, 1);
    newOrderNames.splice(destinationIdx, 0, draggableId);
    // console.log(newOrderNames,destinationIdx, sourceIdx);
    console.log(pakeepsOrderNames)

    handlePakeepsOrderNamesThunk(newOrderNames);
    // const newColumnStart = { ...columnStart, pakeepIds: startPaKeepIds };
    // const newColumnFinish = { ...columnFinish, pakeepIds: finishPaKeepIds };
    // changeTwoPakeepColumnsDataThunk(newColumnStart, newColumnFinish, breakpointNames);
  };
console.log(pakeepsOrderNames)
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
