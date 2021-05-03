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
import { useEffect, useState } from 'react';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  containerOfCustomColor: ({ isExtended }) => ({
    '& .react-colorful': {
      width: 'auto',
      minWidth: theme.spacing(42 - 1.8),
      height: isExtended ? theme.spacing(42) : theme.spacing(42 - 10 + 0.8)
      // marginRight: theme.spacing(10 + 0.16)
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
    padding: theme.spacing(0, 2),
    borderLeft: '2px solid rgba(255, 255, 255,0.4)'
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
  gradientFocusedElementState,
  setGradientFocusedElementState,
  setGradientColor,
  gradientColorState,
  setGradientColorState,
  gradientDirection,
  setGradientDirection,
  gradientAngle,
  setGradientAngle
}) => {
  const isExtended = statusState.customColor && statusState.extended;
  const classes = useStyles({ isExtended });
  const isColorInHexFormat = _.isString(color, nullityColor) && color.startsWith('#');
  const colorToRgbFormat = colord(color).toRgb();

  const correctAndFormattedColor =
    _.isEqual(color, 'rgba(255,255,255,0.8)') && !statusState.extended && statusState.customColor
      ? colord(themeColors.primaryMain).toRgb()
      : isColorInHexFormat
      ? colorToRgbFormat
      : color;

  // console.log(correctAndFormattedColor,color)
  return (
    <Box
      className={classes.containerOfCustomColor}
      mb={isExtended ? 0 : -1.1}
      mx={isExtended ? 1.8 : 1.4}
      mt={isExtended ? -0.4 : 1.4}
    >
      {statusState.gradient && (
        <Box mt={1.4} mx={1.4} mr={4}>
          <GradientPreviewer
            gradientColor={gradientColor}
            gradientColorState={gradientColorState}
            setGradientColorState={setGradientColorState}
            gradientFocusedElementState={gradientFocusedElementState}
            setGradientFocusedElementState={setGradientFocusedElementState}
          />
        </Box>
      )}
      <Grid container>
        <Grid item>
          <Box>
            <RgbaColorPicker color={correctAndFormattedColor} onChange={setColor} />
            {isExtended && (
              <Box pb={0.8}>
                <InputsColorUtilsOfCustomColorPicker
                  color={color}
                  setColor={setColor}
                  customColorsInHexFormat={customColorsInHexFormat}
                  customFormatName={customFormatName}
                />
              </Box>
            )}
          </Box>
        </Grid>
        {statusState.gradient  && (
          <Grid item className={classes.containerOfGradientUtils}>
            <Grid container direction={'column'} justify={'space-between'} style={{ height: '100%' }}>
              <Grid item>
                <CustomGradient
                  setColor={setColor}
                  setGradientColor={setGradientColor}
                  customColorsInHexFormat={customColorsInHexFormat}
                  color={color}
                  nullityColor={nullityColor}
                  gradientColorState={gradientColorState}
                  setGradientColorState={setGradientColorState}
                  gradientFocusedElementState={gradientFocusedElementState}
                  setGradientFocusedElementState={setGradientFocusedElementState}
                />
              </Grid>
              <Grid>
                <ButtonUtilsOfCustomGradient
                  color={customColorsInHexFormat}
                  gradientDirection={gradientDirection}
                  setGradientDirection={setGradientDirection}
                  gradientAngle={gradientAngle}
                  setGradientAngle={setGradientAngle}
                />
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
