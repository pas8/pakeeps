import { Grid } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import PakeepElement from 'components/PakeepList/components/PakeepElement';

const DraggableContainerOfPakeepElement = ({
  draggableProps,
  el,
  idx,
  draggableContainerClassName,
  isPinIconShouldBeShownInPakeep
}) => (
  <Draggable {...draggableProps}>
    {(provided, { isDragging }) => {
      const draggableContainerProps = {
        ...provided.dragHandleProps,
        ...provided.draggableProps,
        innerRef: provided.innerRef,
        className: draggableContainerClassName
      };

      const pakeepElementProps = { ...el, isDragging, idx, isPinIconShouldBeShownInPakeep };

      return (
        <Grid {...draggableContainerProps}>
          <PakeepElement {...pakeepElementProps} />
        </Grid>
      );
    }}
  </Draggable>
);

DraggableContainerOfPakeepElement.propTypes = {
  draggableContainerClassName: PropTypes.any,
  draggableProps: PropTypes.object,
  el: PropTypes.object,
  idx: PropTypes.number,
  isPinIconShouldBeShownInPakeep: PropTypes.bool
}

export default DraggableContainerOfPakeepElement;
