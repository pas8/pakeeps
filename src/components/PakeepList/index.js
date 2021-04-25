import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import PakeepElement from './components/PakeepElement';
import shortid from 'shortid';
import { useMeasure } from 'react-use';
import { useState } from 'react';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { changePakeepColumnsDataThunk } from 'store/AppReducer/index';
import { takeValueFromBreakpoints } from 'hooks/takeValueFromBreakpoints.hook';
const useStyles = makeStyles(theme => ({
  container: { margin: theme.spacing(8, 0,0,0) }
}));

const PakeepList = ({ pakeeps, labels, columns, columnOrder, changePakeepColumnsDataThunk }) => {
  const theme = useTheme();
  const classes = useStyles();

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;

    const column = columns[source.droppableId];
    let newPaKeepIds = Array.from(column.pakeepIds);
    console.log(newPaKeepIds);

    newPaKeepIds.splice(source.index, 1);
    newPaKeepIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      pakeepIds: newPaKeepIds
    };

    changePakeepColumnsDataThunk(newColumn);
  };
  console.log();

  const responsiveColumnOrder = columnOrder.slice(0, takeValueFromBreakpoints([6, 4, 3, 2, 1]));
  const responsiveColumns = columns[takeValueFromBreakpoints()];
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container display={'flex'} className={classes.container}>
        {responsiveColumnOrder.map((columnId, idx) => {
          const column = responsiveColumns[columnId];
          const pakeepsInColumn = column.pakeepIds.map(pakeepId => pakeeps[pakeepId]);
          return (
            <Column
              key={column.id}
              column={column}
              pakeepsInColumn={pakeepsInColumn}
              lastColumn={idx + 1 === responsiveColumnOrder.length ? true : false}
              firstColumn={idx === 0  ? true : false}
            />
          );
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
const mapDispatchToProps = dispatch => ({
  changePakeepColumnsDataThunk: data => dispatch(changePakeepColumnsDataThunk(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepList);
