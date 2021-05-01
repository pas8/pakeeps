import PropTypes from 'prop-types';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';
import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import ColorFormatIcon from 'components/Icons/components/ColorFormatIcon';
import CustomizationButton from '../CustomizationButton';

const IconUtilsOfColorPicker = ({
  handleCustomColorStatus,
  handleCustomizationStatus,
  handleExtendMoreColorsStatus,
  handleTransparencyColorPickerStatus,
  handlePopoverAndMenuState,
  onSave,
  customColorsStatus,
  customizationButtonProps,
  transparencyStatus,
  extendMoreColorsStatus,
  color,
  customColorsInHexFormat,
  popoverAndMenuState
}) => {
  const buttonUtilsArr = [
    {
      icon: FilterVintageOutlinedIcon,
      popoverText: 'Gradient',
      name: 'changeGradientStatus',
      activeIcon: false,
      onlyPopover: true,
      onClick: handleTransparencyColorPickerStatus,
      hidden: !customColorsStatus,
      customColor: transparencyStatus ? customColorsInHexFormat : null
    },
    {
      icon: TextureOutlinedIcon,
      popoverText: 'Change transparency Status',
      name: 'changeTransparencyStatus',
      activeIcon: false,
      onlyPopover: true,
      onClick: handleTransparencyColorPickerStatus,
      hidden: !customColorsStatus,
      customColor: transparencyStatus ? customColorsInHexFormat : null
    },
    {
      icon: ColorFormatIcon,
      popoverText: 'Chose color format which u like',
      name: 'choseColorFormatWhichULike',
      activeIcon: false,
      hidden: !customColorsStatus,
      customColor: transparencyStatus ? customColorsInHexFormat : null,
      // menuComponents: <div>Tst</div>
    },
    {
      icon: UnfoldMoreOutlinedIcon,
      popoverText: 'Extend more colors',
      name: 'extendMoreColors',
      activeIcon: false,
      onlyPopover: true,
      onClick: handleExtendMoreColorsStatus,
      hidden: customColorsStatus,
      customColor: extendMoreColorsStatus ? customColorsInHexFormat : null
    },

    {
      icon: ColorLensOutlinedIcon,
      popoverText: 'Add custom color',
      name: 'pattern',
      activeIcon: false,
      onlyPopover: true,
      onClick: handleCustomColorStatus,
      customColor: customColorsStatus ? customColorsInHexFormat : null
    },
    {
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
