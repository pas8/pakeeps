import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import PakeepElement from './components/PakeepElement';
import shortid from 'shortid';
import { useMeasure } from 'react-use';
import { useState } from 'react';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
  container: { marginTop: theme.spacing(8) },
  s: {
    border: '1px solid #fff8',
    cursor: 'move'
  }
}));

const PakeepList = ({ pakeeps, labels, columns, columnOrder }) => {
  const theme = useTheme();
  const classes = useStyles();

  const onDragEnd = () => {};


  return (
    
    <DragDropContext onDragEnd={onDragEnd}>
    
    <Grid container display={'flex'} spacing={2} className={classes.container}>
        {columnOrder.map(columnId => {
          const column = columns[columnId];
          const pakeepsInColumn = column.pakeepIds.map((pakeepId) =>  pakeeps[pakeepId])
          console.log(pakeepsInColumn);
          return <Column key={column.id} column={column} pakeepsInColumn={pakeepsInColumn} />;
        })}
      </Grid>
      </DragDropContext>
    
  );
};

const mapStateToProps = ({ app: { pakeeps, labels, columns, columnOrder } }) => ({
  pakeeps,
  labels,
  columns,
  columnOrder
});
// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(PakeepList);
