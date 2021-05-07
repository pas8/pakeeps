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
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useClickAway } from 'react-use';
import PickerByPas from '../CustomColor/components/Picker';
import GradientPreviewer from './components/GradientPreviewer';
import MainUtilsOfCustomGradient from './components/MainUtils';
import ToggleButtonUtilsOfCustomGradient from './components/ToggleButtonUtils';

const useStyles = makeStyles(theme => ({
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
  },
  containerOfToggleButtonUtils: {
    '& button': { transform: 'scale(1.1)' },
    // padding:theme.spacing(0.8),

    padding: theme.spacing(1.4, 0.8),
    borderLeft: '2px solid rgba(255, 255, 255,0.4)'
    // '& .MuiSvgIcon-root': { width: theme.spacing(10) },

    // '& .MuiSvgIcon-root': { width: theme.spacing(4) }
  }
}));

const CustomGradient = () => {
  const isExtended = statusState.customColor && statusState.extended;
  const gradientColorStateLength = gradientColorState.length;
  const classes = useStyles();

  const [gradientColor, setGradientColor] = useState(customColorsInHexFormat);
  const [gradientAngle, setGradientAngle] = useState(90);
  const [gradientDirection, setGradientDirection] = useState('linear-gradient');
  const [gradientColorState, setGradientColorState] = useState([
    { color: '#090979', stopDeg: 0, key: '0' },
    { color: '#1f13e5', stopDeg: 42, key: '1' },
    { color: '#00d4ff', stopDeg: 80, key: '2' },
    { color: '#0024ff', stopDeg: 100, key: '3' }
  ]);

  const [keyOfGradientFocusedElement, setKeyOfGradientFocusedElement] = useState(gradientColorState[0].key);

  const [statusState, setStatusState] = useState({
    saved: false,
    extended: false,
    customization: false,
    customFormats: false,
    customColor: false,
    gradient: false,
    copy: false,
    colorPreview: !false,
    focusOfPicker: true
  });

  const refOfFocusStatusOfPicker = useRef(null);
  useClickAway(refOfFocusStatusOfPicker, () => setFocusStatusOfPicker(false));

  const setFocusStatusOfPickerIsTrue = () => setFocusStatusOfPicker(true);
  useEffect(() => setFocusStatusOfPicker(true), []);

  useEffect(() => {
    if (color === nullityColor) return;
    if (!statusState.focusOfPicker) return;

    const filteredArr = _.filter(
      gradientColorState,
      ({ key: gradientColorKey }) => gradientColorKey !== keyOfGradientFocusedElement
    );
    const focusedElement = _.find(gradientColorState, ({ key }) => keyOfGradientFocusedElement === key);

    filteredArr.push({ ...focusedElement, color: customColorsInHexFormat });
    const sortedArr = filteredArr.sort(compareFunc('stopDeg'));

    // _.debounce(() => setGradientColorState(sortedArr), 100);
    // setGradientColorState(sortedArr);

    return _.throttle(() => setGradientColorState(sortedArr), 420);
  }, [customColorsInHexFormat, keyOfGradientFocusedElement]);

  useEffect(() => {
    const reduceFunc = (sum, { color, stopDeg }, idx) =>
      `${sum} ${color} ${stopDeg}${gradientColorState.length - 1 === idx ? '%' : '%,'}`;

    const mainPart = _.reduce(gradientColorState, reduceFunc, '');

    const gradientPosition = gradientDirection === 'radial-gradient' ? 'circle' : gradientAngle + 'deg,';
    const gradientRoute = `${gradientDirection}(${gradientPosition}`;

    const gradientColor = `${gradientRoute} ${mainPart})`;

    setGradientColor(gradientColor);
  }, [gradientColorState, gradientDirection, gradientAngle, gradientAngle]);

  const [customFormatName, setCustomFormatName] = useState('rgb');


  const setFocusStatusOfPicker = value => setStatusState(state => ({ ...state, focusOfPicker: value }));


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

  const mainUtilsOfCustomGradientProps = {
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
    <Box>
      <Box className={classes.containerOfCustomColor} mb={0} mx={0} mt={-0.4}>
        <Box mt={2.8} px={2.8}>
          <GradientPreviewer {...gradientPreviewerProps} />
        </Box>
        <Grid container className={statusState.gradient && classes.containerOfMainGradientUtils}>
          <Grid item>
            <Box pr={2.8} pb={1.8} pl={1.8}>
              <Box ref={refOfFocusStatusOfPicker} onClick={setFocusStatusOfPickerIsTrue}>
                <PickerByPas color={color} setPickerColor={setPickerColor} />
              </Box>
              <Box>
                <InputsColorUtilsOfCustomColorPicker {...inputsColorUtilsOfCustomColorPickerProps} />
              </Box>
            </Box>
          </Grid>
          <Grid item className={classes.containerOfGradientUtils}>
            <Grid container direction={'column'} justify={'space-between'} className={classes.wrapperOfGradientUtils}>
              <Box item ml={1.8}>
                <MainUtilsOfCustomGradient {...mainUtilsOfCustomGradientProps} />
              </Box>
              <Grid className={classes.containerOfButtonUtilsOfCustomGradient}>
                <ButtonUtilsOfCustomGradient {...buttonUtilsOfCustomGradientProps} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.containerOfToggleButtonUtils}>
        <Grid container justify={'space-between'} alignItems={'center'} direction={'column'} style={{ height: '100%' }}>
          <ToggleButtonUtilsOfCustomGradient {...toggleButtonUtilsProps} />
        </Grid>
      </Box>
    </Box>
  );
};

CustomGradient.propTypes = {
  color: PropTypes.shape({
    startsWith: PropTypes.func
  }),
  nullityColor: PropTypes.string,
  setColor: PropTypes.func,
  setTransparencyStatus: PropTypes.func,
  transparencyStatus: PropTypes.bool
};

export default CustomGradient;
