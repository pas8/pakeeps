import PropTypes from 'prop-types';
import {
  Box,
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  TextField
} from '@material-ui/core';
import { colord } from 'colord';
import { RgbaColorPicker } from 'react-colorful';
import { themeColors } from 'components/theme';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import CustomGradient from '../CustomGradient';
import GradientPreviewer from '../CustomGradient/components/GradientPreviewer';
import InputsColorUtilsOfCustomColorPicker from './components/InputsColorUtils';
import ButtonUtilsOfCustomGradient from '../CustomGradient/components/ButtonUtils';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useClickAway } from 'react-use';

const useStyles = makeStyles(theme => ({
  containerOfCustomColor: ({ isExtended, gradientColorStateLength, gradientStatus }) => ({
    '& .react-colorful': {
      width: 'auto',
      minWidth: theme.spacing(42 - 1.8),
      minHeight: gradientColorStateLength ? theme.spacing(4 * 9.6) : 'auto',
      height: gradientStatus
        ? theme.spacing(gradientColorStateLength * (8 + 1))
        : isExtended
        ? theme.spacing(42)
        : theme.spacing(42 - 10 + 0.8)
      // marginRight: theme.spacing(10 + 0.16),
    },

    '& .react-colorful__saturation': {
      borderRadius: theme.spacing(0.8),
      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    '& .react-colorful__pointer': {
      borderRadius: theme.spacing(0.8),
      width: theme.spacing(2.8 - 0.16),
      height: theme.spacing(2.8 - 0.16),
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 0,
      boxShadow: '0 0 0 2px rgba(255, 255, 255,0.8),0 0 0 4px rgba(32,32,32,0.8)',

      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.complex
      }),
      '&:hover': {
        boxShadow: '0 0 0 2px rgba(255, 255, 255,1),0 0 0 4px rgba(32,32,32,1)'
      }
    },
    '& .react-colorful__hue': { order: 1 },
    '& .react-colorful__hue,.react-colorful__alpha ': {
      borderRadius: theme.spacing(0.8),
      margin: theme.spacing(2, 0),
      height: theme.spacing(2)
    },

    '& .react-colorful__alpha': {
      order: -2,
      display: isExtended ? 'block' : 'none',

      transition: theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.complex
      })
    }
    // marginRight: theme.spacing(-1)
  }),
  containerOfGradientUtils: {
    padding: theme.spacing(0, 0, 0, 0),
    borderLeft: '2px solid rgba(255, 255, 255,0.4)'
  },
  containerOfMainGradientUtils: {
    '& >  div': {
      paddingTop: theme.spacing(2.4)
    },
    borderTop: '2px solid rgba(255, 255, 255,0.4)'
  },
  containerOfButtonUtilsOfCustomGradient: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1.4),
    borderTop: '2px solid rgba(255, 255, 255,0.4)'
  },
  wrapperOfGradientUtils: {
    height: '100%',
    paddingBottom: theme.spacing(1.8)
  }
}));

const CustomColor = ({
  color,
  statusState,
  setColor,
  nullityColor = '#fff',
  customColorsInHexFormat,
  customFormatName,
  gradientColor,
  keyOfGradientFocusedElement,
  setKeyOfGradientFocusedElement,
  setGradientColor,
  gradientColorState,
  setGradientColorState,
  gradientDirection,
  setGradientDirection,
  gradientAngle,
  setGradientAngle,
  setFocusStatusOfPicker
}) => {
  const isExtended = statusState.customColor && statusState.extended;
  const gradientColorStateLength = gradientColorState.length;
  const classes = useStyles({ isExtended, gradientColorStateLength, gradientStatus: statusState.gradient });
  const isColorInHexFormat = _.isString(color) && color.startsWith('#');
  const colorToRgbFormat = colord(color).toRgb();

  const correctAndFormattedColor = isColorInHexFormat
    ? // _.isEqual(color, 'rgba(255,255,255,0.8)') && !statusState.extended && statusState.customColor
      // ? colord(themeColors.primaryMain).toRgb()
      // : isColorInHexFormat
      colorToRgbFormat
    : color;

  // const [correctColor, setCorrectColor] = useState();

  // useEffect(() => {
  //   if (!_.isEqual(color, { r: 0, g: 0, b: 0, a: 1 })) {
  //     setCorrectColor(correctAndFormattedColor);
  //   }
  // }, []);
  // console.log(correctAndFormattedColor);

  const refOfFocusStatusOfPicker = useRef(null);
  useClickAway(refOfFocusStatusOfPicker, () => setFocusStatusOfPicker(false));
  const setFocusStatusOfPickerIsTrue = () => setFocusStatusOfPicker(true);

  useEffect(() => setFocusStatusOfPicker(true), []);

  const gradientPreviewerProps = {
    gradientColor,
    gradientColorState,
    setGradientColorState,
    keyOfGradientFocusedElement,
    setKeyOfGradientFocusedElement
  };
  const inputsColorUtilsOfCustomColorPickerProps = {
    color,
    setColor,
    focusOfPicker: statusState.focusOfPicker,
    customColorsInHexFormat,
    customFormatName,
    setFocusStatusOfPicker,
    gradientStatus: statusState.gradient
  };

  const customGradientProps = {
    setColor,
    setGradientColor,
    focusOfPicker: statusState.focusOfPicker,
    customColorsInHexFormat,
    color,
    nullityColor,
    gradientColorState,
    setGradientColorState,
    keyOfGradientFocusedElement,
    setKeyOfGradientFocusedElement
  };

  const buttonUtilsOfCustomGradientProps = {
    color: customColorsInHexFormat,
    colorPreview: statusState.colorPreview,
    gradientDirection,
    setGradientDirection,
    gradientAngle,
    setGradientAngle
  };

  return (
    <Box
      className={classes.containerOfCustomColor}
      mb={statusState.gradient ? 0 : isExtended ? 0 : -1.1}
      mx={statusState.gradient ? 0 : isExtended ? 1.8 : 1.4}
      mt={isExtended ? -0.4 : 1.4}
    >
      {statusState.gradient && (
        <Box mt={2.8} px={2.8}>
          <GradientPreviewer {...gradientPreviewerProps} />
        </Box>
      )}
      <Grid container className={statusState.gradient && classes.containerOfMainGradientUtils}>
        <Grid item>
          <Box pr={statusState.gradient && 2.8} pb={statusState.gradient && 1.8} pl={statusState.gradient && 1.8}>
            <Box ref={refOfFocusStatusOfPicker} onClick={setFocusStatusOfPickerIsTrue}>
              <RgbaColorPicker color={correctAndFormattedColor} onChange={setColor} />
            </Box>
            {isExtended && (
              <Box>
                <InputsColorUtilsOfCustomColorPicker {...inputsColorUtilsOfCustomColorPickerProps} />
              </Box> 
            )}
          </Box>
        </Grid>
        {statusState.gradient && (
          <Grid item className={classes.containerOfGradientUtils}>
            <Grid container direction={'column'} justify={'space-between'} className={classes.wrapperOfGradientUtils}>
              <Box item ml={1.8}>
                <CustomGradient {...customGradientProps} />
              </Box>
              <Grid className={classes.containerOfButtonUtilsOfCustomGradient}>
                <ButtonUtilsOfCustomGradient {...buttonUtilsOfCustomGradientProps} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

CustomColor.propTypes = {
  color: PropTypes.shape({
    startsWith: PropTypes.func
  }),
  nullityColor: PropTypes.string,
  setColor: PropTypes.func,
  setTransparencyStatus: PropTypes.func,
  transparencyStatus: PropTypes.bool
};

export default CustomColor;
