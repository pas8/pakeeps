import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { find } from 'lodash';
import ColumnOfPakeepListContainer from './components/Column/index';
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { PakeepListContainerPropsType } from './types';
import { PakeepElementType, PakeepsType } from 'store/modules/App/types';
import { useMeasure, useWindowScroll, useWindowSize } from 'react-use';

const useStyles = makeStyles(({ spacing, breakpoints: { between, down }, palette }) => ({
  containerClass: () => ({
    // position: !isPakeepDragging ? 'fixed' : 'static',
    position: 'fixed',
    right: 0,
    margin: spacing(4, 0, 0, 0),
    [between('xs', 'sm')]: { margin: spacing(2, 0, 0, 0) },
    [down('md')]: { margin: spacing(4, 0, 0, 0) },
    '& .selected > div ': {
      boxShadow: `0px 0px 0px 1px ${palette?.maxEmphasis?.main}`,
      borderColor: palette?.maxEmphasis?.main
    }
  })
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

  const { height: windowHeigth } = useWindowSize();
  const columnQuantity = responsiveColumnOrder.length;

  const [arrOfRefs, setArrOfRefs] = useState<any[]>([]);

  // const [heightOf, setArrOfRefs] = useState<number[]>([]);

  const { y: value } = useWindowScroll();
  useEffect(() => {
    arrOfRefs.forEach(el => !!el?.current?.scrollTo && el.current.scrollTo(value));
  }, [value]);

  const handleSetArrOfRefs = (newRef: any) => setArrOfRefs(state => [...state, newRef]);

  const pakeepListMeasure = {
    height: windowHeigth * 0.96,
    width: '100%'
  };

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

    const isLastColumn = !!(idx + 1 === columnQuantity);
    const isFirstColumn = !!(idx === 0);

    const allColumnOfPakeepListContainerProps = {
      ...columnOfPakeepListContainerProps,
      key: column?.id,
      column,
      columnQuantity,
      columnOrderIdx: idx,
      isFirstColumn,
      isLastColumn,
      handleSetArrOfRefs,
      pakeepsInColumn,
      pakeepListMeasure
    };
    return <ColumnOfPakeepListContainer {...allColumnOfPakeepListContainerProps} />;
  });

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Grid container className={classes.containerClass}>
        {arr}
      </Grid>
    </DragDropContext>
  );
};

export default memo(PakeepListContainer);
