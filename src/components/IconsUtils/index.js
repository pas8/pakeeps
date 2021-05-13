import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined'; //! to change icon
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import UnfoldLessOutlinedIcon from '@material-ui/icons/UnfoldLessOutlined';
import AddDateToPakeep from './components/AddDateToPakeep';
import ColorPickerByPas from 'components/ColorChanger';
import WrapperOfPopoverAndMenu from './components/WrapperOfPopoverAndMenu';
import { useSliced } from 'hooks/useSliced';

const useStyles = makeStyles(theme => ({
  popover: { padding: theme.spacing(0.4, 0.8) },
  container: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 8 },
  moreIcon: { margin: theme.spacing(0.4, 1.4, 0, -0.8) }
}));

const IconsUtils = ({
  isAllIconsIsShown = true,
  sliceArrayTo = 4,
  setEditTitleIsTrue,
  favorite = true,
  handleSetFavoritePakeep,
  changingTitle,
  bookmark,
  labels,
  checkbox,
  handleSetBookmarkPakeep,
  handleSetColorPakeep,
  handleSetWidth,
  fullWidthStatus = false,
  id,
  widthOfContainer
}) => {
  const classes = useStyles();

  const handleClick = () => console.log('placeholder');
  const buttonUtilsNewPakeepArray = [
    {
      icon: CheckBoxOutlinedIcon,
      popoverText: 'Show a checkboxes',
      name: 'checkbox',
      onClick: handleClick,
      activeIcon: checkbox,
      onlyPopover: true
    },
    {
      icon: PaletteOutlinedIcon,
      popoverText: 'Change backgroundColor',
      name: 'palette',
      // onClick: handleSetColorPakeep,
      menuComponents: ColorPickerByPas
    },
    {
      icon: ArchiveOutlinedIcon,
      popoverText: 'Archive pakeep',
      name: 'archive',
      onClick: handleClick,
      onlyPopover: true
    },
    {
      icon: EventAvailableOutlinedIcon,
      popoverText: 'Add date to pakeep',
      name: 'date',
      onClick: handleClick,
      menuComponents: AddDateToPakeep
    },
    { icon: WallpaperOutlinedIcon, popoverText: 'Add picture', name: 'picture', onClick: handleClick },
    { icon: ShareOutlinedIcon, popoverText: 'Share', name: 'share', onClick: handleClick },
    {
      icon: EditOutlinedIcon,
      popoverText: 'Edit title',
      name: 'edit',
      onClick: setEditTitleIsTrue,
      activeIcon: changingTitle,
      onlyPopover: true
    },

    {
      icon: LabelOutlinedIcon,
      popoverText: 'Add labels',
      name: 'labels',
      onClick: setEditTitleIsTrue,
      activeIcon: labels
    },
    {
      icon: FavoriteBorderOutlinedIcon,
      popoverText: 'Add to favorites',
      name: 'favorite',
      onClick: handleSetFavoritePakeep,
      activeIcon: favorite
    },
    {
      icon: BookmarksOutlinedIcon,
      popoverText: 'Add to bookmark',
      name: 'bookmark',
      onClick: handleSetBookmarkPakeep,
      activeIcon: bookmark
    },
    {
      icon: !fullWidthStatus ? UnfoldMoreOutlinedIcon : UnfoldLessOutlinedIcon,
      popoverText: 'To full width',
      name: 'width',
      onClick: handleSetWidth,
      activeIcon: fullWidthStatus,
      rotateDeg: 90
    }
  ];

  const [popoverAndMenuState, setPopoverAndMenuState] = useState({
    name: 'null',
    menuIsOpen: false,
    popoverIsOpen: true,
    onMenuClose: null
  });

  const handlePopoverAndMenuState = value => setPopoverAndMenuState(value);

  const [slicedArr, isShouldBeSliced, handleConcatAverageWidth] = useSliced(
    widthOfContainer,
    buttonUtilsNewPakeepArray
  );
  console.log(buttonUtilsNewPakeepArray, slicedArr, isShouldBeSliced);

  const nonSlicedwrapperOfPopoverAndMenuProps = {
    buttonUtilsArr: buttonUtilsNewPakeepArray,
    handlePopoverAndMenuState,
    popoverAndMenuState,
    handleAverageMainComponentWidth: handleConcatAverageWidth
  };

  const buttonMoreOfItemOfArrWhichWasSliced = {
    icon: EventAvailableOutlinedIcon,
    popoverText: 'Add date to pakeep',
    name: 'date',
    onClick: handleClick,
    menuComponents: AddDateToPakeep,
    // menuComponentsProps
  };

  const buttonUtilsSlicedAndConcatedWithMoreButtonArr = _.concat(slicedArr, buttonMoreOfItemOfArrWhichWasSliced);

  const slicedWrapperOfPopoverAndMenuProps = {
    buttonUtilsArr: buttonUtilsSlicedAndConcatedWithMoreButtonArr,
    handlePopoverAndMenuState,
    popoverAndMenuState,
  };

  const wrapperOfPopoverAndMenuProps = isShouldBeSliced
    ? slicedWrapperOfPopoverAndMenuProps
    : nonSlicedwrapperOfPopoverAndMenuProps;

  return (
    <Grid container display={'flex'} wrap={'nowrap'} justify={isAllIconsIsShown ? 'flex-start' : 'space-between'}>
      <WrapperOfPopoverAndMenu {...wrapperOfPopoverAndMenuProps} />
    </Grid>
  );
};

IconsUtils.propTypes = {
  bookmark: PropTypes.any,
  changingTitle: PropTypes.any,
  checkbox: PropTypes.any,
  favorite: PropTypes.bool,
  handleNewPakeepSave: PropTypes.func,
  handleSetBookmarkPakeep: PropTypes.any,
  handleSetColorPakeep: PropTypes.any,
  handleSetFavoritePakeep: PropTypes.func,
  isAllIconsIsShown: PropTypes.bool,
  sliceArrayTo: PropTypes.number,
  labels: PropTypes.any,
  open: PropTypes.bool,
  setEditTitleIsTrue: PropTypes.func
};

export default IconsUtils;
