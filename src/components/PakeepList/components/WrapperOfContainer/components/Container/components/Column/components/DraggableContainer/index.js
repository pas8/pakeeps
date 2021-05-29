import { Grid } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import PakeepElement from 'components/PakeepList/components/PakeepElement';

const DraggableContainerOfPakeepElement = ({ draggableProps, el, idx }) => (
  <Draggable {...draggableProps}>
    {(provided, { isDragging }) => {
      const draggableContainerProps = {
        ...provided.dragHandleProps,
        ...provided.draggableProps,
        innerRef: provided.innerRef,
        className: classes.columnElement
      };

      const pakeepElementProps = { ...el, isDragging, idx };

      return (
        <Grid {...draggableContainerProps}>
          <PakeepElement {...pakeepElementProps} />
        </Grid>
      );
    }}
  </Draggable>
);

DraggableContainerOfPakeepElement.propTypes = {
  draggableProps: PropTypes.object,
  el: PropTypes.object,
  idx: PropTypes.number
};

export default DraggableContainerOfPakeepElement;
