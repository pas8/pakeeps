import { Box, FormControl, Grid, makeStyles, OutlinedInput, Paper, Slider, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import clsx from 'clsx';
import _ from 'lodash';
import { useState } from 'react';
import compareFunc from 'compare-func';
const useStyles = makeStyles(theme => ({
  previewer: {
    marginBottom: theme.spacing(8 * 0.8),
    position: 'relative',
    background: ({ gradientColor }) => gradientColor,
    height: theme.spacing(6),
    // boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)',
    cursor: 'copy'
  },
  draggableElement: {
    borderRadius: theme.spacing(0.8),
    width: theme.spacing(1.4),
    // paddingTop:theme.spacing(2),
    height: theme.spacing(6),
    cursor: 'pointer',
    // border: '3px solid rgba(255, 255, 255,0.8)',
    // '&:hover': {
    //   borderColor: 'rgba(255, 255, 255,0.96)'
    // }
    boxShadow: '0 0 0 2px #fff,0 0 0 4px #000'
  },
  OutlinedInputOfStopDegNumber: {
    // margin: theme.spacing(0.08, 2, 0, 2),
    marginLeft: theme.spacing(-2),
    marginTop: theme.spacing(1),
    width: theme.spacing(8 - 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ focusedColor }) => focusedColor
    },
    '& input': {
      height: theme.spacing(0),
      padding: theme.spacing(2.4, 0),
      textAlign: 'center'
    }
  },
  leftFloating: {
    marginLeft: theme.spacing(0)
  },
  rightFloating: {
    marginLeft: theme.spacing(-4)
  }
}));

const GradientPreviewer = ({
  gradientColor,
  gradientColorState,
  setGradientColorState,
  gradientFocusedElementState,
  setGradientFocusedElementState
}) => {
  const classes = useStyles({ gradientColor, focusedColor: gradientFocusedElementState?.color });

  const i = document.querySelector('#GradientPreviewer');
  const widthOfPreviewContainer = i?.clientWidth;
  const heightOfDraggableElement = 94;
  const widthOfDraggableElement = 10;

  const unitOfDraggable = !widthOfPreviewContainer ? 8 : (widthOfPreviewContainer - widthOfDraggableElement) / 100;
  // console.log(gradientColorState)
  return (
    <Paper className={classes.previewer} id="GradientPreviewer" elevation={0}>
      {gradientColorState.map(({ color, stopDeg, key }, idx) => {
        const positionX = unitOfDraggable * stopDeg;

        const unitOfYValue = -1;
        const positionY = idx === 0 ? unitOfYValue : unitOfYValue - heightOfDraggableElement * idx;

        const onStop = (placeholder, { lastX }) => {
          const newStopDegValue = ~~(lastX / unitOfDraggable);
          const filteredArr = _.filter(gradientColorState, ({ key: gradientColorKey }) => gradientColorKey !== key);
          filteredArr.push({ color, stopDeg: newStopDegValue, key });
          const sortedArr = filteredArr.sort(compareFunc('stopDeg'));
          setGradientColorState(sortedArr);
        };
        // const onStart = (placeholder, { lastX }) => {
        //   const newStopDegValue = ~~(lastX / unitOfDraggable);
        //   const filteredArr = _.filter(gradientColorState, ({ key: gradientColorKey }) => gradientColorKey !== key);
        //   filteredArr.push({ color, stopDeg: newStopDegValue, key });
        //   const sortedArr = filteredArr.sort(compareFunc('stopDeg'));
        //   setGradientColorState(sortedArr);
        // };
        const onDrag = (placeholder, { lastX }) => {
          // const newStopDegValue = ~~(lastX / unitOfDraggable);

          // const filteredArr = _.filter(gradientColorState, ({ key: gradientColorKey }) => gradientColorKey !== key)
          // filteredArr.push({ color, stopDeg: newStopDegValue, key });
          // const sortedArr =  filteredArr.sort(compareFunc('stopDeg'))
          // setGradientColorState(sortedArr);

        };

        console.log(gradientColorState);

        const onFocus = () => setGradientFocusedElementState({ color, stopDeg, key });

        const draggableProps = {
          // onStart,
          onDrag,
          onStop,
          axis: 'x',
          handle: '.handle',
          position: { x: positionX, y: positionY }
        };

        return (
          <Draggable {...draggableProps}>
            <Grid className={'handle'} item>
              <Grid className={classes.draggableElement} item></Grid>

              <FormControl
                variant={'outlined'}
                className={clsx(
                  classes.OutlinedInputOfStopDegNumber,
                  stopDeg === 0 && classes.leftFloating,
                  stopDeg === 100 && classes.rightFloating
                )}
                onFocus={onFocus}
              >
                <OutlinedInput value={stopDeg} name={key} />
              </FormControl>
            </Grid>
          </Draggable>
        );
      })}
    </Paper>
  );
};

GradientPreviewer.propTypes = {};

export default GradientPreviewer;
