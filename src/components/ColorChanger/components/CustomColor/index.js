import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { themeColors } from 'components/theme';
import { colord } from 'colord';
import _ from 'lodash';
import IconUtilsOfCustomColor from './components/IconsUtils';
import InputsColorUtilsOfCustomColorPicker from './components/InputsColorUtils';
import PreparedColorExamples from '../PreparedColorExamples';
import PickerByPas from './components/Picker';
import { useCopyToClipboard } from 'react-use';

const useStyles = makeStyles(theme => ({
  customColorContainer: {
    margin: ({ isExtended, isCustomColor }) =>
      isExtended && isCustomColor ? theme.spacing(0, 0, 1, 0) : theme.spacing(0.8, 1, 0)
  },

  container: {
    margin: ({ isExtended, isCustomColor }) => isExtended && isCustomColor && theme.spacing(0, 2, 0.4)
  }
}));

const CustomColor = ({ gradientStatus, setGradientStatus }) => {
  const [copyState, copyToClipboardFunc] = useCopyToClipboard();

  const nullityColor = colord(themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal).toRgb();
  const [color, setColor] = useState(nullityColor);
  const customColorsInHexFormat = colord(color).toHex();

  const [statusState, setStatusState] = useState({
    saved: false,
    extended: false,
    customization: false,
    customFormats: false,
    customColor: false,
    copy: false,
    colorPreview: true
  });
  const { extended: isExtended, customColor: isCustomColor } = statusState;

  const onClickOfPalletteButton = () => setStatusState(state => ({ ...state, customColor: !state.customColor }));

  const [customFormatName, setCustomFormatName] = useState('rgb');

  const onClickOfGradientButton = () => setGradientStatus(true);
  const onClickOfExtendButton = () => setStatusState(state => ({ ...state, extended: !state.extended }));
  const onClickOfColorPreviewButton = () => setStatusState(state => ({ ...state, colorPreview: !state.colorPreview }));

  const onClickOfCopyButton = () => {
    setStatusState(state => ({ ...state, copy: true }));
    copyToClipboardFunc(gradientColor);
  };
  useEffect(() => statusState.copy && setStatusState(state => ({ ...state, copy: false })), [color, statusState.copy]);

  const setCustomizationsStatus = value => setStatusState(state => ({ ...state, customization: value }));

  const customizationButtonProps = {
    nullityColor,
    customColorsInHexFormat,
    color
  };

  const handleSetColor = value => setColor(value);

  const onSave = () => console.log(color);
  const inputsColorUtilsOfCustomColorPickerProps = {
    color,
    setColor,
    focusOfPicker: statusState.focusOfPicker,
    customColorsInHexFormat,
    customFormatName,
    // setFocusStatusOfPicker,
    gradientStatus: statusState.gradient
  };

  const iconUtilsProps = {
    statusState,
    onSave,
    customizationButtonProps,
    color,
    customColorsInHexFormat,
    setCustomFormatName,
    customFormatName,
    onClickOfGradientButton,
    onClickOfExtendButton,
    onClickOfPalletteButton,
    onClickOfColorPreviewButton,
    onClickOfCopyButton
  };

  const preparedColorExamplesProps = {
    isExtended,
    color,
    handleSetColor
  };

  const classes = useStyles({ isExtended, isCustomColor });
  return (
    <Grid className={classes.container}>
      {!isCustomColor && <PreparedColorExamples {...preparedColorExamplesProps} />}

      {isCustomColor && (
        <Grid className={classes.customColorContainer}>
          <PickerByPas setPickerColor={setColor} color={color} isExtended={statusState.extended} />
          {isExtended && <InputsColorUtilsOfCustomColorPicker {...inputsColorUtilsOfCustomColorPickerProps} />}
        </Grid>
      )}

      <Grid container justify={'space-between'} alignItems={'center'} className={classes.containerOfIconsUtils}>
        <IconUtilsOfCustomColor {...iconUtilsProps} />
      </Grid>
    </Grid>
  );
};

CustomColor.propTypes = {
  gradientStatus: PropTypes.bool,
  setGradientStatus: PropTypes.func
};

export default CustomColor;
