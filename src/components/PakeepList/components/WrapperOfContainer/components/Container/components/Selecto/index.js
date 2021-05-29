import { Grid, makeStyles } from '@material-ui/core';
import { drop, flatten } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Selecto from 'react-selecto';

const useStyles = makeStyles(theme => ({}));

const SelectofFPakeepListContainer = ({ scrollerRef, setSelectedIds, setIsSelecting }) => {
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
    const selectedIdArr = flatten(e.selected.map(el => drop(el.getAttributeNames())));
    setSelectedIds(selectedIdArr);
    e.added.forEach(el => el.classList.add('selected'));
    e.removed.forEach(el => el.classList.remove('selected'));
  };

  const onScroll = e => {
    scrollerRef.current.scrollBy(e.direction[0] * 10, e.direction[1] * 10);
  };

  const selectoProps = {
    dragContainer: '.selectoContainer',
    selectableTargets: ['.selectoItem'],
    hitRate: 0,
    selectByClick: true,
    selectFromInside: true,
    toggleContinueSelect: ['shift'],
    ratio: 0,
    scrollOptions,
    onDragStart,
    onDragEnd,
    onSelect,
    onScroll
  };

  return <Selecto {...selectoProps} />;
};

SelectofFPakeepListContainer.propTypes = {
  scrollerRef: PropTypes.shape({
    current: PropTypes.shape({
      scrollBy: PropTypes.func
    })
  }),
  setIsSelecting: PropTypes.func,
  setSelectedIds: PropTypes.func
}

export default SelectofFPakeepListContainer;
