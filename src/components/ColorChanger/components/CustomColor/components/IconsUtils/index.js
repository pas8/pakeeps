import PropTypes from 'prop-types';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';
import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import ColorFormatIcon from 'components/Icons/components/ColorFormatIcon';
import CustomizationButton from '../../../CustomizationButton';
import SelectColorFormat from '../SelectColorFormat';
import UnfoldLessOutlinedIcon from '@material-ui/icons/UnfoldLessOutlined';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import InvertColorsOffOutlinedIcon from '@material-ui/icons/InvertColorsOffOutlined';
import ExtensionOutlinedIcon from '@material-ui/icons/ExtensionOutlined';
import ExtensionIcon from '@material-ui/icons/Extension';
import { themeColors } from 'components/theme';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const IconUtilsOfColorPicker = ({
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
}) => {
  const ColorFormatMenuComponent = () => (
    <SelectColorFormat
      customFormatName={customFormatName}
      setCustomFormatName={setCustomFormatName}
      color={customColorsInHexFormat}
    />
  );

  const buttonUtilsArr = [
    {
      icon: !statusState.extended ? UnfoldMoreOutlinedIcon : UnfoldLessOutlinedIcon,
      popoverText: 'Extend more colors',
      name: 'extendMoreColors',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfExtendButton,
      hidden: false,
      customColor: statusState.extended
        ? statusState.colorPreview
          ? customColorsInHexFormat
          : themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal
        : null
    },

    {
      icon: ColorLensOutlinedIcon,
      popoverText: 'Add custom color',
      name: 'pallette',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfPalletteButton,
      customColor: statusState.customColor
        ? statusState.colorPreview
          ? customColorsInHexFormat
          : themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal
        : null
    },

    {
      icon: FilterVintageOutlinedIcon,
      popoverText: 'Gradient',
      name: 'changeGradientStatus',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfGradientButton,
      hidden: !statusState.customColor,
      customColor: statusState.gradient
        ? statusState.colorPreview
          ? customColorsInHexFormat
          : themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal
        : null
    },
    {
      icon: FileCopyOutlinedIcon,
      popoverText: 'Copy to clipboard',
      name: 'CopyToClipboard',
      activeIcon: false,
      onlyPopover: true,
      hidden: !statusState.gradient,
      onClick: onClickOfCopyButton,
      customColor: statusState.copy
        ? statusState.colorPreview
          ? customColorsInHexFormat
          : themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal
        : null
    },

    {
      icon: ExtensionIcon,
      popoverText: 'Chose color format which u like',
      name: 'choseColorFormatWhichULike',
      activeIcon: false,
      hidden: !statusState.customColor,
      customColor: statusState.customFormats
        ? statusState.colorPreview
          ? customColorsInHexFormat
          : themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal
        : null,
      menuComponents: ColorFormatMenuComponent,
      menuLocation: 'center'
    },

    {
      icon: InvertColorsOutlinedIcon,
      popoverText: 'Set preview color',
      name: 'colorPreview',
      activeIcon: false,
      // hidden: (!statusState.customColor && !statusState.extended) || (statusState.customColor && !statusState.extended) || statusState.gradient,
      hidden: !statusState.gradient,
      onlyPopover: true,
      onClick: onClickOfColorPreviewButton,
      customColor: statusState.colorPreview
        ? statusState.colorPreview
          ? customColorsInHexFormat
          : themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal
        : null
    },
    {
      hidden: statusState.gradient,
      customElementComponentOfIconGroup: <CustomizationButton {...customizationButtonProps} />
    },
    {
      icon: SaveRoundedIcon,
      popoverText: 'Save changes',
      name: 'save',
      activeIcon: false,
      onlyPopover: true,
      onClick: onSave,
      customColor: color ? customColorsInHexFormat : null
    }
  ];

  const wrapperOfPopoverAndMenuProps = {
    buttonUtilsArr,
    handlePopoverAndMenuState,
    popoverAndMenuState,
    iconSize: 'small'
  };
  return <WrapperOfPopoverAndMenu {...wrapperOfPopoverAndMenuProps} />;
};

IconUtilsOfColorPicker.propTypes = {
  color: PropTypes.object,
  customColorsInHexFormat: PropTypes.string,
  customColorsStatus: PropTypes.bool,
  customizationButtonProps: PropTypes.object,
  extendMoreColorsStatus: PropTypes.bool,
  handleCustomColorStatus: PropTypes.bool,
  handleCustomizationStatus: PropTypes.bool,
  handleExtendMoreColorsStatus: PropTypes.bool,
  handlePopoverAndMenuState: PropTypes.func,
  handleTransparencyColorPickerStatus: PropTypes.func,
  onSave: PropTypes.func,
  popoverAndMenuState: PropTypes.object,
  transparencyStatus: PropTypes.bool
};

export default IconUtilsOfColorPicker;
