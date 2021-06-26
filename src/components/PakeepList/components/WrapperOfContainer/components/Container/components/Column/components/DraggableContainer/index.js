import { Grid } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import PakeepElement from 'components/PakeepList/components/PakeepElement/index';
import { memo } from 'react';

function getStyle({ draggableStyle, virtualStyle, isDragging }) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...virtualStyle,
    ...draggableStyle
  };

  // Being lazy: this is defined in our css file
  const grid = 8;

  // when dragging we want to use the draggable style for placement, otherwise use the virtual style
  const result = {
    ...combined,
    // height: isDragging ? combined.height : combined.height - grid,
    // left: isDragging ? combined.left : combined.left + grid,
    // width: isDragging ? draggableStyle.width : `calc(${combined.width} - ${grid * 2}px)`,
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
