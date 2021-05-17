import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../Column/index';
import { find } from 'lodash';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(8, 0, 0, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(4, 0, 0, 0)
    }
  }
}));

const PakeepListContainer = ({ pakeeps, responsiveColumnOrder, columns, onDragEnd,placeholderName }) => {
  const classes = useStyles();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container className={classes.container}>
        {responsiveColumnOrder?.map((columnId, idx) => {
          const column = columns[columnId];
          if (!column?.pakeepsId) return;

          const filterArrToMap = column.pakeepsId.filter(id => id !== placeholderName);
          const pakeepsInColumn = filterArrToMap.map(pakeepId => {
            return find(pakeeps, ({ id }) => id === pakeepId);
          });
          return (
            <Column
              key={column?.id}
              column={column}
              pakeepsInColumn={pakeepsInColumn}
              lastColumn={idx + 1 === responsiveColumnOrder.length ? true : false}
              firstColumn={idx === 0 ? true : false}
            />
          );
        })}
      </Grid>
    </DragDropContext>
  );
};

PakeepListContainer.propTypes = {
  columns: PropTypes.any,
  onDragEnd: PropTypes.any,
  pakeeps: PropTypes.any,
  placeholderName: PropTypes.string,
  responsiveColumnOrder: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  })
}

export default PakeepListContainer;
