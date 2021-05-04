import { Box, FormControl, Grid, makeStyles, OutlinedInput, Paper, Slider, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import clsx from 'clsx';
import _ from 'lodash';
import { useState } from 'react';
import compareFunc from 'compare-func';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { nanoid } from 'nanoid';

const useStyles = makeStyles(theme => ({
  previewer: {
    marginBottom: theme.spacing(4 - 0.4),

    background: ({ gradientColor }) => gradientColor,
    height: theme.spacing(6),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex
    }),
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
    marginLeft: theme.spacing(-2.2),
    marginTop: theme.spacing(1.4),
    width: theme.spacing(8 - 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#424242',
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ focusedColor }) => focusedColor,
      boxShadow: ({ focusedColor }) => `0 0 16px 2px ${focusedColor}6B`
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
  keyOfGradientFocusedElement,
  setKeyOfGradientFocusedElement
}) => {
  console.log(gradientColorState)
  const focusedColor = _.find(gradientColorState, ({ key }) => key === keyOfGradientFocusedElement)?.color;
  const classes = useStyles({ gradientColor, focusedColor });

  const [hoverNameOfDraggingElement, setHoverNameOfDraggingElement] = useState(false);

  const i = document.querySelector('#GradientPreviewer');
  const widthOfPreviewContainer = i?.clientWidth;
  const heightOfDraggableElement = 96 + 1.4;
  const widthOfDraggableElement = 10;
  extend([mixPlugin]);

  const unitOfDraggable = !widthOfPreviewContainer ? 8 : (widthOfPreviewContainer - widthOfDraggableElement) / 100;
  // console.log(gradientColorState)

  const onClickOfGradientPreviewer = ({ nativeEvent: { layerX } }) => {
    console.log(hoverNameOfDraggingElement);

    if (Boolean(hoverNameOfDraggingElement)) return;

    const clickedStopDeg = ~~((layerX / widthOfPreviewContainer) * 100);

    const neighborMore = _.find(gradientColorState, ({ stopDeg }) => stopDeg > clickedStopDeg);
    const neighborLess = _.findLast(gradientColorState, ({ stopDeg }) => stopDeg < clickedStopDeg);

    const mediumColorRatio = neighborLess?.stopDeg / neighborMore?.stopDeg;
    const mediumColor = colord(neighborMore?.color).mix(neighborLess?.color, mediumColorRatio).toHex();
    const nullityMediumColor = '#00000000';

    const clickedColor = mediumColor !== nullityMediumColor ? mediumColor : neighborLess.color || neighborMore.color;
    const newArrElement = { key: nanoid(), color: clickedColor, stopDeg: clickedStopDeg };

    setGradientColorState(state => [...state, newArrElement].sort(compareFunc('stopDeg')));
    // console.log(colorRatio);
  };
  // console.log(gradientColorState);
  return (
    <Paper className={classes.previewer} id="GradientPreviewer" elevation={0} onClick={onClickOfGradientPreviewer}>
      {gradientColorState.map(({ color, stopDeg, key }, idx) => {
        const positionX = unitOfDraggable * stopDeg;

        const unitOfYValue = -1;
        const positionY = idx === 0 ? unitOfYValue : unitOfYValue - heightOfDraggableElement * idx;

        const onStop = (placeholder, { lastX }) => {
          placeholder.preventDefault();

          const newStopDegValue = ~~(lastX / unitOfDraggable);
          const filteredArr = _.filter(gradientColorState, ({ key: gradientColorKey }) => gradientColorKey !== key);
          filteredArr.push({ color, stopDeg: newStopDegValue, key });
          const sortedArr = filteredArr.sort(compareFunc('stopDeg'));
          setGradientColorState(sortedArr);
        };
        const onStart = (placeholder, { lastX }) => {
          if (!hoverNameOfDraggingElement) return;

          // placeholder.preventDefault()
          // const newStopDegValue = ~~(lastX / unitOfDraggable);
          // const filteredArr = _.filter(gradientColorState, ({ key: gradientColorKey }) => gradientColorKey !== key);
          // filteredArr.push({ color, stopDeg: newStopDegValue, key });
          // const sortedArr = filteredArr.sort(compareFunc('stopDeg'));
          // setGradientColorState(sortedArr);
        };
        const onDrag = (placeholder, { lastX }) => {
          placeholder.preventDefault();

          // const newStopDegValue = ~~(lastX / unitOfDraggable);
          // const filteredArr = _.filter(gradientColorState, ({ key: gradientColorKey }) => gradientColorKey !== key)
          // filteredArr.push({ color, stopDeg: newStopDegValue, key });
          // const sortedArr =  filteredArr.sort(compareFunc('stopDeg'))
          // setGradientColorState(sortedArr);
        };
        const deleteGradientItem = () => {
          const filteredArr = _.filter(gradientColorState, ({ key: currentKey }) => currentKey !== key);
          console.log(filteredArr)
          setGradientColorState(filteredArr);
        };

        const onFocus = () => setKeyOfGradientFocusedElement(key);
        const draggableProps = {
          onStart,
          onDrag,
          onStop,
          axis: 'x',
          handle: '.handle',
          position: { x: positionX, y: positionY }
        };

        return (
          <Draggable {...draggableProps}>
            <Grid className={'handle'} item>
              <Grid
                className={classes.draggableElement}
                item
                style={{ background: color }}
                onDoubleClick={deleteGradientItem}
                onMouseEnter={() => setHoverNameOfDraggingElement(key)}
                onMouseLeave={() => setHoverNameOfDraggingElement(false)}
              />

              <FormControl
                onMouseEnter={() => setHoverNameOfDraggingElement(key)}
                onMouseLeave={() => setHoverNameOfDraggingElement(false)}
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
