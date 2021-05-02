import { Box, FormControl, Grid, InputLabel, makeStyles, OutlinedInput, Paper } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NumberAdornment from '../CustomColor/components/NumberAdornment';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2.16, 4, 0.8, 1.2),

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
    '& .MuiFormLabel-root.Mui-focused ': { color: ({ customColorsInHexFormat }) => customColorsInHexFormat },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ customColorsInHexFormat }) => customColorsInHexFormat
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


const CustomGradient = ({ setColor, setGradientColor, customColorsInHexFormat, color, nullityColor }) => {
  const testColorPlaceholder = [
    { color: '#090979', stopDeg: 0, key: '0' },
    { color: '#1f13e5', stopDeg: 42, key: '1' },
    { color: '#00d4ff', stopDeg: 80, key: '2' },
    { color: '#0024ff', stopDeg: 100, key: '3' }
  ];

  const [hoverStatusOfCloseButton, setHoverStatusOfCloseButton] = useState(false);
  const [gradientHoveredElementName, setGradientHoveredElementName] = useState(false);
  const [gradientFocusedElementState, setGradientFocusedElementState] = useState({
    color: testColorPlaceholder[0].color,
    name: testColorPlaceholder[0].name,
    stopDeg: testColorPlaceholder[0].stopDeg
  });
  console.log(gradientFocusedElementState);

  // const sumReduceFunc = (sum, { color, name }) => ({ ...sum, [name]: color });
  // const nullityValueOfCustomFormatState = _.reduce(testColorPlaceholder, sumReduceFunc, 1);
  // console.log(nullityValueOfCustomFormatState);

  const onHoverOfCloseButton = () => setHoverStatusOfCloseButton(true);
  const onUnHoverOfCloseButton = () => setHoverStatusOfCloseButton(false);

  const classes = useStyles({ borderColorOfFocusedInput: gradientFocusedElementState.color });
  console.log(customColorsInHexFormat);

  useEffect(() => setColor(gradientFocusedElementState.color), [gradientFocusedElementState]);

  useEffect(() => {
    if (color !== nullityColor)
      _.debounce(() => setGradientFocusedElementState(state => ({ ...state, color: customColorsInHexFormat })), 160);
  }, [customColorsInHexFormat]);

  return (
    <Grid container direction={'column'} className={classes.container}>
      {testColorPlaceholder.map(({ color, stopDeg, name }) => {
        const isHovered = gradientHoveredElementName === name;
        const isFocused = gradientFocusedElementState.color === color;

        const setGradientHoveredElementNameIsFalse = () => setGradientHoveredElementName(false);
        const handleGradientHoveredElementName = () => setGradientHoveredElementName(name);

        const handleGradientFocusedElementColor = () =>
          setGradientFocusedElementState({
            color,
            name,
            stopDeg
          });

        const hexInputProps = {
          type: 'text',
          // onChange: onChangeOfCustomFormatState,
          // name: idx,
          // labelWidth: currentLabelName * 9.6,
          value: color
        };

        const numberInputProps = {
          type: 'number',
          // onChange: onChangeOfCustomFormatState,
          // name: idx,
          // labelWidth: currentLabelName * 9.6,
          value: stopDeg,
          endAdornment: (
            <Grid className={classes.numberAdornment}>
              {' '}
              <NumberAdornment />
            </Grid>
          )
        };
        return (
          <Box
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
                onClick={() => console.log(';')}
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

CustomGradient.propTypes = {};

export default CustomGradient;
