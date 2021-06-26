import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import React, { FC, memo, useEffect, useLayoutEffect, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import DraggableContainerOfPakeepElement from './components/DraggableContainer';
import { useValidationOfPakeepsInColumn } from 'hooks/useValidationOfPakeepsInColumn.hook';
import { ColumnOfPakeepListContainerPropsType } from './type';
import PakeepElement from 'components/PakeepList/components/PakeepElement';

import { areEqual, VariableSizeList as List } from 'react-window';
import { useIsomorphicLayoutEffect, useWindowScroll } from 'react-use';
import { debounce, throttle } from 'lodash';

const paddingValue = 0.8;
const paddingValueX = 0.8 * 2;
const paddingValueOfElement = 0.8 * (2 + 1);

const useStyles = makeStyles(({ spacing, breakpoints: { down } }) => ({
  column: { padding: spacing(0, paddingValue), },
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
  isSelecting,
  onClickOfPakeepElement,
  containerWidth,
  columnOrderIdx
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

  const defaultPakeepElementProps = {
    isSelecting,
    onClickOfPakeepElement
  };

  const getItemSize = index => 400;

  const ref = useRef<any>(null);

  const { x, y: value } = useWindowScroll();

  useLayoutEffect(() => {
    const list = ref?.current;
    if (list) {
      list.scrollTo(0);
    }
  }, [columnOrderIdx]);

  useEffect(() => {
    ref.current.scrollTo(value);
  }, [value]);
  // console.log(ref)
  return (
    //@ts-ignore
    <Grid {...gridContainerProps}>
      {/* <button onClick={()=> ref?.current?.scrollToItem(10)}>FUCK</button> */}
      <Droppable
        droppableId={`${column.id}`}
        direction={'vertical'}
        mode={'virtual'}
        renderClone={(provided, snapshot, rubric) => {
          const idx = rubric.source.index;
          const el = pakeepsInColumn[idx];
          if (!el) return <>null</>;

          const isPinIconShouldBeShownInPakeep = folderProperty === 'ALL' && el.isPinned;

          const draggableContainerProps = {
            ...provided.dragHandleProps,
            ...provided.draggableProps,
            innerRef: provided.innerRef,
            className: classes.columnElement
          };

          const allPakeepElementProps = {
            ...el,
            ...defaultPakeepElementProps,
            idx,
            isPinIconShouldBeShownInPakeep,
            isDragging: snapshot.isDragging
          };

          return (
            <Grid {...draggableContainerProps}>
              <PakeepElement {...allPakeepElementProps} />
            </Grid>
          );
        }}
      >
        {(provided, { isDraggingOver }) => (
          <Grid innerRef={provided.innerRef} {...provided.droppableProps}>
            <List
              outerRef={provided.innerRef}
              ref={ref}
              itemData={{
                pakeepsInColumn,
                folderProperty,
                onClickOfPakeepElement,
                isSelecting,
                isPakeepDragContextPinned,
                folderId
              }}
              height={1600}
              itemCount={1000}
              itemSize={getItemSize}
              width={300}
            >
              {Row}
            </List>
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};

export default memo(ColumnOfPakeepListContainer);

const Row = memo(
  ({
    data: { pakeepsInColumn, folderProperty, onClickOfPakeepElement, isSelecting, isPakeepDragContextPinned, folderId },
    index: idx,
    style
  }) => {
    const el = pakeepsInColumn[idx];
    const classes = useStyles();

    if (!el) return <></>;

    const draggableProps = { key: el.id, index: idx, draggableId: el.id };

    const draggableContainerClassName = classes.columnElement;
    const isPinIconShouldBeShownInPakeep = folderProperty === 'ALL' && el.isPinned;

    const pakeepElementProps = {
      ...el,
      idx,
      isPinIconShouldBeShownInPakeep,
      isSelecting,
      onClickOfPakeepElement
    };

    const draggableContainerOfPakeepElementProps = {
      draggableProps,
      isDraggingOver: false,
      style,
      pakeepElementProps,
      draggableContainerClassName
    };

    const draggableEl = <DraggableContainerOfPakeepElement {...draggableContainerOfPakeepElementProps} />;

    const validDraggableEl = useValidationOfPakeepsInColumn(
      isPakeepDragContextPinned,
      { el, folderProperty, folderId },
      draggableEl
    );
    // console.log( )
    if (!validDraggableEl) return <></>;

    return validDraggableEl;
  },
  areEqual
);
