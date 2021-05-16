import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  addNewPaKeepThunk,
  changePakeepColumnsDataThunk,
  changeTwoPakeepColumnsDataThunk,
  deletePakeepThunk
} from 'store/modules/App/operations';
import { takeValueFromBreakpoints } from 'hooks/takeValueFromBreakpoints.hook';
import Column from './components/Column';
import { useMakeDraggableArr } from 'hooks/useMakeDraggableArr.hook';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(8, 0, 0, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(4, 0, 0, 0)
    }
  }
}));

const PakeepList = ({ pakeeps, labels, deletePakeepThunk, addNewPakeepThunk }) => {
  const classes = useStyles();

  const [columns, responsiveColumnOrder] = useMakeDraggableArr(pakeeps);

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;
console.log(!destination, !destination.id === source.draggableId && destination.index === source.index)
    const pakeepsWhichShouldBeMoved = pakeeps.find(({ id }) => id === draggableId);
    const numberOfPakeepsIdx = destination.index * responsiveColumnOrder.length + +destination.droppableId;
    deletePakeepThunk(draggableId);
    addNewPakeepThunk({ ...pakeepsWhichShouldBeMoved, idx: numberOfPakeepsIdx,date:Date.now() });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container className={classes.container}>
        {responsiveColumnOrder?.map((columnId, idx) => {
          const column = columns[columnId];
          if (!column) return;

          const pakeepsInColumn = column.pakeeps;
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

const mapStateToProps = ({ app: { pakeeps, labels, columns, columnOrder } }) => ({
  pakeeps,
  labels,
  columns,
  columnOrder
});
const mapDispatchToProps = dispatch => ({
  deletePakeepThunk: id => dispatch(deletePakeepThunk(id)),
  addNewPakeepThunk: data => dispatch(addNewPaKeepThunk(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepList);
