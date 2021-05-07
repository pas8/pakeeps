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
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';;
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import { useState } from 'react'

const IconUtilsOfCustomColor = ({
  statusState,
  onSave,
  customizationButtonProps,
  color,
  setCustomFormatName,
  customFormatName,
  customColorsInHexFormat,
  onClickOfGradientButton,
  onClickOfExtendButton,
  onClickOfPalletteButton,
  onClickOfColorPreviewButton,
  onClickOfCopyButton
}) => {
  const [popoverAndMenuState, setPopoverAndMenuState] = useState({
    name: 'null',
    menuIsOpen: false,
    popoverIsOpen: true,
    onMenuClose: null
  });

  const handlePopoverAndMenuState = value => setPopoverAndMenuState(value);

  const ColorFormatMenuComponent = () => (
    <SelectColorFormat
      customFormatName={customFormatName}
      setCustomFormatName={setCustomFormatName}
      color={customColorsInHexFormat}
    />
  );

  const whiteColor = themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal;
  const customColor = statusState.colorPreview ? customColorsInHexFormat : whiteColor;
  
  const buttonUtilsArr = [
    {
      icon: !statusState.extended ? UnfoldMoreOutlinedIcon : UnfoldLessOutlinedIcon,
      popoverText: 'Extend more colors',
      name: 'extendMoreColors',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfExtendButton,
      hidden: false,
      customColor: statusState.extended && customColor
    },

    {
      icon: ColorLensOutlinedIcon,
      popoverText: 'Add custom color',
      name: 'pallette',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfPalletteButton,
      customColor: statusState.customColor && customColor
    },

    {
      icon: FilterVintageOutlinedIcon,
      popoverText: 'Gradient',
      name: 'changeGradientStatus',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfGradientButton,
      hidden: !statusState.customColor,
      customColor: statusState.gradient && customColor
    },
    {
      icon:!statusState.copy ? LibraryAddOutlinedIcon : LibraryAddCheckOutlinedIcon,
      popoverText: 'Copy to clipboard',
      name: 'CopyToClipboard',
      activeIcon: false,
      onlyPopover: true,
      hidden: !statusState.customColor,
      onClick: onClickOfCopyButton,
      customColor: statusState.copy && customColor,
      rotateDeg:90
    },

    {
      icon: ExtensionIcon,
      popoverText: 'Chose color format which u like',
      name: 'choseColorFormatWhichULike',
      activeIcon: false,
      hidden: !statusState.extended || !statusState.customColor,
      customColor: statusState.customFormats && customColor,
      menuComponents: ColorFormatMenuComponent,
      menuLocation: 'center'
    },
    {
      hidden: statusState.customColor,
      customElementComponentOfIconGroup: <CustomizationButton {...customizationButtonProps} />
    },
    {
      icon: SaveRoundedIcon,
      popoverText: 'Save changes',
      name: 'save',
      activeIcon: false,
      onlyPopover: true,
      onClick: onSave,
      customColor: statusState.save && customColor
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

IconUtilsOfCustomColor.propTypes = {
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

export default IconUtilsOfCustomColor;
