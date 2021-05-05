import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';
import ColumnOfPreparedColorExamples from './components/Column';
import { changeOneColorColumnThunk } from 'store/ColorReducer';

const PreparedColorExamples = ({ color, isExtended, handleSetColor, colorsArr, changeOneColorColumnThunk }) => {
  const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

  const onDragEnd = ({ destination, source, draggableId }) => {
    console.log(destination, source, draggableId);
    if (!destination) return;
    if (!destination.id === source.draggableId && destination.index === source.index) return;

    const columnStart = colorsArr[source.droppableId];
    const columnFinish = colorsArr[destination.droppableId];

    if (columnStart === columnFinish) {
      const newArr = _.filter(columnStart, (placeholder, idx) => source.index !== idx);
      const itemWhichShouldBeAdded = columnStart[source.index];

      newArr.splice(destination.index, 0, itemWhichShouldBeAdded);

      return changeOneColorColumnThunk(source.droppableId, newArr);
    }

    // let startPaKeepIds = Array.from(columnStart.pakeepIds);
    // let finishPaKeepIds = Array.from(columnFinish.pakeepIds);

    // startPaKeepIds.splice(source.index, 1);
    // finishPaKeepIds.splice(destination.index, 0, draggableId);

    // const newColumnStart = { ...columnStart, pakeepIds: startPaKeepIds };
    // const newColumnFinish = { ...columnFinish, pakeepIds: finishPaKeepIds };

    // console.log(newColumnStart, newColumnFinish);
  };
  const columnElementProps = {
    handleSetColor,
    isExtended,
    color
  };
  const onBeforeCapture = () => {
    console.log('onBeforeCapture');
  };

  const onBeforeDragStart = () => {
    console.log('onBeforeDragStart');
  };

  const onDragStart = () => {
    console.log('onDragStart');
  };

  const onDragUpdate = () => {
    console.log('onDragUpdate');
  };

  const dragDropContextProps = { onDragEnd, onBeforeCapture, onBeforeDragStart, onDragStart, onDragUpdate };
  return (
    <DragDropContext {...dragDropContextProps}>
      <Grid container display={'flex'}>
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
  changeOneColorColumnThunk: (columnId, newArr) => dispatch(changeOneColorColumnThunk(columnId, newArr))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreparedColorExamples);
