import { Grid } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import PakeepElement from 'components/PakeepList/components/PakeepElement/index';
import { memo } from 'react';

function getStyle({ draggableStyle, virtualStyle, isDragging }) {
  const combined = {
    ...virtualStyle,
    ...draggableStyle
  };

  const grid = 8;

  const result = {
    ...combined,
    marginBottom: grid
  };

  return result;
}

const DraggableContainerOfPakeepElement = ({
  draggableProps,
  draggableContainerClassName,
  pakeepElementProps,
  style
}) => (
  // const DraggableContainerOfPakeepElement = ({ draggableProps, draggableContainerClassName, children }) => (
  <Draggable {...draggableProps}>
    {(provided, { isDragging }) => {
      const draggableContainerProps = {
        ...provided.dragHandleProps,
        ...provided.draggableProps,
        innerRef: provided.innerRef,
        className: draggableContainerClassName
      };

      const allPakeepElementProps = { ...pakeepElementProps, isDragging };

      return (
        <Grid
          {...draggableContainerProps}
          style={getStyle({
            draggableStyle: provided.draggableProps.style,
            virtualStyle: style,
            isDragging
          })}
        >
          <PakeepElement {...allPakeepElementProps} />
        </Grid>
      );
      // return <Grid {...draggableContainerProps}>{/* <PakeepElement {...allPakeepElementProps} /> */}{children}</Grid>;
    }}
  </Draggable>
);

DraggableContainerOfPakeepElement.propTypes = {
  draggableContainerClassName: PropTypes.any,
  draggableProps: PropTypes.object,
  pakeepElementProps: PropTypes.object
};

export default memo(DraggableContainerOfPakeepElement);
