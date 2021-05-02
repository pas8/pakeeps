import { Box, FormControl, Grid, InputLabel, makeStyles, OutlinedInput, Paper } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import NumberAdornment from '../CustomColor/components/NumberAdornment';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2.16, 4, 2, 0.8),

    '& > div': {
      // width: '20ch',
      ' & input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none'
      }
    }
  },
  colorPreviewer: {
    width: theme.spacing(8 * 0.8),
    height: theme.spacing(8 * 0.8)
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
    }
  },
  numberFieldOfDegValue: {
    width: theme.spacing(10),
    marginTop: theme.spacing(0.1),
    '& div': {
      height: theme.spacing(8 * 0.8)
    }
  },
  closeButton: {
    width: theme.spacing(8 * 0.8),
    height: theme.spacing(8 * 0.8),
    marginLeft: theme.spacing(1.4)
  },
  numberAdornment: {
    paddingTop: theme.spacing(1.4),
    marginRight: theme.spacing(-0.4)
  }
}));

const CustomGradient = () => {
  const classes = useStyles();

  const testColorPlaceholder = [
    { color: '#090979', stopDeg: 0, name: '0' },
    { color: '#1f13e5', stopDeg: 42, name: '1' },
    { color: '#00d4ff', stopDeg: 100, name: '2' },
    { color: '#0024ff', stopDeg: 100, name: '3' }
  ];

  const [hoverNameOfGradientElementColor, setHoverNameOfGradientElementColor] = useState(false);
  const [hoverStatusOfCloseButton, setHoverStatusOfCloseButton] = useState(false);
  const sumReduceFunc = (sum, { color, name }) => ({ ...sum, [name]: color });
  const nullityValueOfCustomFormatState = _.reduce(testColorPlaceholder, sumReduceFunc, 1);
  console.log(nullityValueOfCustomFormatState);

  const onHoverOfCloseButton = () => setHoverStatusOfCloseButton(true);
  const onUnHoverOfCloseButton = () => setHoverStatusOfCloseButton(false);

  return (
    <Grid container direction={'column'} className={classes.container}>
      {testColorPlaceholder.map(({ color, stopDeg }) => {
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
          value: color,
          endAdornment: (
            <Grid className={classes.numberAdornment}>
              {' '}
              <NumberAdornment />
            </Grid>
          )
        };
        return (
          <Box item mb={1}>
            <Paper elevation={0}>
              <Grid container>
                <Paper style={{ background: color }} className={classes.colorPreviewer} />
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
                  selected={hoverStatusOfCloseButton}
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
            </Paper>
          </Box>
        );
      })}
    </Grid>
  );
};

CustomGradient.propTypes = {};

export default CustomGradient;
