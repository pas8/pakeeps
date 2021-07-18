import { Box, FormControl, Grid, InputLabel, makeStyles, OutlinedInput, Paper } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import compareFunc from 'compare-func';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import NumberAdornment from 'components/ColorChanger/components/CustomColor/components/NumberAdornment';
import { nanoid } from 'nanoid';
const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2.16, 2.4, 0.8, 1.2),

    '& > div': {
      // width: '20ch',
      ' & input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none'
      }
    }
  },
  colorPreviewer: {
    width: theme.spacing(8 * 0.8),
    height: theme.spacing(8 * 0.8),
    cursor: 'pointer',
    border: '2px solid rgba(255, 255, 255,0)'
  },
  textFieldInHexFormat: {
    margin: theme.spacing(0.08, 2, 0, 2),
    width: theme.spacing(8 + 4 + 2),
    '& .MuiFormLabel-root.Mui-focused ': { color: ({ colorInHexFormat }) => colorInHexFormat },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ colorInHexFormat }) => colorInHexFormat
    },
    '& input': {
      height: theme.spacing(1.8)
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ borderColorOfFocusedInput }) => borderColorOfFocusedInput
    }
  },
  numberFieldOfDegValue: {
    width: theme.spacing(10),
    marginTop: theme.spacing(0.1),
    '& div': {
      height: theme.spacing(8 * 0.8)
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ borderColorOfFocusedInput }) => borderColorOfFocusedInput
    }
  },
  closeButton: {
    width: theme.spacing(8 * 0.8),
    height: theme.spacing(8 * 0.8),
    marginLeft: theme.spacing(1.8)
  },
  numberAdornment: {
    paddingTop: theme.spacing(1.4),
    marginRight: theme.spacing(-0.4)
  },
  colorPreviewerFocused: {
    borderColor: ' rgba(255, 255, 255,1)'
  }
}));

const MainUtilsOfCustomGradient = ({
  setColor,
  setGradientColor,
  colorInHexFormat,
  color,
  nullityColor,
  gradientColorState,
  setGradientColorState,
  focusOfPicker,
  keyOfGradientFocusedElement,
  setKeyOfGradientFocusedElement,
  deleteGradientColorItem
}) => {
  const [hoverStatusOfCloseButton, setHoverStatusOfCloseButton] = useState(false);
  const [gradientHoveredElementName, setGradientHoveredElementName] = useState(false);

  const onHoverOfCloseButton = () => setHoverStatusOfCloseButton(true);
  const onUnHoverOfCloseButton = () => setHoverStatusOfCloseButton(false);

  const focusedElement = _.find(gradientColorState, ({ key }) => keyOfGradientFocusedElement === key);
  const classes = useStyles({ borderColorOfFocusedInput: focusedElement?.color });

  useEffect(() => !focusOfPicker && setColor(focusedElement?.color), [focusedElement]);

  return (
    <Grid container direction={'column'} className={classes.container}>

      {gradientColorState.map(({ color, stopDeg, key }) => {
        const isHovered = gradientHoveredElementName === key;
        const isFocused = keyOfGradientFocusedElement === key;

        const setGradientHoveredElementNameIsFalse = () => setGradientHoveredElementName(false);
        const handleGradientHoveredElementName = () => setGradientHoveredElementName(key);

        const handleGradientFocusedElementColor = () => setKeyOfGradientFocusedElement(key);

        const onChangeOfHexInput = ({ target: { value } }) => {
          // console.log(value);

          const filteredArr = _.filter(gradientColorState, ({ key: gradientColorKey }) => gradientColorKey !== key);
          filteredArr.push({ color: value, stopDeg, key });
          const sortedArr = filteredArr.sort(compareFunc('stopDeg'));
          setGradientColorState(sortedArr);
        };

        const onChangeOfNumberInput = ({ target: { value } }) => {
          // console.log(value);

          const filteredArr = _.filter(gradientColorState, ({ key: gradientColorKey }) => gradientColorKey !== key);
          filteredArr.push({ color, stopDeg: value > 100 ? 100 : value, key });
          const sortedArr = filteredArr.sort(compareFunc('stopDeg'));
          setGradientColorState(sortedArr);
        };

        const onDelete = () => deleteGradientColorItem(key);

        const hexInputProps = {
          type: 'text',
          // onChange: onChangeOfCustomFormatState,
          // name: idx,
          onChange: onChangeOfHexInput,
          // labelWidth: currentLabelName * 9.6,
          value: color
        };

        const numberInputProps = {
          type: 'number',
          onChange: onChangeOfNumberInput,
          // name: idx,
          // labelWidth: currentLabelName * 9.6,
          value: stopDeg,
          endAdornment: (
            <Grid className={classes.numberAdornment}>
              <NumberAdornment />
            </Grid>
          )
        };
        return (
          <Box
          key={nanoid()}
            item
            mb={1.4}
            onFocus={handleGradientFocusedElementColor}
            onMouseEnter={handleGradientHoveredElementName}
            onMouseLeave={setGradientHoveredElementNameIsFalse}
          >
            {/* <Paper elevation={0}> */}
            <Grid container>
              <Paper
                style={{ background: color }}
                className={clsx(classes.colorPreviewer, isFocused && classes.colorPreviewerFocused)}
                elevation={4}
                onClick={null}
                onClick={handleGradientFocusedElementColor}
              />
              <FormControl
                variant={'outlined'}
                // onFocus={onInputFocus}
                // onBlur={onInputBlur}

                className={classes.textFieldInHexFormat}
              >
                {/* <InputLabel>{color}</InputLabel> */}
                <OutlinedInput {...hexInputProps} />
              </FormControl>
              <FormControl
                variant={'outlined'}
                // onFocus={onInputFocus}
                // onBlur={onInputBlur}

                className={classes.numberFieldOfDegValue}
              >
                {/* <InputLabel>{color}</InputLabel> */}
                <OutlinedInput {...numberInputProps} />
              </FormControl>
              <ToggleButton
                value={'close'}
                selected={isHovered && hoverStatusOfCloseButton}
                onMouseEnter={onHoverOfCloseButton}
                onMouseLeave={onUnHoverOfCloseButton}
                onClick={onDelete}
                // onChange={() => {
                //   setSelected(!selected);
                // }}
                className={classes.closeButton}
              >
                <CloseIcon />
              </ToggleButton>
            </Grid>
            {/* </Paper> */}
          </Box>
        );
      })}
    </Grid>
  );
};

MainUtilsOfCustomGradient.propTypes = {};

export default MainUtilsOfCustomGradient;
