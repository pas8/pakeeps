import { useEffect, useState } from 'react';
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
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { useSliced } from 'hooks/useSliced';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import _ from 'lodash';
import MoreUtils from './components/MoreUtils';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import LabelsList from './components/LabelsList';
import PinIcon from 'components/Icons/components/PinIcon';
import FormatColorFillOutlinedIcon from '@material-ui/icons/FormatColorFillOutlined';
import FormatColorTextOutlinedIcon from '@material-ui/icons/FormatColorTextOutlined';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArchiveIcon from '@material-ui/icons/Archive';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PinOutlinedIcon from 'components/Icons/components/PinOutlinedIcon';

const IconsUtils = ({
  isAllIconsIsShown = true,
  setEditTitleIsTrue,
  handleSetFavoritePakeep,
  changingTitle,
  isPinned,
  isFavorite,
  isInBookmark,
  labels,
  isCheckBoxes,
  handleSetBookmarkPakeep,
  handleSetColorPakeep,
  handleSetWidth,
  isNewPakeepContainerHaveFullWidth,
  widthOfContainer,
  labelsListProps,
  handleSetIsPinnedPakeep,
  labelBargeNumber,
  customColor,
  handleSetBackgroundColorPakeep,
  backgroundColor,
  handleSetIsCheckBoxesPakeep,
  isColorDefault,
  isBackgroundColorDefault,
  arrOfButtonNamesWhichSholudBeHidden = []
}) => {
  const handleClick = () => console.log('placeholder');
  const buttonUtilsNewPakeepArray = [
    {
      icon: CheckBoxOutlinedIcon,
      ActiveIcon: CheckBoxIcon,
      popoverText: 'Show a checkboxes',
      name: 'checkbox',
      onClick: handleSetIsCheckBoxesPakeep,
      isIconActive: isCheckBoxes
    },
    {
      icon: FormatColorFillOutlinedIcon,
      popoverText: 'Change backgroundColor',
      name: 'backgroundColor',
      isIconActive: !isBackgroundColorDefault,

      menuComponentsProps: { handleSave: handleSetBackgroundColorPakeep },
      menuComponents: ColorPickerByPas
    },
    {
      icon: FormatColorTextOutlinedIcon,
      popoverText: 'Change text color',
      name: 'textColor',
      isIconActive: !isColorDefault,

      menuComponentsProps: { handleSave: handleSetColorPakeep },
      menuComponents: ColorPickerByPas
    },

    {
      icon: ArchiveOutlinedIcon,
      popoverText: 'Archive pakeep',
      name: 'archive',
      onClick: handleClick,
      ActiveIcon: ArchiveIcon
    },
    {
      icon: EventAvailableOutlinedIcon,
      popoverText: 'Add date to pakeep',
      name: 'date',
      onClick: handleClick,
      ActiveIcon: EventAvailableIcon,

      menuComponents: AddDateToPakeep
    },
    {
      icon: WallpaperOutlinedIcon,
      popoverText: 'Add picture',
      name: 'picture',
      onClick: handleClick,
      ActiveIcon: InsertPhotoIcon
    },
    { icon: ShareOutlinedIcon, popoverText: 'Share', name: 'share', onClick: handleClick, ActiveIcon: ShareIcon },
    {
      icon: EditOutlinedIcon,
      popoverText: 'Edit title',
      name: 'edit',
      onClick: setEditTitleIsTrue,
      isIconActive: changingTitle,
      ActiveIcon: EditIcon
    },

    {
      icon: LabelOutlinedIcon,
      popoverText: 'Add labels',
      ActiveIcon: LabelIcon,
      name: 'labels',
      isIconActive: !!labels.length,
      menuComponents: LabelsList,
      badgeContent: labelBargeNumber,
      menuComponentsProps: { ...labelsListProps }
    },
    {
      icon: FavoriteBorderOutlinedIcon,
      popoverText: 'Add to favorites',
      name: 'favorite',
      onClick: handleSetFavoritePakeep,
      isIconActive: isFavorite,
      ActiveIcon: FavoriteIcon
    },
    {
      icon: BookmarkBorderOutlinedIcon,
      popoverText: 'Add to bookmark',
      name: 'bookmark',
      onClick: handleSetBookmarkPakeep,
      isIconActive: isInBookmark,
      ActiveIcon: BookmarkIcon
    },
    {
      icon: PinOutlinedIcon,
      ActiveIcon: PinIcon,
      popoverText: 'Pin pakeep',
      name: 'pinned',
      onClick: handleSetIsPinnedPakeep,
      isIconActive: isPinned
    },
    {
      icon: !isNewPakeepContainerHaveFullWidth ? UnfoldMoreOutlinedIcon : UnfoldLessOutlinedIcon,
      popoverText: !isNewPakeepContainerHaveFullWidth ? 'To full width' : 'To smaller width',
      name: 'width',
      onClick: handleSetWidth,
      isIconActive: isNewPakeepContainerHaveFullWidth,
      rotateDeg: 90
    }
  ];

  // useEffect(() => setPopoverAndMenuState(nullityOfPopoverAndMenuState), [color]);

  const [slicedArr, isShouldBeSliced, handleConcatAverageWidth] = useSliced(
    widthOfContainer,
    buttonUtilsNewPakeepArray
  );
  const defaultWrapperOfPopoverAndMenuProps = { arrOfButtonNamesWhichSholudBeHidden, customColor };

  const nonSlicedwrapperOfPopoverAndMenuProps = {
    buttonUtilsArr: buttonUtilsNewPakeepArray,
    handleAverageMainComponentWidth: handleConcatAverageWidth
  };

  const buttonMoreOfItemOfArrWhichWasSliced = {
    icon: PlayCircleOutlineOutlinedIcon,
    rotateDeg: 90,
    hidden: slicedArr?.after?.length === 0 ? true : false,
    popoverText: 'Open more utils',
    name: 'moreUtils',
    onClick: handleClick,
    menuComponents: MoreUtils,
    menuComponentsProps: { slicedArrAfter: slicedArr.after }
  };

  const buttonUtilsSlicedAndConcatedWithMoreButtonArr = _.concat(slicedArr.before, buttonMoreOfItemOfArrWhichWasSliced);
  const slicedWrapperOfPopoverAndMenuProps = { buttonUtilsArr: buttonUtilsSlicedAndConcatedWithMoreButtonArr };

  const wrapperOfPopoverAndMenuProps = isShouldBeSliced
    ? slicedWrapperOfPopoverAndMenuProps
    : nonSlicedwrapperOfPopoverAndMenuProps;

  const allWrapperOfPopoverAndMenuProps = { ...defaultWrapperOfPopoverAndMenuProps, ...wrapperOfPopoverAndMenuProps };

  // console.log(isShouldBeSliced)
  return (
    <Grid container display={'flex'} wrap={'nowrap'} justify={isAllIconsIsShown ? 'flex-start' : 'space-between'}>
      <WrapperOfPopoverAndMenu {...allWrapperOfPopoverAndMenuProps} />
    </Grid>
  );
};

IconsUtils.propTypes = {
  backgroundColor: PropTypes.any,
  customColor: PropTypes.any,
  handleNewPakeepSave: PropTypes.func,
  handleSetBackgroundColorPakeep: PropTypes.func,
  handleSetBookmarkPakeep: PropTypes.func,
  handleSetColorPakeep: PropTypes.func,
  handleSetFavoritePakeep: PropTypes.func,
  handleSetIsCheckBoxesPakeep: PropTypes.func,
  handleSetIsPinnedPakeep: PropTypes.func,
  handleSetWidth: PropTypes.func,
  isAllIconsIsShown: PropTypes.bool,
  isBackgroundColorDefault: PropTypes.bool,
  isCheckBoxes: PropTypes.bool,
  isColorDefault: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isInBookmark: PropTypes.bool,
  isNewPakeepContainerHaveFullWidth: PropTypes.bool,
  isPinned: PropTypes.bool,
  labelBargeNumber: PropTypes.number,
  labels: PropTypes.shape({
    length: PropTypes.any
  }),
  labelsListProps: PropTypes.any,
  open: PropTypes.bool,
  setEditTitleIsTrue: PropTypes.func,
  sliceArrayTo: PropTypes.number,
  widthOfContainer: PropTypes.any
};

export default IconsUtils;
