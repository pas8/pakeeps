import { Grid, makeStyles } from '@material-ui/core';
import { colord } from 'colord';
import { useAlpha } from 'hooks/useAlpha.hook';
import PropTypes from 'prop-types';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import Selecto, { OnDragStart, OnScroll, OnSelect, OnSelectEnd } from 'react-selecto';
import { SelectofFPakeepListContainerPropsType } from './types';

const useStyles = makeStyles(({ palette: { secondary } }) => ({
  container: {
    '& .rCSjtiumr': {
      borderColor: secondary.main,
      background: useAlpha(secondary.main, 0.42)
    }
  }
}));

const SelectofFPakeepListContainer: FC<SelectofFPakeepListContainerPropsType> = ({
  scrollerRef,
  setSelectedIds,
  setIsSelecting,
  SELECTED
}) => {
  const classes = useStyles();
  const [scrollOptions, setScrollOptions] = useState({} as any);

  useEffect(() => {
    setScrollOptions({
      container: scrollerRef.current,
      throttleTime: 100,
      threshold: 100
    });
  }, []);

  const onDragStart = (e: OnDragStart) => {
    setIsSelecting(true);
    if (e.inputEvent.target.nodeName === 'BUTTON') {
      return false;
    }
    return true;
  };

  const onDragEnd = () => setIsSelecting(false);
  const onSelect = (e: OnSelect) => {
    e.added.forEach(el => el.classList.add(SELECTED));
    e.removed.forEach(el => el.classList.remove(SELECTED));
  };
  const onSelectEnd = ({ selected }: OnSelectEnd) => {
    const selectedIdArr = selected.map(({ id }) => id);
    setSelectedIds(selectedIdArr);
  };

  const onScroll = (e: any) => {
    scrollerRef.current.scrollBy(e.direction[0] * 10, e.direction[1] * 10);
  };

  const selectoProps = {
    dragContainer: '.selectoContainer',
    selectableTargets: ['.selectoItem'],
    hitRate: 0,
    //next
    // container: document?.body,
    selectByClick: false,
    selectFromInside: true,
    toggleContinueSelect: ['shift'],
    ratio: 0,
    scrollOptions,
    onDragStart,
    onDragEnd,
    onSelect,
    onSelectEnd,
    onScroll
  };

  return (
    <Grid className={classes.container}>
      <Selecto {...selectoProps} continueSelect />
    </Grid>
  );
};

export default SelectofFPakeepListContainer;
