import PropTypes from 'prop-types';
import {
  Box,
  Button,
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
import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useClickAway } from 'react-use';
import ButtonUtilsOfCustomGradient from './components/ButtonUtils';
import PickerByPas from '../CustomColor/components/Picker';
import InputsColorUtils from '../CustomColor/components/InputsColorUtils';
import GradientPreviewer from './components/GradientPreviewer';
import MainUtilsOfCustomGradient from './components/MainUtils';
import ToggleButtonUtilsOfCustomGradient from './components/ToggleButtonUtils';
import compareFunc from 'compare-func';
import { useSnackbar } from 'notistack';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';

const useStyles = makeStyles(theme => ({
  containerOfGradientUtils: {
    padding: theme.spacing(0, 0, 0, 0),
    borderLeft: '1px solid rgba(255, 255, 255,0.16)'
  },
  containerOfMainGradientUtils: {
    '& >  div': {
      paddingTop: theme.spacing(2.8)
    },
    borderTop: '1px solid rgba(255, 255, 255,0.16)'
  },
  containerOfButtonUtilsOfCustomGradient: {
    paddingTop: theme.spacing(1.8),
    paddingLeft: theme.spacing(1.4),
    borderTop: '1px solid rgba(255, 255, 255,0.16)'
  },
  wrapperOfGradientUtils: {
    height: '100%',
    paddingBottom: theme.spacing(1.8)
  },
  containerOfToggleButtonUtils: {
    borderLeft: '1px solid rgba(255, 255, 255,0.16)'
  }
}));

const CustomGradient = ({ gradientStatus, setGradientStatus }) => {
  // const isExtended = statusState.customColor && statusState.extended;
  // const gradientColorStateLength = gradientColorState.length;
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [customFormatName, setCustomFormatName] = useState('rgb');

  const [lastDeletedGradientColorItem, setLastDeletedGradientColorItem] = useState(null);

  const [gradientColor, setGradientColor] = useState('null');
  const [gradientAngle, setGradientAngle] = useState(90);
  const [gradientDirection, setGradientDirection] = useState('linear-gradient');
  const [gradientColorState, setGradientColorState] = useState([
    { color: '#090979', stopDeg: 0, key: '0' },
    { color: '#1f13e5', stopDeg: 42, key: '1' },
    { color: '#00d4ff', stopDeg: 80, key: '2' },
    { color: '#0024ff', stopDeg: 100, key: '3' }
  ]);

  const [currentColor, setCurrentColor] = useState(gradientColorState[0].color);
  const currentColorInHexFormat = colord(currentColor).toHex();

  const [keyOfGradientFocusedElement, setKeyOfGradientFocusedElement] = useState(gradientColorState[0].key);

  const [statusState, setStatusState] = useState({
    saved: false,
    customization: false,
    customFormats: false,
    gradient: false,
    pattern: false,
    copy: false,
    colorPreview: !false,
    focusOfPicker: true
  });

  const deleteGradientColorItem = key => {
    const minGradientColorElement = 2;
    if (gradientColorState.length <= minGradientColorElement)
      return enqueueSnackbar({ message: 'Min count of gradient colors is 2', severity: 'error' });

    const filteredArr = _.filter(gradientColorState, ({ key: currentKey }) => currentKey !== key);
    const deletedItem = _.differenceWith(gradientColorState, filteredArr, _.isEqual);
    console.log(deletedItem);

    setGradientColorState(filteredArr);
    setLastDeletedGradientColorItem(deletedItem);

    useRestore();
  };

  const useRestore = useCallback(() => {
    enqueueSnackbar({
      message: 'You delete one color item',
      severity: 'warning',
      buttonText: 'Restore',
      onClick: restoreDeletedItem,
      icon: RestoreOutlinedIcon
    });
  }, [lastDeletedGradientColorItem]);

  const restoreDeletedItem = () => {
    console.log(gradientColorState, lastDeletedGradientColorItem);
    setGradientColorState(state => _.concat(state, lastDeletedGradientColorItem).sort(compareFunc('stopDeg')));
    closeSnackbar();
  };

  const onClickOfGradientButton = () => setGradientStatus(false);
  const onClickOfCustomizationButton = () => console.log(onClickOfCustomizationButton);
  const onClickOfColorPreviewButton = () => console.log(onClickOfColorFormatButton);
  const onClickOfCopyButton = () => console.log(onClickOfColorFormatButton);
  const onClickOfSaveButton = () => console.log(onClickOfColorFormatButton);
  const onClickOfColorFormatButton = () => console.log(onClickOfColorFormatButton);
  const onClickOfAddToPatternButton = () => console.log(onClickOfAddToPatternButton);

  const refOfFocusStatusOfPicker = useRef(null);
  useClickAway(refOfFocusStatusOfPicker, () => setFocusStatusOfPicker(false));

  const setFocusStatusOfPickerIsTrue = () => setFocusStatusOfPicker(true);
  useEffect(() => setFocusStatusOfPicker(true), []);

  useEffect(() => {
    if (!statusState.focusOfPicker) return;

    const filteredArr = _.filter(
      gradientColorState,
      ({ key: gradientColorKey }) => gradientColorKey !== keyOfGradientFocusedElement
    );
    const focusedElement = _.find(gradientColorState, ({ key }) => keyOfGradientFocusedElement === key);

    filteredArr.push({ ...focusedElement, color: currentColorInHexFormat });
    const sortedArr = filteredArr.sort(compareFunc('stopDeg'));

    // _.debounce(() => setGradientColorState(sortedArr), 100);
    // setGradientColorState(sortedArr);

    return _.debounce(() => setGradientColorState(sortedArr), 80);
  }, [currentColorInHexFormat, keyOfGradientFocusedElement]);

  useEffect(() => {
    const reduceFunc = (sum, { color, stopDeg }, idx) =>
      `${sum} ${color} ${stopDeg}${gradientColorState.length - 1 === idx ? '%' : '%,'}`;

    const mainPart = _.reduce(gradientColorState, reduceFunc, '');

    const gradientPosition = gradientDirection === 'radial-gradient' ? 'circle' : gradientAngle + 'deg,';
    const gradientRoute = `${gradientDirection}(${gradientPosition}`;

    const gradientColor = `${gradientRoute} ${mainPart})`;

    setGradientColor(gradientColor);
  }, [gradientColorState, gradientDirection, gradientAngle, gradientAngle]);

  const setFocusStatusOfPicker = value => setStatusState(state => ({ ...state, focusOfPicker: value }));

  const gradientPreviewerProps = {
    gradientColor,
    gradientColorState,
    setGradientColorState,
    keyOfGradientFocusedElement,
    setKeyOfGradientFocusedElement,
    deleteGradientColorItem
  };
  const inputsColorUtilsOfCustomColorPickerProps = {
    color: currentColor,
    setColor: setCurrentColor,
    focusOfPicker: statusState.focusOfPicker,
    colorInHexFormat: currentColorInHexFormat,
    customFormatName,
    setFocusStatusOfPicker,
    gradientStatus: statusState.gradient
  };

  const mainUtilsOfCustomGradientProps = {
    setColor: setCurrentColor,
    setGradientColor,
    focusOfPicker: statusState.focusOfPicker,
    colorInHexFormat: currentColorInHexFormat,
    color: currentColor,
    gradientColorState,
    setGradientColorState,
    keyOfGradientFocusedElement,
    setKeyOfGradientFocusedElement,
    deleteGradientColorItem
  };

  const buttonUtilsOfCustomGradientProps = {
    color: currentColorInHexFormat,
    colorPreview: statusState.colorPreview,
    gradientDirection,
    setGradientDirection,
    gradientAngle,
    setGradientAngle
  };

  const toggleButtonUtilsProps = {
    statusState,
    setStatusState,
    colorInHexFormat: currentColorInHexFormat,
    onClickOfGradientButton,
    onClickOfCustomizationButton,
    onClickOfColorPreviewButton,
    onClickOfCopyButton,
    onClickOfSaveButton,
    onClickOfColorFormatButton,
    onClickOfAddToPatternButton
  };

  const pickerByPasProps = {
    color: currentColorInHexFormat,
    setPickerColor: setCurrentColor,
    isExtended: true,
    gradientColorStateLength: gradientColorState.length,
    gradientStatus: true
  };

  return (
    <Grid direction={'row'} container>
      <Box className={classes.containerOfCustomColor} mb={0} mx={0} mt={-0.4}>
        <Box mt={2.8} px={2.8}>
          <GradientPreviewer {...gradientPreviewerProps} />
        </Box>
        <Grid container className={classes.containerOfMainGradientUtils}>
          <Grid item>
            <Box pr={2.8} pb={1.8} pl={1.8}>
              <Box ref={refOfFocusStatusOfPicker} onClick={setFocusStatusOfPickerIsTrue}>
                <PickerByPas {...pickerByPasProps} />
              </Box>
              <Box>
                <InputsColorUtils {...inputsColorUtilsOfCustomColorPickerProps} />
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
        <ToggleButtonUtilsOfCustomGradient {...toggleButtonUtilsProps} />
      </Box>
    </Grid>
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
