import PropTypes from 'prop-types';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import ExtensionIcon from '@material-ui/icons/Extension';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import SelectColorFormat from 'components/ColorChanger/components/CustomColor/components/SelectColorFormat';

const ToggleButtonUtilsOfCustomGradient = ({
  onSave,
  customColorsInHexFormat,
  setCustomFormatName,
  customFormatName,
  onClickOfGradientButton,
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
      icon: ColorLensOutlinedIcon,
      popoverText: 'Add custom color',
      name: 'pallette',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfPalletteButton,
    },

    {
      icon: FilterVintageOutlinedIcon,
      popoverText: 'Gradient',
      name: 'changeGradientStatus',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfGradientButton,

    },
    {
      icon: FileCopyOutlinedIcon,
      popoverText: 'Copy to clipboard',
      name: 'CopyToClipboard',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfCopyButton,
    },

    {
      icon: ExtensionIcon,
      popoverText: 'Chose color format which u like',
      name: 'choseColorFormatWhichULike',
      activeIcon: false,
      menuComponents: ColorFormatMenuComponent,
      menuLocation: 'center'
    },

    {
      icon: InvertColorsOutlinedIcon,
      popoverText: 'Set preview color',
      name: 'colorPreview',
      activeIcon: false,
      onlyPopover: true,
      onClick: onClickOfColorPreviewButton,

    },

    {
      icon: SaveRoundedIcon,
      popoverText: 'Save changes',
      name: 'save',
      activeIcon: false,
      onlyPopover: true,
      onClick: onSave,
    }
  ];

  return <div>ToggleButtonUtilsOfCustomGradient</div>;
};

ToggleButtonUtilsOfCustomGradient.propTypes = {
  color: PropTypes.any,
  customColorsInHexFormat: PropTypes.any,
  customFormatName: PropTypes.any,
  customizationButtonProps: PropTypes.any,
  handlePopoverAndMenuState: PropTypes.any,
  onClickOfColorPreviewButton: PropTypes.any,
  onClickOfCopyButton: PropTypes.any,
  onClickOfExtendButton: PropTypes.any,
  onClickOfGradientButton: PropTypes.any,
  onClickOfPalletteButton: PropTypes.any,
  onSave: PropTypes.any,
  popoverAndMenuState: PropTypes.any,
  setCustomFormatName: PropTypes.any,
  statusState: PropTypes.any
}

export default ToggleButtonUtilsOfCustomGradient;
