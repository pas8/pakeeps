import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import DraggableContainerOfPakeepElement from './components/DraggableContainer';
import { useValidationOfPakeepsInColumn } from 'hooks/useValidationOfPakeepsInColumn.hook';
import { ColumnOfPakeepListContainerPropsType } from './type';

const paddingValue = 0.8;
const paddingValueX = 0.8 * 2;
const paddingValueOfElement = 0.8 * (2 + 1);

const useStyles = makeStyles(({ spacing, breakpoints: { down } }) => ({
  column: { padding: spacing(0, paddingValue) },
  columnFirst: {
    padding: spacing(0),
    paddingRight: spacing(paddingValue),
    [down('sm')]: {
      paddingRight: spacing(paddingValueX / 1.8)
    }
  },
  columnLast: {
    padding: spacing(0),
    paddingLeft: spacing(paddingValue),
    [down('sm')]: {
      paddingLeft: spacing(paddingValue / 1.8)
    }
  },
  columnElement: {
    margin: spacing(0),
    marginBottom: spacing(paddingValueOfElement),
    [down('sm')]: {
      marginBottom: spacing(paddingValueOfElement / 1.2)
    }
  }
}));

const ColumnOfPakeepListContainer: FC<ColumnOfPakeepListContainerPropsType> = ({
  column,
  pakeepsInColumn,
  isLastColumn,
  isFirstColumn,
  folderProperty,
  folderId,
  isPakeepDragContextPinned,
  isSelecting
}) => {
  const classes = useStyles();
  const [breakpoint] = useCustomBreakpoint();

  const breakpointValues = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
  const gridContainerProps: any = {
    className:
      breakpoint !== 'xs' &&
      clsx(classes.column, isLastColumn ? classes.columnLast : isFirstColumn && classes.columnFirst),
    //@ts-ignore
    [breakpoint]: breakpointValues[breakpoint],
    spacing: 8
  };

  return (
    //@ts-ignore
    <Grid {...gridContainerProps}>
      <Droppable droppableId={`${column.id}`} direction={'vertical'}>
        {provided => (
          <Grid innerRef={provided.innerRef} {...provided.droppableProps}>
            {pakeepsInColumn.map((el, idx) => {
              if (!el) return;
              const draggableProps = { key: el.id, index: idx, draggableId: el.id };

              const draggableContainerClassName = classes.columnElement;
              const isPinIconShouldBeShownInPakeep = folderProperty === 'ALL' && el.isPinned;

              const pakeepElementProps = { ...el, idx, isPinIconShouldBeShownInPakeep, isSelecting };

              const draggableContainerOfPakeepElementProps = {
                draggableProps,
                pakeepElementProps,
                draggableContainerClassName
              };

              const draggableEl = <DraggableContainerOfPakeepElement {...draggableContainerOfPakeepElementProps} />;

              const validDraggableEl = useValidationOfPakeepsInColumn(
                isPakeepDragContextPinned,
                { el, folderProperty, folderId },
                draggableEl
              );
              return validDraggableEl;
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};

export default ColumnOfPakeepListContainer;
