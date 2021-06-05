import { Grid } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import PakeepElement from 'components/PakeepList/components/PakeepElement';

const DraggableContainerOfPakeepElement = ({
  draggableProps,
  draggableContainerClassName,
  pakeepElementProps
}) => (
  <Draggable {...draggableProps}>
    {(provided, { isDragging }) => {
      const draggableContainerProps = {
        ...provided.dragHandleProps,
        ...provided.draggableProps,
        innerRef: provided.innerRef,
        className: draggableContainerClassName
      };

      const allPakeepElementProps = {...pakeepElementProps, isDragging,  };

      return (
        <Grid {...draggableContainerProps}>
          <PakeepElement {...allPakeepElementProps} />
        </Grid>
      );
    }}
  </Draggable>
);

DraggableContainerOfPakeepElement.propTypes = {
  draggableContainerClassName: PropTypes.any,
  draggableProps: PropTypes.object,
  pakeepElementProps: PropTypes.object
}

export default DraggableContainerOfPakeepElement;
