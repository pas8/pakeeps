import { Grid, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { DragDropContext, OnBeforeDragStartResponder, OnDragEndResponder } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';
import { toChangeOneColorColumn, toChangeTwoColorColumn } from 'store/modules/Color/actions';
import { getIdColumnArr } from 'store/modules/Color/selectors';
import { OnDragEndType } from 'components/PakeepList/components/WrapperOfContainer/types';
import { PreparedColorExamplesPropsType } from './types';
import ColumnOfPreparedColorExamples from './components/Column';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(0.4, 0, 0.4, 0.2)
  }
}));

const PreparedColorExamples: FC<PreparedColorExamplesPropsType> = ({
  color,
  isExtended,
  customColor,
  handleSetColor,
  isColor = true,
  customColumnElementProps,
  CustomColumnElement,
  columnArr
}) => {
  const idColumnArr = useSelector(getIdColumnArr);
  const dispatch = useDispatch();

  const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

  const classes = useStyles();
  const onDragEnd: OnDragEndType = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    const columnStart = idColumnArr[source.droppableId];
    const columnFinish = idColumnArr[destination.droppableId];

    const columnFromStart = _.cloneDeep(columnStart);
    const columnFromFinish = _.cloneDeep(columnFinish);

    if (columnStart.length <= 1) return;
    if (columnStart === columnFinish) {
      const newArr = _.filter(columnFromStart, (placeholder, idx) => source.index !== idx);
      const itemWhichShouldBeAdded = columnFromStart[source.index];

      newArr.splice(destination.index, 0, itemWhichShouldBeAdded);

      return dispatch(toChangeOneColorColumn({ columnId: source.droppableId, newArr }));
    }

    const newStartArr = _.filter(columnFromStart, (placeholder, idx) => source.index !== idx);
    const itemWhichShouldBeAdded = columnStart[source.index];
    const newFinishArr = columnFromFinish;
    newFinishArr.splice(destination.index, 0, itemWhichShouldBeAdded);

    return dispatch(
      toChangeTwoColorColumn({
        finishColumn: { id: destination.droppableId, newArr: newFinishArr },
        startColumn: { id: source.droppableId, newArr: newStartArr }
      })
    );
  };
  const onBeforeDragStart: OnBeforeDragStartResponder = ({ source }) => {
    if (idColumnArr[source.droppableId].length <= 1) return;
  };

  const colorColumnElementProps = { handleSetColor, isExtended, color };
  const columnElementProps = isColor ? colorColumnElementProps : customColumnElementProps;

  const dragDropContextProps = { onDragEnd, onBeforeDragStart };
  return (
    <DragDropContext {...dragDropContextProps}>
      <Grid container className={classes.container}>
        {columnOrder?.map((columnId, idx) => {
          // const columnElements = idColumnArr[columnId];
          const mapFunc = (columnItenId: string) => _.filter(columnArr, ({ id }) => columnItenId === id);
          const columnElements = _.flatten(_.map(idColumnArr[columnId], mapFunc));

          if (!columnElements) return;

          const columnProps = {
            CustomColumnElement: isColor ? Grid : CustomColumnElement,
            columnElementProps,
            isColor,
            key: nanoid(),
            droppableId: columnId,
            columnElements,
            customColor
          };

          return <ColumnOfPreparedColorExamples {...columnProps} />;
        })}
      </Grid>
    </DragDropContext>
  );
};

export default PreparedColorExamples;
