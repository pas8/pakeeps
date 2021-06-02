import PropTypes from 'prop-types';
import { useState } from 'react';
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
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import SettingsInputComponentOutlinedIcon from '@material-ui/icons/SettingsInputComponentOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { themeColors } from 'components/theme';

const IconUtilsOfCustomColor = ({
  statusState,
  onSave,
  customizationButtonProps,
  color,
  setCustomFormatName,
  customFormatName,
  colorInHexFormat,
  onClickOfGradientButton,
  onClickOfExtendButton,
  onClickOfPalletteButton,
  onClickOfColorPreviewButton,
  onClickOfCopyButton,
  onClickCustomizationButton,
  customColor
}) => {
  const ColorFormatMenuComponent = () => (
    <SelectColorFormat
      customFormatName={customFormatName}
      setCustomFormatName={setCustomFormatName}
      color={colorInHexFormat}
    />
  );

  const whiteColor = themeColors.maxEmphasis;
  // const customColor = statusState.colorPreview ? colorInHexFormat : whiteColor;

  const buttonUtilsArr = [
    {
      icon: !statusState.extended ? UnfoldMoreOutlinedIcon : UnfoldLessOutlinedIcon,
      popoverText: 'Extend more colors',
      name: 'extendMoreColors',
      isIconActive: false,
      onlyPopover: true,
      onClick: onClickOfExtendButton,
      hidden: false
      // customColor: statusState.extended && customColor
    },

    {
      icon: ColorLensOutlinedIcon,
      popoverText: 'Add custom color',
      name: 'pallette',
      isIconActive: false,
      onlyPopover: true,
      onClick: onClickOfPalletteButton
      // customColor: statusState.customColor && customColor
    },
    {
      icon: FilterVintageOutlinedIcon,
      popoverText: 'Gradient',
      name: 'changeGradientStatus',
      isIconActive: false,
      onlyPopover: true,
      onClick: onClickOfGradientButton,
      hidden: !statusState.customColor
      // customColor: statusState.gradient && customColor
    },
    {
      icon: LibraryAddOutlinedIcon,
      popoverText: 'Copy to clipboard',
      name: 'copyToClipboard',
      isIconActive: false,
      onlyPopover: true,
      hidden: !statusState.extended || !statusState.customColor,
      onClick: onClickOfCopyButton,
      // customColor: statusState.copy && customColor,
      rotateDeg: 90
    },
    {
      icon: !statusState.colorPreview ? InvertColorsOutlinedIcon : InvertColorsOffOutlinedIcon,
      popoverText: 'Preview color status',
      name: 'previewColorStatus',
      isIconActive: false,
      onlyPopover: true,
      hidden: !statusState.extended || !statusState.customColor,
      onClick: onClickOfColorPreviewButton
      // customColor: statusState.colorPreview && customColor
    },
    {
      icon: AddBoxOutlinedIcon,
      popoverText: 'Add this color to your color pattern',
      name: 'addColorToColorPattern',
      isIconActive: false,
      hidden: !statusState.customColor,
      // customColor: statusState.pattern && customColor,
      menuLocation: 'center'
    },
    {
      icon: ExtensionIcon,
      popoverText: 'Chose color format which u like',
      name: 'choseColorFormatWhichULike',
      isIconActive: false,
      hidden: !statusState.extended || !statusState.customColor,
      // customColor: statusState.customFormats && customColor,
      menuComponents: ColorFormatMenuComponent,
      menuLocation: 'center'
    },
    {
      hidden: statusState.customColor,
      customElementComponentOfIconGroup: <CustomizationButton {...customizationButtonProps} customColor={customColor} />
    },

    {
      icon: SettingsInputComponentOutlinedIcon,
      popoverText: 'Customization',
      name: 'customizationIconButton',
      isIconActive: false,
      onlyPopover: true,
      hidden: !statusState.customColor,
      onClick: onClickCustomizationButton
      // customColor: statusState.customization && customColor
    },
    {
      icon: SaveRoundedIcon,
      popoverText: 'Save changes',
      name: 'save',
      isIconActive: false,
      onlyPopover: true,
      onClick: onSave
      // customColor: statusState.save && customColor
    }
  ];


  const wrapperOfPopoverAndMenuProps = {
    buttonUtilsArr,
    customColor,
    isCustomColorReversed:true,
    iconSize: 'small'
  };
  return <WrapperOfPopoverAndMenu {...wrapperOfPopoverAndMenuProps} />;
};

IconUtilsOfCustomColor.propTypes = {
  color: PropTypes.object,
  colorInHexFormat: PropTypes.string,
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

export default IconUtilsOfCustomColor;
