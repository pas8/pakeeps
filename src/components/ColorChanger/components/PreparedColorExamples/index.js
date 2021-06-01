import { Grid, makeStyles } from '@material-ui/core';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';
import ColumnOfPreparedColorExamples from './components/Column';
import { useState } from 'react';
import { changeOneColorColumnThunk, changeTwoColorColumnThunk } from 'store/modules/Color/operations';
import { getColorsArr } from 'store/modules/Color/selectors';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(0.4, 0, 0.4, 0.2)
  }
}));

const PreparedColorExamples = ({
  color,
  isExtended,
  customColor,
  handleSetColor,
  idColumnArr,
  changeOneColorColumnThunk,
  changeTwoColorColumnThunk,
  isColor = true,
  customColumnElementProps,
  CustomColumnElement,
  columnArr
}) => {
  const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

  const classes = useStyles();
  const onDragEnd = ({ destination, source, draggableId }) => {
    console.log(destination, source, draggableId);
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;

    const columnStart = idColumnArr[source.droppableId];
    const columnFinish = idColumnArr[destination.droppableId];

    const columnFromStart = Array.from(columnStart);
    const columnFromFinish = Array.from(columnFinish);

    if (columnStart.length <= 1) return;
    if (columnStart === columnFinish) {
      const newArr = _.filter(columnFromStart, (placeholder, idx) => source.index !== idx);
      const itemWhichShouldBeAdded = columnFromStart[source.index];

      newArr.splice(destination.index, 0, itemWhichShouldBeAdded);

      return changeOneColorColumnThunk(source.droppableId, newArr);
    }

    const newStartArr = _.filter(columnFromStart, (placeholder, idx) => source.index !== idx);
    const itemWhichShouldBeAdded = columnStart[source.index];
    const newFinishArr = columnFromFinish;
    newFinishArr.splice(destination.index, 0, itemWhichShouldBeAdded);

    changeTwoColorColumnThunk(
      { id: destination.droppableId, newArr: newFinishArr },
      { id: source.droppableId, newArr: newStartArr }
    );
  };
  const onBeforeDragStart = ({ source }) => {
    if (idColumnArr[source.droppableId].length <= 1) return;
  };

  const colorColumnElementProps = { handleSetColor, isExtended, color };
  const columnElementProps = isColor ? colorColumnElementProps : customColumnElementProps;

  const dragDropContextProps = { onDragEnd, onBeforeDragStart };
  return (
    <DragDropContext {...dragDropContextProps}>
      <Grid container display={'flex'} className={classes.container}>
        {columnOrder?.map((columnId, idx) => {
          // const columnElements = idColumnArr[columnId];
          const mapFunc = columnItenId => _.filter(columnArr, ({ id }) => columnItenId === id);
          const columnElements = _.flatten(_.map(idColumnArr[columnId], mapFunc));

          if (!columnElements) return;

          const columnProps = {
            CustomColumnElement: isColor ? Grid : CustomColumnElement,
            columnElementProps,
            isColor,
            key: nanoid(),
            droppableId: columnId,
            columnElements,
            customColor
          };

          return <ColumnOfPreparedColorExamples {...columnProps} />;
        })}
      </Grid>
    </DragDropContext>
  );
};

PreparedColorExamples.propTypes = {};

const mapStateToProps = ({ color: { idColumnArr } }) => ({ idColumnArr: getColorsArr(idColumnArr) });

const mapDispatchToProps = dispatch => ({
  changeOneColorColumnThunk: (columnId, newArr) => dispatch(changeOneColorColumnThunk(columnId, newArr)),
  changeTwoColorColumnThunk: (startColumn, finishColumn) =>
    dispatch(changeTwoColorColumnThunk(startColumn, finishColumn))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreparedColorExamples);
