import { Grid, makeStyles } from '@material-ui/core';
import { colord } from 'colord';
import React from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { themeColors } from 'components/theme';

const useStyles = makeStyles(theme => ({
  containerOfCustomColor: ({ transparencyStatus }) => ({
    '& .react-colorful': {
      padding: theme.spacing(0, 1),
      width: 'auto',
      paddingTop: transparencyStatus ? 0 : theme.spacing(1.4),
      height: theme.spacing(42 - 10 + 1.2)
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
      width: theme.spacing(2.8),
      height: theme.spacing(2.8),
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: '3px solid rgba(255, 255, 255,0.8)',
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.complex
      }),
      '&:hover': {
        borderColor: 'rgba(255, 255, 255,0.96)'
      }
    },

    '& .react-colorful__hue,.react-colorful__alpha ': {
      borderRadius: theme.spacing(0.8),
      margin: theme.spacing(2, 0),
      height: theme.spacing(2)
    },
    '& .react-colorful__hue-pointer,.react-colorful__alpha-pointer': {
      //  borderWidth: '5px'
    },
    '& .react-colorful__alpha': {
      order: -1,
      display: transparencyStatus ? 'block' : 'none',

      transition: theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.complex
      })
    }
  })
}));

const CustomColor = ({ color, setColor, transparencyStatus }) => {
  const classes = useStyles({ transparencyStatus });
  console.log();
  const isColorInHexFormat = _.isString(color) && color.startsWith('#');
  const colorInRgbFormat = colord(color).toRgb();
  const correctAndFormattedColor =
  _.isEqual(color,'rgba(255,255,255,0.8)') && !transparencyStatus
      ? colord(themeColors.primaryMain).toRgb()
      : isColorInHexFormat
      ? colorInRgbFormat
      : color;
  console.log(  _.isEqual(color,'rgba(255,255,255,0.8)') && !transparencyStatus);
  return (
    <Grid className={classes.containerOfCustomColor}>
      <RgbaColorPicker color={correctAndFormattedColor} onChange={setColor} />
    </Grid>
  );
};

export default CustomColor;
