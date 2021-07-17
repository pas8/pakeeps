import PropTypes from 'prop-types';
import { FC, useState } from 'react';
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
import { IconUtilsOfCustomColorPropsType } from './types';
import { iconsUtilsArrDenotation } from './denotation';

const IconUtilsOfCustomColor: FC<IconUtilsOfCustomColorPropsType> = ({
  statusState,
  onSave,
  customizationButtonProps,
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

  // const customColor = statusState.colorPreview ? colorInHexFormat : whiteColor;

  const buttonUtilsArr = [
    {
      ...iconsUtilsArrDenotation.EXTEND_MORE_COLORS,
      icon: !statusState.extended ? UnfoldMoreOutlinedIcon : UnfoldLessOutlinedIcon,
      isIconActive: false,
      onlyPopover: true,
      onClick: onClickOfExtendButton,
      hidden: false

      // customColor: statusState.extended && customColor
    },

    {
      ...iconsUtilsArrDenotation.PALETTE,

      icon: ColorLensOutlinedIcon,
      isIconActive: false,
      onlyPopover: true,
      onClick: onClickOfPalletteButton
      // customColor: statusState.customColor && customColor
    },
    {
      ...iconsUtilsArrDenotation.CHANGE_GRADIENT_STATUS,

      icon: FilterVintageOutlinedIcon,
      isIconActive: false,
      onlyPopover: true,
      onClick: onClickOfGradientButton,
      hidden: !statusState.customColor
      // customColor: statusState.gradient && customColor
    },
    {
      ...iconsUtilsArrDenotation.COPY_TO_CLIPBOARD,

      icon: LibraryAddOutlinedIcon,
      isIconActive: false,
      onlyPopover: true,
      hidden: !statusState.extended || !statusState.customColor,
      onClick: onClickOfCopyButton,
      // customColor: statusState.copy && customColor,
      rotateDeg: 90
    },
    {
      ...iconsUtilsArrDenotation.PREVIEW_COLOR_STATUS,
      icon: !statusState.colorPreview ? InvertColorsOutlinedIcon : InvertColorsOffOutlinedIcon,
      isIconActive: false,
      onlyPopover: true,
      hidden: !statusState.extended || !statusState.customColor,
      onClick: onClickOfColorPreviewButton
      // customColor: statusState.colorPreview && customColor
    },
    {
      ...iconsUtilsArrDenotation.ADD_COLOR_TO_COLOR_PATTERN,
      icon: AddBoxOutlinedIcon,
      isIconActive: false,
      hidden: !statusState.customColor,
      // customColor: statusState.pattern && customColor,
      menuLocation: 'center'
    },
    {
      ...iconsUtilsArrDenotation.CHOSE_COLOR_FORMAT_WHICH_U_LIKE,
      icon: ExtensionIcon,
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
      ...iconsUtilsArrDenotation.CUSTOMIZATION_ICON_BUTTON,
      icon: SettingsInputComponentOutlinedIcon,
      isIconActive: false,
      onlyPopover: true,
      hidden: !statusState.customColor,
      onClick: onClickCustomizationButton
      // customColor: statusState.customization && customColor
    },
    {
      ...iconsUtilsArrDenotation.SAVE,
      icon: SaveRoundedIcon,
      isIconActive: false,
      onlyPopover: true,
      onClick: onSave
      // customColor: statusState.save && customColor
    }
  ];

  const wrapperOfPopoverAndMenuProps = {
    buttonUtilsArr,
    customColor,
    isCustomColorReversed: true,
    iconSize: 'small'
  };
  //@ts-ignore
  return <WrapperOfPopoverAndMenu {...wrapperOfPopoverAndMenuProps} />;
};

export default IconUtilsOfCustomColor;
