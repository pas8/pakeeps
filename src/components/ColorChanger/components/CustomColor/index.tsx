import { useSnackbar } from 'notistack';
import { FC, memo, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Grid, makeStyles } from '@material-ui/core';
import { colord, RgbaColor } from 'colord';
import _ from 'lodash';

import { useThemeColors } from 'hooks/useThemeColors.hook';
import IconUtilsOfCustomColor from './components/IconsUtils';
import InputsColorUtilsOfCustomColorPicker, { formats } from './components/InputsColorUtils';
import PreparedColorExamples from '../PreparedColorExamples';
import PickerByPas from './components/Picker';
import { CustomColorPropsType, UseStylesOfCustomColorType } from './types';
import { FormatType } from './components/InputsColorUtils/types';
import { HandleSetColorType } from '../PreparedColorExamples/types';

const useStyles = makeStyles(theme => ({
  customColorContainer: {
    margin: ({ isExtended, isCustomColor }: UseStylesOfCustomColorType) =>
      isExtended && isCustomColor ? theme.spacing(0, 2, 2, 2) : theme.spacing(0.8, 1, 0)
  },

  container: {
    margin: ({ isExtended, isCustomColor }: UseStylesOfCustomColorType) =>
      isExtended && isCustomColor ? theme.spacing(0, 0, 0.4) : ''
  },
  containerOfIconsUtils: {
    padding: ({ isExtended, isCustomColor }: UseStylesOfCustomColorType) =>
      isExtended && isCustomColor ? theme.spacing(0, 1) : ''
  }
}));

export const colorColumnArr = [
  { colorName: 'deepOrange', id: '1' },
  { colorName: 'orange', id: '2' },
  { colorName: 'amber', id: '3' },
  { colorName: 'yellow', id: '4' },
  { colorName: 'lime', id: '5' },
  { colorName: 'lightGreen', id: '6' },
  { colorName: 'green', id: '7' },
  { colorName: 'teal', id: '8' },
  { colorName: 'cyan', id: '9' },
  { colorName: 'lightBlue', id: '10' },
  { colorName: 'blue', id: '11' },
  { colorName: 'indigo', id: '12' },
  { colorName: 'deepPurple', id: '13' },
  { colorName: 'purple', id: '14' },
  { colorName: 'pink', id: '15' },
  { colorName: 'red', id: '16' }
];

const CustomColor: FC<CustomColorPropsType> = ({ gradientStatus, setGradientStatus, handleSave, customColor }) => {
  const [, , , highEmphasisColor] = useThemeColors();
  const [copyState, copyToClipboardFunc] = useCopyToClipboard();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const nullityColor = colord(highEmphasisColor!).toRgb();
  const [color, setColor] = useState<RgbaColor | string>(nullityColor);
  const colorInHexFormat = colord(color).toHex();

  const [statusState, setStatusState] = useState({
    saved: false,
    extended: false,
    customization: false,
    customFormats: false,
    customColor: false,
    copy: false,
    colorPreview: true,
    pattern: false
  });
  const { extended: isExtended, customColor: isCustomColor } = statusState;

  const onClickOfPalletteButton = () => setStatusState(state => ({ ...state, customColor: !state.customColor }));

  const [customFormatName, setCustomFormatName] = useState<FormatType>(formats.RGB);

  const onClickOfGradientButton = () => setGradientStatus(true);
  const onClickOfExtendButton = () => setStatusState(state => ({ ...state, extended: !state.extended }));
  const onClickOfColorPreviewButton = () => setStatusState(state => ({ ...state, colorPreview: !state.colorPreview }));

  const onClickOfCopyButton = () => {
    setStatusState(state => ({ ...state, copy: true }));

    try {
      copyToClipboardFunc(colorInHexFormat);
      enqueueSnackbar({ message: 'Color was success copied' });
    } catch (error) {
      enqueueSnackbar({ message: 'Something went wrong', severity: 'error' });
    }
  };

  useEffect(() => {
    copyState.value !== colorInHexFormat && statusState.copy && setStatusState(state => ({ ...state, copy: false }));
  }, [color, statusState.copy]);

  const onClickCustomizationButton = () => setStatusState(state => ({ ...state, customization: !state.customization }));

  const handleSetColor: HandleSetColorType = value => setColor(value);

  const onSave = () => {
    handleSave(colorInHexFormat);
  };
  const inputsColorUtilsOfCustomColorPickerProps = {
    color,
    setColor,
    // focusOfPicker: statusState.focusOfPicker,
    // focusOfPicker: statusState.focusOfPicker,
    colorInHexFormat,
    customFormatName,
    // setFocusStatusOfPicker,
    // gradientStatus: statusState.gradient
    gradientStatus: false
  };
  const setCustomizationsStatusIsTrue = () => {
    setStatusState(state => ({ ...state, customization: true }));
  };
  const setCustomizationsStatusIsFalse = () => {
    setStatusState(state => ({ ...state, customization: false }));
  };
  const customizationButtonProps = {
    nullityColor,
    setCustomizationsStatusIsTrue,
    setCustomizationsStatusIsFalse,
    colorInHexFormat,
    color
  };

  const iconUtilsProps = {
    statusState,
    onSave,
    customizationButtonProps,
    color,
    onClickCustomizationButton,
    colorInHexFormat,
    setCustomFormatName,
    customFormatName,
    onClickOfGradientButton,
    onClickOfExtendButton,
    onClickOfPalletteButton,
    onClickOfColorPreviewButton,
    onClickOfCopyButton,
    customColor
  };

  const preparedColorExamplesProps = {
    isExtended,
    color,
    handleSetColor,
    customColor,
    columnArr: colorColumnArr
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

export default memo(CustomColor);
