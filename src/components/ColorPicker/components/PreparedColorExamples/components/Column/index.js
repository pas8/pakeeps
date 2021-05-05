import { makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import ColumnElementOfPreparedColorExamples from './components/ColumnElement';

const useStyles = makeStyles(theme => ({}));

const ColumnOfPreparedColorExamples = ({ columnElements, columnElementProps, droppableId }) => {
  const classes = useStyles();

  return (
    <Grid>
      <Droppable droppableId={droppableId} direction={'vertical'}>
        {provided => (
          <Grid innerRef={provided.innerRef} {...provided.droppableProps}>
            {columnElements.map((el, idx) => {
              const draggableId = `${droppableId}-${idx}`;
              return (
                <Draggable key={el.id} draggableId={draggableId} index={idx}>
                  {(provided, snapshot) => (
                    <Grid {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}>
                      <ColumnElementOfPreparedColorExamples
                        {...el}
                        {...columnElementProps}
                        isDragging={snapshot.isDragging}
                      />
                    </Grid>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};

export default ColumnOfPreparedColorExamples;
