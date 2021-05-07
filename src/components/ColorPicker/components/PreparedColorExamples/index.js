import { Grid, makeStyles } from '@material-ui/core';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';
import ColumnOfPreparedColorExamples from './components/Column';
import { changeOneColorColumnThunk, changeTwoColorColumnThunk } from 'store/ColorReducer';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(0.4)
  }
}));

const PreparedColorExamples = ({
  color,
  isExtended,
  handleSetColor,
  colorsArr,
  changeOneColorColumnThunk,
  changeTwoColorColumnThunk
}) => {
  const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];
  const classes = useStyles();
  const onDragEnd = ({ destination, source, draggableId }) => {
    console.log(destination, source, draggableId);
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;

    const columnStart = colorsArr[source.droppableId];
    const columnFinish = colorsArr[destination.droppableId];
    if (columnStart.length <= 1) return;
    if (columnStart === columnFinish) {
      const newArr = _.filter(columnStart, (placeholder, idx) => source.index !== idx);
      const itemWhichShouldBeAdded = columnStart[source.index];

      newArr.splice(destination.index, 0, itemWhichShouldBeAdded);

      return changeOneColorColumnThunk(source.droppableId, newArr);
    }

    const newStartArr = _.filter(columnStart, (placeholder, idx) => source.index !== idx);
    const itemWhichShouldBeAdded = columnStart[source.index];

    const newFinishArr = [...columnFinish, itemWhichShouldBeAdded];

    changeTwoColorColumnThunk(
      { id: destination.droppableId, newArr: newFinishArr },
      { id: source.droppableId, newArr: newStartArr }
    );
  };
  const onBeforeDragStart = ({source}) => {
    if (colorsArr[source.droppableId].length <= 1) return;
  };
  const columnElementProps = {
    handleSetColor,
    isExtended,
    color
  };

  const dragDropContextProps = { onDragEnd, onBeforeDragStart };
  return (
    <DragDropContext {...dragDropContextProps}>
      <Grid container display={'flex'} className={classes.container}>
        {columnOrder?.map((columnId, idx) => {
          const columnElements = colorsArr[columnId];
          if (!columnElements) return;

          const columnProps = {
            columnElementProps,
            key: nanoid(),
            droppableId: columnId,
            columnElements
          };

          return <ColumnOfPreparedColorExamples {...columnProps} />;
        })}
      </Grid>
    </DragDropContext>
  );
};

PreparedColorExamples.propTypes = {};

const mapStateToProps = ({ color: { colorsArr } }) => ({ colorsArr });

const mapDispatchToProps = dispatch => ({
  changeOneColorColumnThunk: (columnId, newArr) => dispatch(changeOneColorColumnThunk(columnId, newArr)),
  changeTwoColorColumnThunk: (startColumn, finishColumn) =>
    dispatch(changeTwoColorColumnThunk(startColumn, finishColumn))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreparedColorExamples);
