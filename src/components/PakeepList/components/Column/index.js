import { makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import PakeepElement from '../PakeepElement';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
const useStyles = makeStyles(theme => ({
  columnTimed: { border: '1px solid rgba(255, 255, 0,0.4)' }
}));

const Column = ({ column, pakeepsInColumn }) => {
  const classes = useStyles();

  return (
    <Grid flexDirection={'column'} className={classes.columnTimed} sm={6} xs={12} md={4} lg={3} xl={2}>
      {column.title}
      <Droppable droppableId={column.id}>
        {provided => (
          <Grid innerRef={provided.innerRef} {...provided.droppableProps}>
            {pakeepsInColumn.map(el => (
              <PakeepElement {...el} key={el.id} />
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};

export default Column;
