import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import PakeepElement from './components/PakeepElement';
import shortid from 'shortid';
import { useMeasure } from 'react-use';
import { useState } from 'react';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import {changePakeepColumnsDataThunk} from 'store/AppReducer/index'
const useStyles = makeStyles(theme => ({
  container: { marginTop: theme.spacing(8) },
  s: {
    border: '1px solid #fff8',
    cursor: 'move'
  }
}));

const PakeepList = ({ pakeeps, labels, columns, columnOrder,changePakeepColumnsDataThunk }) => {
  const theme = useTheme();
  const classes = useStyles();

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;

    const column = columns[source.droppableId];
    let newPaKeepIds = Array.from(column.pakeepIds);
    console.log(newPaKeepIds)

    newPaKeepIds.splice(source.index, 1);
    newPaKeepIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      pakeepIds: newPaKeepIds
    };

    changePakeepColumnsDataThunk(newColumn)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container display={'flex'} spacing={2} className={classes.container}>
        {columnOrder.map(columnId => {
          const column = columns[columnId];
          const pakeepsInColumn = column.pakeepIds.map(pakeepId => pakeeps[pakeepId]);
          console.log(pakeepsInColumn);
          return <Column key={column.id} column={column} pakeepsInColumn={pakeepsInColumn} />;
        })}
      </Grid>
    </DragDropContext>
  );
};

const mapStateToProps = ({ app: { pakeeps, labels, columns, columnOrder } }) => ({
  pakeeps,
  labels,
  columns,
  columnOrder
});
const mapDispatchToProps = dispatch => ({ changePakeepColumnsDataThunk: data => dispatch(changePakeepColumnsDataThunk(data)) });

export default connect(mapStateToProps, mapDispatchToProps)(PakeepList);
