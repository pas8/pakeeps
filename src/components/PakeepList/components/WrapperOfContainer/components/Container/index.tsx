import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { find } from 'lodash';
import ColumnOfPakeepListContainer from './components/Column/index';
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { PakeepListContainerPropsType } from './types';
import { PakeepElementType, PakeepsType } from 'store/modules/App/types';
import { useMeasure, useWindowScroll, useWindowSize } from 'react-use';
import { getDrawerWidth, getPakeepDimensions } from 'store/modules/App/selectors';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(({ spacing, breakpoints: { between, down }, palette }) => ({
  containerClass: () => ({
    position: 'fixed',
    padding: spacing(4, 0, 0, 0),
    [down('md')]: { padding: spacing(4, 0, 0, 0) },
    '& .selected > div ': {
      boxShadow: `0px 0px 0px 1px ${palette?.maxEmphasis?.main}`,
      borderColor: palette?.maxEmphasis?.main
    },
    [between('xs', 'sm')]: { padding:0  },

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
  const pakeepDisensions = useSelector(getPakeepDimensions);
  const drawerWidth = useSelector(getDrawerWidth);
  // const ref = useRef()
  // console.log(ref.current)
  const classes = useStyles();

  const { height: windowHeigth, width } = useWindowSize();
  const columnQuantity = responsiveColumnOrder.length;

  const [arrOfRefs, setArrOfRefs] = useState<any[]>([]);

  const { y: value } = useWindowScroll();
  useEffect(() => {
    arrOfRefs.forEach(el => !!el?.current?.scrollTo && el.current.scrollTo(value));
  }, [value]);

  const handleSetArrOfRefs = (newRef: any) => setArrOfRefs(state => [...state, newRef]);

  const dimensions = {
    left: pakeepDisensions.container.paddingLeft + drawerWidth,
    right: pakeepDisensions.container.paddingRight
  };
  const CONTAINER_WIDTH = width - dimensions.left - dimensions.right;

  const pakeepListMeasure = {
    height: windowHeigth * 0.96,
    width: CONTAINER_WIDTH / columnQuantity
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
      pakeepItemDisensions: pakeepDisensions.pakeepItem,
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
      <Grid container className={classes.containerClass} style={{ ...dimensions }}>
        {arr}
      </Grid>
    </DragDropContext>
  );
};

export default memo(PakeepListContainer);
