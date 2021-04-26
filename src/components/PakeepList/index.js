import PropTypes from 'prop-types';
import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import PakeepElement from './components/PakeepElement';
import shortid from 'shortid';
import { useMeasure } from 'react-use';
import { useState } from 'react';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { changePakeepColumnsDataThunk, changeTwoPakeepColumnsDataThunk } from 'store/AppReducer/index';
import { takeValueFromBreakpoints } from 'hooks/takeValueFromBreakpoints.hook';
const useStyles = makeStyles(theme => ({
  container: { margin: theme.spacing(8, 0, 0, 0) }
}));

const PakeepList = ({
  pakeeps,
  labels,
  columns,
  columnOrder,
  changePakeepColumnsDataThunk,
  changeTwoPakeepColumnsDataThunk
}) => {
  const classes = useStyles();
  let breakpointNames = takeValueFromBreakpoints();

  const responsiveColumns = columns[breakpointNames];
  const responsiveColumnOrder = columnOrder.slice(0, takeValueFromBreakpoints([6, 4, 3, 2, 1]));

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;

    const columnStart = responsiveColumns[source.droppableId];
    const columnFinish = responsiveColumns[destination.droppableId];

    if (columnStart === columnFinish) {
      let newPaKeepIds = Array.from(columnStart.pakeepIds);

      newPaKeepIds.splice(source.index, 1);
      newPaKeepIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...columnStart,
        pakeepIds: newPaKeepIds
      };
      changePakeepColumnsDataThunk(newColumn, breakpointNames);
      return;
    }

    let startPaKeepIds = Array.from(columnStart.pakeepIds);
    let finishPaKeepIds = Array.from(columnFinish.pakeepIds);

    startPaKeepIds.splice(source.index, 1);
    finishPaKeepIds.splice(destination.index, 0, draggableId);

    const newColumnStart = { ...columnStart, pakeepIds: startPaKeepIds };
    const newColumnFinish = { ...columnFinish, pakeepIds: finishPaKeepIds };

    changeTwoPakeepColumnsDataThunk(newColumnStart, newColumnFinish, breakpointNames);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container display={'flex'} className={classes.container}>
        {responsiveColumnOrder || responsiveColumns
          ? responsiveColumnOrder?.map((columnId, idx) => {
              const column = responsiveColumns[columnId];
              const pakeepsInColumn = column?.pakeepIds?.map(pakeepId => pakeeps[pakeepId]);
              return (
                <Column
                  key={column?.id}
                  column={column}
                  pakeepsInColumn={pakeepsInColumn}
                  lastColumn={idx + 1 === responsiveColumnOrder.length ? true : false}
                  firstColumn={idx === 0 ? true : false}
                />
              );
            })
          : null}
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
  changePakeepColumnsDataThunk: (newColumn, breakpointNames) =>
    dispatch(changePakeepColumnsDataThunk(newColumn, breakpointNames)),

  changeTwoPakeepColumnsDataThunk: (newColumnStart, newColumnFinish, breakpointNames) =>
    dispatch(changeTwoPakeepColumnsDataThunk(newColumnStart, newColumnFinish, breakpointNames))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepList);
