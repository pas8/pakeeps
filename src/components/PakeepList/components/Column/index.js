import { makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import PakeepElement from '../PakeepElement';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';

const paddingValue = 0.8;
const paddingValueX = 0.8 * 2;
const paddingValueOfElement = 0.8 * (2 + 1);

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  column: { padding: spacing(0, paddingValue) },
  columnFirst: {
    padding: spacing(0),
    paddingRight: spacing(paddingValueX),
    [breakpoints.down('sm')]: {
      paddingRight: spacing(paddingValueX / 1.8)
    }
  },
  columnLast: {
    padding: spacing(0),
    paddingLeft: spacing(paddingValueX),
    [breakpoints.down('sm')]: {
      paddingLeft: spacing(paddingValueX / 1.8)
    }
  },
  columnElement: {
    margin: spacing(0),
    marginBottom: spacing(paddingValueOfElement),
    [breakpoints.down('sm')]: {
      marginBottom: spacing(paddingValueOfElement / 1.2)
    }
  }
}));

const Column = ({ column, pakeepsInColumn, lastColumn, firstColumn, forderProperty }) => {
  const classes = useStyles();
  const [breakpoint] = useCustomBreakpoint();

  return (
    <Grid
      className={
        breakpoint !== 'xs' &&
        clsx(classes.column, lastColumn ? classes.columnLast : firstColumn && classes.columnFirst)
      }
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
            {pakeepsInColumn.map((el, idx) => {
              // if(!el) return;
              const draggableEl = (
                <Draggable key={el.id} draggableId={el.id} index={idx}>
                  {(provided, snapshot) => (
                    <Grid
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      innerRef={provided.innerRef}
                      className={classes.columnElement}
                    >
                      <PakeepElement {...el} isDragging={snapshot.isDragging} idx={idx} />
                    </Grid>
                  )}
                </Draggable>
              );
              if (forderProperty === 'ALL') return draggableEl;
              if (!el[forderProperty]) return;

              return draggableEl;
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};

export default Column;
