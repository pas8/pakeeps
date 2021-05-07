import { useEffect, useState } from 'react';
import { HexColorPicker, RgbaColorPicker } from 'react-colorful';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import {
  Box,
  Button,
  ButtonGroup,
  colors,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import { themeColors } from 'components/theme';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
import IconButtonByPas from 'components/IconButton';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import clsx from 'clsx';
import CenteredGrid from 'components/CenteredGrid';
import CustomColor from './components/CustomColor';
import { colord } from 'colord';
import CustomizationButton from './components/CustomizationButton';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';
import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import ColorFormatIcon from 'components/Icons/components/ColorFormatIcon';
import IconUtilsOfColorPicker from './components/CustomColor/components/IconsUtils';
import _ from 'lodash';
import { useCopyToClipboard } from 'react-use';
import compareFunc from 'compare-func';
import PreparedColorExamples from './components/PreparedColorExamples';
import PickerByPas from './components/CustomColor/components/Picker';

const useStyles = makeStyles(theme => ({

}));

const ColorPickerByPas = () => {
  const nullityColor = colord(themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal).toRgb();
  const [copyToClipboardState, copyToClipboardFunc] = useCopyToClipboard();

  const [color, setColor] = useState(nullityColor);
  const customColorsInHexFormat = colord(color).toHex();
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


  const setFocusStatusOfPicker = value => setStatusState(state => ({ ...state, focusOfPicker: value }));

  const onClickOfPalletteButton = () => {
    setStatusState(state => ({
      ...state,
      customColor: !state.customColor,
      gradient: false,
      colorPreview: !state.colorPreview
    }));
  };

  const onClickOfGradientButton = () => {
    setStatusState(state => ({ ...state, gradient: !state.gradient, extended: true }));
  };
  const onClickOfExtendButton = () => {
    setStatusState(state => ({ ...state, extended: !state.extended, gradient: false }));
  };

  const onClickOfColorPreviewButton = () => {
    setStatusState(state => ({ ...state, colorPreview: !state.colorPreview }));
  };

  const onClickOfCopyButton = () => {
    setStatusState(state => ({ ...state, copy: true }));
    copyToClipboardFunc(gradientColor);

    setTimeout(() => setStatusState(state => ({ ...state, copy: false })), 10000);
  };

  const setCustomizationsStatus = value => setStatusState(state => ({ ...state, customization: value }));

  const [customFormatName, setCustomFormatName] = useState('rgb');

  const classes = useStyles();

  // const arr = colorsArr.map(el => console.log(colors[el.colorName]));




  // useEffect(() => {
  //   if (statusState.gradient) setColor(gradientFocusedElementState.color);
  // }, []);



  // useEffect(() => {
  //   if (
  //     !(
  //       (_.isString(color) && color.startsWith('#') || !statusState.extended && !statusState.gradient && statusState.customColor && color?.a < 1) ||
  //       color === nullityColor
  //     )
  //   )
  //     return _.debounce(() => setColor(state => ({ ...state, a: 1 })), 160);
  // }, [color]);

  const handlePopoverAndMenuState = value => setPopoverAndMenuState(value);

  const customizationButtonProps = {
    nullityColor,
    customColorsInHexFormat,
    color
  };

  const handleSetColor = value => setColor(value);

  const onSave = () => console.log(color);

  const customColorProps = {
    setColor,
    color,
    nullityColor,
    customColorsInHexFormat,
    customFormatName,
    gradientColor,
    gradientColorState,
    setGradientColorState,
    gradientDirection,
    setGradientDirection,
    gradientAngle,
    setGradientAngle,
    keyOfGradientFocusedElement,
    setKeyOfGradientFocusedElement,
    statusState,
    setFocusStatusOfPicker,
    setCustomizationsStatus
  };

  const iconUtilsProps = {
    statusState,
    handlePopoverAndMenuState,
    onSave,
    customizationButtonProps,
    color,
    customColorsInHexFormat,
    popoverAndMenuState,
    setCustomFormatName,
    customFormatName,
    onClickOfGradientButton,
    onClickOfExtendButton,
    onClickOfPalletteButton,
    onClickOfColorPreviewButton,
    onClickOfCopyButton
  };


  const Container = statusState.gradient ? Dialog : Grid;
  return (
    <Container open={statusState.gradient} maxWidth={'lg'} className={classes.container}>
      <Grid container direction={statusState.gradient ? 'row' : 'column'}>
        {statusState.customColor ? (
          <CustomColor {...customColorProps} />
        ) : (
          // <PreparedColorExamples {...preparedColorExamplesProps} />
          <PickerByPas setPickerColor={setColor} color={color} />
        )}

      
      </Grid>
      
    </Container>
  );
};

export default ColorPickerByPas;
