import { makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import PakeepElement from '../PakeepElement';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  column: { padding: theme.spacing(0, 0.8) },
  columnFirst: { padding: theme.spacing(0,0.8 * 2,0,0) },
  columnLast: { padding: theme.spacing(0,0,0,0.8 * 2) },
  columnElement:{margin: theme.spacing(0,0,3 * 0.8,0)}
}));

const Column = ({ column, pakeepsInColumn, lastColumn, firstColumn }) => {
  const classes = useStyles();
  return (
    <Grid
      className={clsx(classes.column, lastColumn ? classes.columnLast : firstColumn ? classes.columnFirst : null)}
      sm={6}
      xs={12}
      md={4}
      lg={3}
      xl={2}
      spacing={8}
    >
      <Droppable droppableId={column.id} direction={'vertical'}>
        {provided => (
          <Grid innerRef={provided.innerRef} {...provided.droppableProps}>
            {pakeepsInColumn.map((el, idx) => (
              <Draggable key={el.id} draggableId={el.id} index={idx}>
                {(provided, snapshot) => (
                  <Grid {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} className={classes.columnElement}>
                    <PakeepElement {...el} isDragging={snapshot.isDragging} />
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
