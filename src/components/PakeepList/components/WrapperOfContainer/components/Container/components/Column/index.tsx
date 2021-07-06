import { makeStyles, Grid } from '@material-ui/core';
import { VariableSizeList as List } from 'react-window';
import React, { FC, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DraggableChildrenFn, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import { useValidationOfPakeepsInColumn } from 'hooks/useValidationOfPakeepsInColumn.hook';
import {
  ColumnOfPakeepListContainerPropsType,
  HandleSetPakeepElementHeigthArrType,
  PakeepElementHeigthArrType
} from './type';
import PakeepElement from 'components/PakeepList/components/PakeepElement';

import RowOfColumnOfPakeepListContainer from './components/Row';
import { find, sum, values } from 'lodash';

const paddingValue = 0.8;
const paddingValueX = 0.8 * 2;
const paddingValueOfElement = 0.8 * (2 + 1);

const useStyles = makeStyles(({ spacing, breakpoints: { down } }) => ({
  column: () => ({
    // padding: spacing(0, paddingValue),
    '& > div > div': {
      '&::-webkit-scrollbar': {
        width: 0
      }
      // overflow: 'hidden !important'
      // position: isPakeepDragging ? 'relative' : 'fixed'
    }
  })
  // columnFirst: {
  //   padding: spacing(0),
  //   paddingRight: spacing(paddingValue),
  //   [down('sm')]: {
  //     paddingRight: spacing(paddingValueX / 1.8)
  //   }
  // },
  // columnLast: {
  //   padding: spacing(0),
  //   paddingLeft: spacing(paddingValue),
  //   [down('sm')]: {
  //     paddingLeft: spacing(paddingValue / 1.8)
  //   }
  // },
  // columnElement: {
  //   margin: spacing(0),
  //   marginBottom: spacing(paddingValueOfElement),
  //   [down('sm')]: {
  //     marginBottom: spacing(paddingValueOfElement / 1.2)
  //   }
  // }
}));

const ColumnOfPakeepListContainer: FC<ColumnOfPakeepListContainerPropsType & { handleSetArrOfRefs: any }> = ({
  column,
  pakeepsInColumn: notValidatedPakeepsInColumn,
  // pakeepsInColumn,
  isLastColumn,
  isFirstColumn,
  folderProperty,
  folderId,
  isPakeepDragContextPinned,
  isSelecting,
  onClickOfPakeepElement,
  pakeepListMeasure,
  columnOrderIdx,
  handleSetArrOfRefs
}) => {
  const pakeepsInColumn = useValidationOfPakeepsInColumn({
    notValidatedPakeepsInColumn,
    folderProperty,
    folderId,
    isPakeepDragContextPinned
  });
  if (!pakeepsInColumn) return null;

  const classes = useStyles();
  const [breakpoint] = useCustomBreakpoint();

  const breakpointValues = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
  const gridContainerProps: any = {
    className:
      breakpoint !== 'xs' &&
      // clsx(classes.column, isLastColumn ? classes.columnLast : isFirstColumn && classes.columnFirst),
      clsx(classes.column),
    //@ts-ignore
    [breakpoint]: breakpointValues[breakpoint],
    spacing: 8
  };

  const [pakeepElementHeigthArr, setPakeepElementHeigthArr] = useState<PakeepElementHeigthArrType>(
    {} as PakeepElementHeigthArrType
  );

  const handleSetPakeepElementHeigthArr: HandleSetPakeepElementHeigthArrType = ({ id, height }) => {
    setPakeepElementHeigthArr(state => ({ ...state, [id]: height }));
  };

  const defaultPakeepElementProps = {
    isSelecting,
    onClickOfPakeepElement,
    handleSetPakeepElementHeigthArr
  };

  const DEFAULT_PAKEEP_VALUE = 200;

  const toggleResetItemSize = (idx: number) => {
    if (!!ref?.current) ref.current.resetAfterIndex(idx);
  };

  const getItemSize = (index: number) => {
    const id = pakeepsInColumn[index]?.id;
    const size = pakeepElementHeigthArr[id!];

    return (size || DEFAULT_PAKEEP_VALUE) + 16;
  };
  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    const list = ref?.current;
    if (list) {
      list.scrollTo(0);
    }
  }, [columnOrderIdx]);

  useEffect(() => {
    handleSetArrOfRefs(ref);
  }, []);

  const renderClone: DraggableChildrenFn = (provided, snapshot, rubric) => {
    const idx = rubric.source.index;

    const el = find(pakeepsInColumn, ['id', rubric.draggableId]);

    // const pakeepElementHeigth = pakeepsInColumn[el?.id!]!;

    if (!el) return <>null</>;
    const isPinIconShouldBeShownInPakeep = folderProperty === 'ALL' && el.isPinned;

    const handleResetItemSize = () => toggleResetItemSize(idx);

    const draggableContainerProps = {
      ...provided.dragHandleProps,
      ...provided.draggableProps,
      innerRef: provided.innerRef,
      ref: provided.innerRef
      // className: classes.columnElement
    };

    const allPakeepElementProps = {
      ...el,
      ...defaultPakeepElementProps,
      pakeepElementHeigth: pakeepElementHeigthArr[rubric.draggableId],
      handleResetItemSize,
      idx,
      isPinIconShouldBeShownInPakeep,
      isDragging: snapshot.isDragging
    };
    return (
      <Grid {...draggableContainerProps}>
        <PakeepElement {...allPakeepElementProps} />
      </Grid>
    );
  };

  const droppableProps = { droppableId: `${column.id}`, direction: 'vertical', mode: 'virtual', renderClone } as const;

  const itemCount = pakeepsInColumn.length;

  const listProps = {
    ...pakeepListMeasure,
    ref,
    itemData: {
      pakeepsInColumn,
      folderProperty,
      toggleResetItemSize,
      defaultPakeepElementProps,
      isPakeepDragContextPinned,
      pakeepElementHeigthArr,
      folderId
    },
    itemCount,
    itemSize: getItemSize
  };

  return (
    <Grid {...gridContainerProps}>
      <Droppable {...droppableProps}>
        {provided => {
          return (
            <Grid innerRef={provided.innerRef} {...provided.droppableProps}>
              {
                //@ts-ignore
                <List {...listProps} outerRef={provided.innerRef}>
                  {RowOfColumnOfPakeepListContainer}
                </List>
              }
              {provided.placeholder}
            </Grid>
          );
        }}
      </Droppable>
    </Grid>
  );
};

export default memo(ColumnOfPakeepListContainer);
