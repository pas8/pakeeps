import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { find } from 'lodash';
import ColumnOfPakeepListContainer from './components/Column/index';
import { FC, memo, useMemo, useState } from 'react';
import { PakeepListContainerPropsType } from './types';
import { PakeepElementType, PakeepsType } from 'store/modules/App/types';
import { useMeasure } from 'react-use';

const useStyles = makeStyles(({ spacing, breakpoints: { between, down }, palette }) => ({
  containerClass: {
    position: 'fixed',
    margin: spacing(4, 0, 0, 0),
    [between('xs', 'sm')]: { margin: spacing(2, 0, 0, 0) },
    [down('md')]: { margin: spacing(4, 0, 0, 0) },
    '& .selected > div ': {
      boxShadow: `0px 0px 0px 1px ${palette?.maxEmphasis?.main}`,
      borderColor: palette?.maxEmphasis?.main
    }
  }
}));

const PakeepListContainer: FC<PakeepListContainerPropsType> = ({
  pakeeps,
  responsiveColumnOrder,
  columns,
  onDragEnd,
  placeholderName,
  onDragStart,
  columnOfPakeepListContainerProps
}) => {
  const classes = useStyles();

  const [ref, { x, y, width:containerWidth, height }] = useMeasure<HTMLDivElement>();

  // const [arr, setArr] = useState<any>(null);

  // useMemo(() => {
  const arr = responsiveColumnOrder?.map((columnId, idx) => {
    const column = columns[columnId];
    if (!column?.pakeepsId) return;

    const filteredArrToMap = column.pakeepsId.filter(id => id !== placeholderName);

    const pakeepsInColumn = filteredArrToMap.map(pakeepId => {
      const findedPakeep = find(pakeeps, ({ id }) => id === pakeepId);
      if (!findedPakeep) return null;
      const currentEl: PakeepElementType = findedPakeep;
      return currentEl;
    });
    // if(pakeepsInColumn)
    const isLastColumn = !!(idx + 1 === responsiveColumnOrder.length);
    const isFirstColumn = !!(idx === 0);

    const allColumnOfPakeepListContainerProps = {
      ...columnOfPakeepListContainerProps,
      key: column?.id,
      column,
      columnOrderIdx:idx,
      isFirstColumn,
      isLastColumn,
      pakeepsInColumn,
      containerWidth
    };
    return <ColumnOfPakeepListContainer {...allColumnOfPakeepListContainerProps} />;
  });

  // setArr(arr);
  // }, [pakeeps, responsiveColumnOrder, columns]);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Grid container className={classes.containerClass} ref={ref}>
        {arr}
      </Grid>
    </DragDropContext>
  );
};

export default memo(PakeepListContainer);
