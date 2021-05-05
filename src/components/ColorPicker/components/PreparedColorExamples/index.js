import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';
import ColumnOfPreparedColorExamples from './components/Column';

const PreparedColorExamples = ({ color, isExtended, handleSetColor, colorsArr }) => {

  const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

  const onDragEnd = ({ destination, source, draggableId }) => {
    console.log(destination, source, draggableId);
    // if (!destination) return;
    // if (!destination.id === source.draggableId && destination.index === source.index) return;

    // const columnStart = responsiveColumns[source.droppableId];
    // const columnFinish = responsiveColumns[destination.droppableId];

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

    // let startPaKeepIds = Array.from(columnStart.pakeepIds);
    // let finishPaKeepIds = Array.from(columnFinish.pakeepIds);

    // startPaKeepIds.splice(source.index, 1);
    // finishPaKeepIds.splice(destination.index, 0, draggableId);

    // const newColumnStart = { ...columnStart, pakeepIds: startPaKeepIds };
    // const newColumnFinish = { ...columnFinish, pakeepIds: finishPaKeepIds };

    // changeTwoPakeepColumnsDataThunk(newColumnStart, newColumnFinish, breakpointNames);
  };
  const columnElementProps = {
    handleSetColor,
    isExtended,
    color
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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

// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(PreparedColorExamples);
