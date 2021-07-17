import { FC, memo } from 'react';
import { areEqual } from 'react-window';
import { RowOfColumnOfPakeepListContainerType } from './types';
import DraggableContainerOfPakeepElement from '../DraggableContainer/index';

const RowOfColumnOfPakeepListContainer: FC<RowOfColumnOfPakeepListContainerType> = ({
  data: { pakeepsInColumn, defaultPakeepElementProps, toggleResetItemSize, pakeepElementHeigthArr, pakeepElementGapX },
  index: idx,
  style
}) => {
  const el = pakeepsInColumn[idx];

  if (!el) return <></>;

  const draggableProps = { key: el.id, index: idx, draggableId: el.id };
  const pakeepElementHeigth = pakeepElementHeigthArr[el?.id!];

  const handleResetItemSize = () => {
    toggleResetItemSize(idx);
  };

  const pakeepElementProps = {
    ...el,
    idx,
    handleResetItemSize,
    pakeepElementHeigth,
    ...defaultPakeepElementProps
  };

  const draggableContainerOfPakeepElementProps = {
    draggableProps,
    pakeepElementGapX,
    isDraggingOver: false,
    style,
    pakeepElementProps
  };

  //@ts-ignore
  return <DraggableContainerOfPakeepElement {...draggableContainerOfPakeepElementProps} />;
};

export default memo(RowOfColumnOfPakeepListContainer, areEqual);
