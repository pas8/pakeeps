import { find, sum, values } from 'lodash';
import { makeStyles, Grid } from '@material-ui/core';
import { VariableSizeList as List } from 'react-window';
import React, { FC, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DraggableChildrenFn, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';

import PakeepElement from 'components/PakeepList/components/PakeepElement';
import { useValidationOfPakeepsInColumn } from 'hooks/useValidationOfPakeepsInColumn.hook';
import {
  ColumnOfPakeepListContainerPropsType,
  HandleSetPakeepElementHeigthArrType,
  PakeepElementHeigthArrType
} from './type';
import RowOfColumnOfPakeepListContainer from './components/Row';
import { getPakeepDimensions } from 'store/modules/App/selectors';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(({ spacing, breakpoints: { down } }) => ({
  column: () => ({
    // width:'calc(100% - 8px)',
    '& > div > div': {
      scrollbarColor: 'red',
      '&::-webkit-scrollbar': {
        width: 0
      }
    }
  })
}));

const ColumnOfPakeepListContainer: FC<ColumnOfPakeepListContainerPropsType & { handleSetArrOfRefs: any }> = ({
  column,
  pakeepsInColumn: notValidatedPakeepsInColumn,
  // pakeepsInColumn,
  pakeepItemDisensions,
  isLastColumn,
  isFirstColumn,
  isPakeepDragContextPinned,
  isSelecting,
  onClickOfPakeepElement,
  pakeepListMeasure,
  columnOrderIdx,
  handleSetArrOfRefs
}) => {
  const pakeepsInColumn = useValidationOfPakeepsInColumn({
    notValidatedPakeepsInColumn,
    isPakeepDragContextPinned
  });
  if (!pakeepsInColumn) return null;

  const classes = useStyles();

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

  const DEFAULT_PAKEEP_HEIGHT_VALUE = 200;

  const toggleResetItemSize = (idx: number) => {
    if (!!ref?.current) ref.current.resetAfterIndex(idx);
  };

  const getItemSize = (index: number) => {
    const id = pakeepsInColumn[index]?.id;
    const size = pakeepElementHeigthArr[id!];

    return (size || DEFAULT_PAKEEP_HEIGHT_VALUE) + pakeepItemDisensions.gapY;
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

    if (!el) return <>null</>;

    const handleResetItemSize = () => toggleResetItemSize(idx);

    const draggableContainerProps = {
      ...provided.dragHandleProps,
      ...provided.draggableProps,
      innerRef: provided.innerRef,
      ref: provided.innerRef
    };

    const allPakeepElementProps = {
      ...el,
      ...defaultPakeepElementProps,
      pakeepElementHeigth: pakeepElementHeigthArr[rubric.draggableId],
      handleResetItemSize,
      idx,
      isPinIconShouldBeShownInPakeep: true,
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
      pakeepElementGapX: pakeepItemDisensions.gapX,
      pakeepsInColumn,
      toggleResetItemSize,
      defaultPakeepElementProps,
      isPakeepDragContextPinned,
      pakeepElementHeigthArr
    },
    itemCount,
    itemSize: getItemSize
  };

  return (
    <Grid className={clsx(classes.column)}>
      <Droppable {...droppableProps}>
        {provided => {
          return (
            <Grid innerRef={provided.innerRef} {...provided.droppableProps}>
              {
                <List {...listProps} outerRef={provided.innerRef}>
                  {RowOfColumnOfPakeepListContainer}
                </List>
              }
            </Grid>
          );
        }}
      </Droppable>
    </Grid>
  );
};

export default memo(ColumnOfPakeepListContainer);
