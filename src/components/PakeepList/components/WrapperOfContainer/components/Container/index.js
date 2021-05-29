import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { find } from 'lodash';
import ColumnOfPakeepListContainer from './components/Column/index';

const useStyles = makeStyles(({ spacing, breakpoints: { between, down } }) => ({
  container: {
    margin: spacing(4, 0, 0, 0),
    [between('xs', 'sm')]: { margin: spacing(2, 0, 0, 0) },
    [down('md')]: { margin: spacing(4, 0, 0, 0) },
    '& .selected > div ': {
      boxShadow: '0px 0px 1px 2px   white '
    }
  }
}));

const PakeepListContainer = ({
  pakeeps,
  responsiveColumnOrder,
  columns,
  onDragEnd,
  placeholderName,
  onDragStart,
  columnOfPakeepListContainerProps
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

          const allColumnOfPakeepListContainerProps = {
            ...columnOfPakeepListContainerProps,
            key: column?.id,
            column,
            isFirstColumn,
            isLastColumn,
            pakeepsInColumn
          };
          return <ColumnOfPakeepListContainer {...allColumnOfPakeepListContainerProps} />;
        })}
      </Grid>
    </DragDropContext>
  );
};

PakeepListContainer.propTypes = {
  columns: PropTypes.any,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  columnOfPakeepListContainerProps: PropTypes.object,
  pakeeps: PropTypes.array,
  placeholderName: PropTypes.string,
  responsiveColumnOrder: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  })
};

export default PakeepListContainer;
