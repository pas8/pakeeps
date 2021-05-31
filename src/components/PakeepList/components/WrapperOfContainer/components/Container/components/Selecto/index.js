import { Grid, makeStyles } from '@material-ui/core';
import { colord } from 'colord';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Selecto from 'react-selecto';

const useStyles = makeStyles(theme => ({
  container: {
    '& .rCSjtiumr': {
      borderColor: themeColors.secondaryMain,
      background: colord(themeColors.secondaryMain).alpha(0.42).toHex()
    }
  }
}));

const SelectofFPakeepListContainer = ({ scrollerRef, setSelectedIds, setIsSelecting,SELECTED }) => {
  const classes = useStyles();
  const [scrollOptions, setScrollOptions] = useState({});

  useEffect(() => {
    setScrollOptions({
      container: scrollerRef.current,
      throttleTime: 0,
      threshold: 100
    });
  }, []);

  const onDragStart = e => {
    setIsSelecting(true);
    if (e.inputEvent.target.nodeName === 'BUTTON') {
      return false;
    }
    return true;
  };

  const onDragEnd = () => setIsSelecting(false);
  const onSelect = e => {
    e.added.forEach(el => el.classList.add(SELECTED));
    e.removed.forEach(el => el.classList.remove(SELECTED));
  };
  const onSelectEnd = ({ selected }) => {
    const selectedIdArr = selected.map(({ id }) => id);
    setSelectedIds(selectedIdArr);
  };

  const onScroll = e => {
    scrollerRef.current.scrollBy(e.direction[0] * 10, e.direction[1] * 10);
  };

  const selectoProps = {
    dragContainer: '.selectoContainer',
    selectableTargets: ['.selectoItem'],
    hitRate: 0,
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
      <Selecto {...selectoProps} />
    </Grid>
  );
};

SelectofFPakeepListContainer.propTypes = {
  scrollerRef: PropTypes.shape({
    current: PropTypes.shape({
      scrollBy: PropTypes.func
    })
  }),
  setIsSelecting: PropTypes.func,
  setSelectedIds: PropTypes.func
};

export default SelectofFPakeepListContainer;
