import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../Column/index';
import { find } from 'lodash';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(8, 0, 0, 0),
    [theme.breakpoints.between('xs', 'sm')]: {
      margin: theme.spacing(4, 0, 0, 0)
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(6, 0, 0, 0)
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
  const placeholder = {
    title: 'Placeholder',
    text: '',
    bookmark: false,
    favorite: false,
    color: 'default',
    isPinned: true,
    id: 'placeholder'
  };
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
};

export default PakeepListContainer;
