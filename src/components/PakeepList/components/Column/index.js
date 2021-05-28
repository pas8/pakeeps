import { makeStyles, Grid, Zoom } from '@material-ui/core';
import React from 'react';
import PakeepElement from '../PakeepElement';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';

const paddingValue = 0.8;
const paddingValueX = 0.8 * 2;
const paddingValueOfElement = 0.8 * (2 + 1);

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  column: { padding: spacing(0, paddingValue),border:'2px solid blue' },
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

const Column = ({ column, pakeepsInColumn, lastColumn, firstColumn, folderProperty, folderId }) => {
  const classes = useStyles();
  const [breakpoint] = useCustomBreakpoint();

  const breakpointValues = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
  const gridContainerProps = {
    className:
      breakpoint !== 'xs' && clsx(classes.column, lastColumn ? classes.columnLast : firstColumn && classes.columnFirst),

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
              
            
              if (folderProperty === 'isArchived' && el[folderProperty]) return draggableEl;
              if(el.isArchived) return;

              if (el[folderProperty] && folderProperty !== 'label') return draggableEl;
              if(folderProperty !== 'isPinned' && el.isPinned) return;

              if (folderProperty === 'ALL' ) return draggableEl;

              if (folderProperty === 'label' && !!_.find(el?.labels, id => id === folderId)) return draggableEl;

              return;
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};

export default Column;
