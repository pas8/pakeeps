import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import DraggableContainerOfPakeepElement from './components/DraggableContainer';

const paddingValue = 0.8;
const paddingValueX = 0.8 * 2;
const paddingValueOfElement = 0.8 * (2 + 1);

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  column: { padding: spacing(0, paddingValue), border: '2px solid blue' },
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

const ColumnOfPakeepListContainer = ({
  column,
  pakeepsInColumn,
  isLastColumn,
  isFirstColumn,
  folderProperty,
  folderId
}) => {
  const classes = useStyles();
  const [breakpoint] = useCustomBreakpoint();

  const breakpointValues = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
  const gridContainerProps = {
    className:
      breakpoint !== 'xs' &&
      clsx(classes.column, isLastColumn ? classes.columnLast : isFirstColumn && classes.columnFirst),

    [breakpoint]: breakpointValues[breakpoint],
    spacing: 8
  };

  return (
    <Grid {...gridContainerProps}>
      <Droppable droppableId={column.id} direction={'vertical'}>
        {provided => (
          <Grid innerRef={provided.innerRef} {...provided.droppableProps}>
            {pakeepsInColumn.map((el, idx) => {
              const draggableProps = { key: el.id, index: idx, draggableId: el.id };

              const draggableContainerOfPakeepElementProps = { draggableProps, el, idx };
              const draggableEl = <DraggableContainerOfPakeepElement {...draggableContainerOfPakeepElementProps} />;

              if (folderProperty === 'isArchived' && el[folderProperty]) return draggableEl;
              if (el.isArchived) return;
              if (el[folderProperty] && folderProperty !== 'label') return draggableEl;
              if (folderProperty !== 'isPinned' && el.isPinned) return;

              if (folderProperty === 'ALL') return draggableEl;

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

ColumnOfPakeepListContainer.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.any
  }),
  isFirstColumn: PropTypes.any,
  folderId: PropTypes.any,
  folderProperty: PropTypes.string,
  isLastColumn: PropTypes.any,
  pakeepsInColumn: PropTypes.shape({
    map: PropTypes.func
  })
};

export default ColumnOfPakeepListContainer;
