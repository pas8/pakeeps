import { FC, memo } from 'react';
import { Grid } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import PakeepElement from 'components/PakeepList/components/PakeepElement/index';
import {
  DraggableContainerOfPakeepElementPropsType,
  GetStyleOfDraggableContainerOfPakeepElementType
} from '../Row/types';

const getStyle = ({
  draggableStyle,
  virtualStyle,
  isDragging,
  pakeepElementGapX
}: GetStyleOfDraggableContainerOfPakeepElementType) => {
  const combined = {
    ...virtualStyle,
    ...draggableStyle
  };
  // const WIDTH_GAP = pakeepElementGapX * 0.42;
  const width = `calc(100% - ${pakeepElementGapX - 2}px)`;

  // const HALF_GAP_X = (pakeepElementGapX - WIDTH_GAP) / 2;
  const result = {
    ...combined,
    left: 1,
    right: 1,
    width,
    height: isDragging ? combined.height : combined.height
  };

  return result;
};

const DraggableContainerOfPakeepElement: FC<DraggableContainerOfPakeepElementPropsType> = ({
  draggableProps,
  pakeepElementProps,
  style,
  isDraggingOver,
  pakeepElementGapX
}) => (
  <Draggable {...draggableProps}>
    {(provided, { isDragging }) => {
      const draggableContainerProps = {
        ...provided.dragHandleProps,
        ...provided.draggableProps,
        ref: provided.innerRef,
        innerRef: provided.innerRef
      };

      const allPakeepElementProps = { ...pakeepElementProps, isDragging };

      return (
        <Grid
          {...draggableContainerProps}
          style={getStyle({
            pakeepElementGapX,
            draggableStyle: provided?.draggableProps?.style,
            virtualStyle: style,
            isDragging
          })}
        >
          <PakeepElement {...allPakeepElementProps} />
        </Grid>
      );
    }}
  </Draggable>
);

export default memo(DraggableContainerOfPakeepElement);
