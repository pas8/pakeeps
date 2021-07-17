import { Paper } from '@material-ui/core';
import { FC } from 'react';
import Draggable from 'react-draggable';

const DraggablePaperComponent: FC = props => {
  return (
    <Draggable handle={'#draggable-dialog-title'} cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

export default DraggablePaperComponent;
