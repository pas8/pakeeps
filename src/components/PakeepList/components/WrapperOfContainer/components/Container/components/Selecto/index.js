import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Selecto from 'react-selecto';

const useStyles = makeStyles(theme => ({}));

const SelectofFPakeepListContainer = ({scrollerRef}) => {
  const classes = useStyles();
  const [scrollOptions, setScrollOptions] = useState({});

  useEffect(() => {
    setScrollOptions({
      container: scrollerRef.current,
      throttleTime: 0,
      threshold: 0
    });
  }, []);


  const onDragStart = e => {
    if (e.inputEvent.target.nodeName === 'BUTTON') {
      return false;
    }
    return true;
  };

  const onSelect = e => {
    e.added.forEach(el => {
      el.classList.add('selected');
    });
    e.removed.forEach(el => {
      el.classList.remove('selected');
    });
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
    onSelect,
    onScroll
  };

  return <Selecto {...selectoProps} />;
};

SelectofFPakeepListContainer.propTypes = {};

export default SelectofFPakeepListContainer;
