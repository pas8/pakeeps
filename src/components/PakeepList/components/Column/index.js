import { makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import PakeepElement from '../PakeepElement';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const useStyles = makeStyles(theme => ({
  columnTimed: { border: '1px solid rgba(255, 255, 0,0.4)' }
}));

const Column = ({ column, pakeepsInColumn }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.columnTimed} xs={12}>
      {column.title}
      <Droppable droppableId={column.id}>
        {provided => (
          <Grid innerRef={provided.innerRef} {...provided.droppableProps}  display={'flex'}  flexDirection={'column'}>
            {pakeepsInColumn.map((el, idx) => (
              <Draggable key={el.id} draggableId={el.id} index={idx}>
                {provided => (
                  <Grid {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} sm={6} xs={12} md={4} lg={3} xl={2} > 
                    <PakeepElement {...el} />
                  </Grid>
                )}
              </Draggable>
            ))} 
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};

export default Column;
