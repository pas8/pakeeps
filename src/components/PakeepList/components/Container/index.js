import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { find } from 'lodash';
import Column from '../Column/index';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4, 0, 0, 0),
    [theme.breakpoints.between('xs', 'sm')]: {
      margin: theme.spacing(2, 0, 0, 0)
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(4, 0, 0, 0)
    }
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
          // console.log(column?.pakeepsId)
          const filteredArrToMap = column.pakeepsId.filter(id => id !== placeholderName);

          const pakeepsInColumn = filteredArrToMap.map(pakeepId => {
            const currentEl = find(pakeeps, ({ id }) => id === pakeepId);
            return currentEl;
          });

          return (
            <Column
              folderProperty={folderProperty}
              key={column?.id}
              folderId={folderId}
              column={column}
              pakeepsInColumn={pakeepsInColumn}
              lastColumn={!!(idx + 1 === responsiveColumnOrder.length) }
              firstColumn={!!(idx === 0)}
            />
          );
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
