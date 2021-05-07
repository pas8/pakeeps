import { makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import ColumnElementOfPreparedColorExamples from './components/ColumnElement';

const useStyles = makeStyles(theme => ({
  containerOfElement: {
    margin: theme.spacing(0.4, 0, 1.4)
  },
  container: {
    margin: theme.spacing(0.4)
  }
}));

const ColumnOfPreparedColorExamples = ({ columnElements, columnElementProps, droppableId }) => {
  const classes = useStyles();

  return (
    <Grid>
      <Droppable droppableId={droppableId} direction={'vertical'}>
        {provided => (
          <Grid
            innerRef={provided.innerRef}
            className={classes.container}
            {...provided.droppableProps}
            //  onMouseOver={()=>console.log(';')}
          >
            {columnElements.map((el, idx) => {
              const draggableId = `${droppableId}-${idx}`;
              return (
                <Draggable key={el.id} draggableId={draggableId} index={idx}>
                  {(provided, snapshot) => (
                    <Grid
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      innerRef={provided.innerRef}
                      className={classes.containerOfElement}
                    >
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
