import { makeStyles, Grid, Zoom } from '@material-ui/core';
import React from 'react';
import PakeepElement from '../PakeepElement';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({

  container:{
border:'2px solid red',

marginBottom:spacing(10)
  }
}));

const PinColumn = ({ column, pakeepsInColumn, lastColumn, firstColumn, folderProperty, folderId }) => {
  const classes = useStyles();
  const [breakpoint] = useCustomBreakpoint();

  const breakpointValues = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
  const gridContainerProps = {
    className:classes.container,
      // breakpoint !== 'xs' && clsx(classes.column, lastColumn ? classes.columnLast : firstColumn && classes.columnFirst),

      [breakpoint]: breakpointValues[breakpoint],

    spacing: 8
  };

  return (
    <Grid {...gridContainerProps}>
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
                      <Zoom in={true}>
                        <PakeepElement {...el} isDragging={snapshot.isDragging} idx={idx} />
                      </Zoom>
                    </Grid>
                  )}
                </Draggable>
              );
              if(el.isArchived) return;

              if (folderProperty !== 'isPinned' && el.isPinned) return draggableEl;
              return;
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};

export default PinColumn;
