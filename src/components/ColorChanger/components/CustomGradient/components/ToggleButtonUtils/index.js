import PropTypes from 'prop-types';
import { useState } from 'react';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';
import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import ColorFormatIcon from 'components/Icons/components/ColorFormatIcon';
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
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Grid, makeStyles } from '@material-ui/core';
import _ from 'lodash';
import { nanoid } from 'nanoid';

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',

    '& button': {
      flex: 1,
      borderRadius: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      '&:last-child': {
        borderBottom: 0
      },
      '&:first-child': {
        borderTop: 0
      },
    },
    

  }
}));

const ToggleButtonUtilsOfCustomGradient = ({
  statusState,
  setStatusState,
  colorInHexFormat,
  setCustomFormatName,
  customFormatName,
  onClickOfGradientButton,
  onClickOfColorPreviewButton,
  onClickOfCopyButton,
  onClickOfSaveButton,
  onClickOfColorFormatButton,
  onClickOfAddToPatternButton,
  onClickOfCustomizationButton
}) => {
  // const ColorFormatMenuComponent = () => (
  //   <SectColorFormat
  //     customFormatName={customFormatName}
  //     setCustomFormatName={setCustomFormatName}
  //     color={colorInHexFormat}
  //   />
  // );

  const toggleButtonUtilsArr = [
    {
      icon: FilterVintageOutlinedIcon,
      popoverText: 'Gradient',
      value: 'changeGradientStatus',
      active: false,
      onlyPopover: true,
      onClick: onClickOfGradientButton
    },
    {
      icon: LibraryAddOutlinedIcon,
      popoverText: 'Copy to clipboard',
      value: 'copyToClipboard',
      onClick: onClickOfCopyButton,
      rotateDeg: 90,
      active: false
    },
    {
      icon: InvertColorsOutlinedIcon,
      popoverText: 'Preview color status',
      value: 'previewColorStatus',
      active: false,
      onClick: onClickOfColorPreviewButton
    },
    {
      icon: AddBoxOutlinedIcon,
      popoverText: 'Add this color to your color pattern',
      value: 'addColorToColorPattern',
      activeIcon: false,
      onClick: onClickOfAddToPatternButton
    },
    {
      icon: ExtensionIcon,
      popoverText: 'Chose color format which u like',
      value: 'choseColorFormatWhichULike',
      activeIcon: false,
      onClick: onClickOfColorFormatButton
    },
    {
      icon: SettingsInputComponentOutlinedIcon,
      popoverText: 'Customization',
      value: 'customizationIconButton',
      active: false,
      onClick: onClickOfCustomizationButton
    },
    {
      icon: SaveRoundedIcon,
      popoverText: 'Save changes',
      value: 'save',
      active: false,
      onlyPopover: true,
      onClick: onClickOfSaveButton
    }
  ];

  const classes = useStyles();
  const [state, setState] = useState(['save']);

  const handleChange = (placeholder, value) => {
    console.log(_);
    setState(value);
    // setStatusState(state => ({ ...state, [value]: !state[value] }));
  };

  return (
    <ToggleButtonGroup orientation={'vertical'} value={state} onChange={handleChange} className={classes.container} size={'large'}>
      {toggleButtonUtilsArr.map(({ icon: Icon, value }) => {
        return (
          <ToggleButton value={value} aria-label={value} key={nanoid()}>
            <Icon />
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

ToggleButtonUtilsOfCustomGradient.propTypes = {
  color: PropTypes.any,
  colorInHexFormat: PropTypes.any,
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
};

export default ToggleButtonUtilsOfCustomGradient;
