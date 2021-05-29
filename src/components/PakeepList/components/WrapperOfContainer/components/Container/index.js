import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { find } from 'lodash';
import ColumnOfPakeepListContainer from './components/Column/index';

const useStyles = makeStyles(({ spacing, breakpoints: { between, down } }) => ({
  container: {
    margin: spacing(4, 0, 0, 0),
    [between('xs', 'sm')]: { margin: spacing(2, 0, 0, 0) },
    [down('md')]: { margin: spacing(4, 0, 0, 0) }
  }
}));

const PakeepListContainer = ({
  pakeeps,
  responsiveColumnOrder,
  columns,
  onDragEnd,
  placeholderName,
  folderProperty,
  onDragStart,
  folderId
}) => {
  const classes = useStyles();

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Grid container className={classes.container}>
        {responsiveColumnOrder?.map((columnId, idx) => {
          const column = columns[columnId];
          if (!column?.pakeepsId) return;

          const filteredArrToMap = column.pakeepsId.filter(id => id !== placeholderName);

          const pakeepsInColumn = filteredArrToMap.map(pakeepId => {
            const currentEl = find(pakeeps, ({ id }) => id === pakeepId);
            return currentEl;
          });
          const isLastColumn = !!(idx + 1 === responsiveColumnOrder.length);
          const isFirstColumn = !!(idx === 0);

          const columnProps = {
            folderProperty,
            key: column?.id,
            folderId,
            column,
            isFirstColumn,
            isLastColumn,
            pakeepsInColumn
          };

          return <ColumnOfPakeepListContainer {...columnProps} />;
        })}
      </Grid>
    </DragDropContext>
  );
};

PakeepListContainer.propTypes = {
  columns: PropTypes.any,
  folderId: PropTypes.string,
  folderProperty: PropTypes.any,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  pakeeps: PropTypes.any,
  placeholderName: PropTypes.string,
  responsiveColumnOrder: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  })
};

export default PakeepListContainer;
