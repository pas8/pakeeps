import { makeStyles, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import ColumnElementOfPreparedColorExamples from './components/ColumnElement';
import { ColumnOfPreparedColorExamplesPropsType } from '../../types';

const useStyles = makeStyles(theme => ({
  containerOfElement: {
    margin: theme.spacing(0.4, 0, 1.24)
  },
  container: {
    margin: theme.spacing(0.24)
  }
}));

const ColumnOfPreparedColorExamples:FC<ColumnOfPreparedColorExamplesPropsType> = ({
  columnElements,
  columnElementProps,
  droppableId,
  isColor = true,
  CustomColumnElement,
  customColor
}) => {
  const classes = useStyles();
  const ColumnElement = isColor ? ColumnElementOfPreparedColorExamples : CustomColumnElement;
  // const ColumnElement = Grid;
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
                      <ColumnElement
                        {...el}
                        {...columnElementProps}
                        isDragging={snapshot.isDragging}
                        customColor={customColor}
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
