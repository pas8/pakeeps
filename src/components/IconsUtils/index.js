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

const IconsUtils = ({
  isAllIconsIsShown = true,
  setEditTitleIsTrue,
  handleSetFavoritePakeep,
  changingTitle,
  isPinned,
  isFavorite,
  isInBookmark,
  labels,
  color,
  checkbox,
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
  backgroundColor
}) => {

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
      icon: FormatColorFillOutlinedIcon,
      popoverText: 'Change backgroundColor',
      name: 'backgroundColor',
      activeIcon: !!backgroundColor,

      menuComponentsProps: { handleSave: handleSetBackgroundColorPakeep },
      menuComponents: ColorPickerByPas
    },
    {
      icon: FormatColorTextOutlinedIcon,
      popoverText: 'Change text color',
      name: 'textColor',
      activeIcon: !!color,

      menuComponentsProps: { handleSave: handleSetColorPakeep },
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
      activeIcon: !!labels.length,
      menuComponents: LabelsList,
      badgeContent: labelBargeNumber,
      menuComponentsProps: { ...labelsListProps }
    },
    {
      icon: FavoriteBorderOutlinedIcon,
      popoverText: 'Add to favorites',
      name: 'favorite',
      onClick: handleSetFavoritePakeep,
      activeIcon: isFavorite,
      onlyPopover: true
    },
    {
      icon: BookmarksOutlinedIcon,
      popoverText: 'Add to bookmark',
      name: 'bookmark',
      onClick: handleSetBookmarkPakeep,
      activeIcon: isInBookmark,
      onlyPopover: true
    },
    {
      icon: PinIcon,
      popoverText: 'Pin pakeep',
      name: 'pinned',
      onClick: handleSetIsPinnedPakeep,
      activeIcon: isPinned,
      onlyPopover: true
    },
    {
      icon: !isNewPakeepContainerHaveFullWidth ? UnfoldMoreOutlinedIcon : UnfoldLessOutlinedIcon,
      popoverText: !isNewPakeepContainerHaveFullWidth ? 'To full width' : 'To smaller width',
      name: 'width',
      onClick: handleSetWidth,
      activeIcon: isNewPakeepContainerHaveFullWidth,
      rotateDeg: 90,
      onlyPopover: true
    }
  ];
  const nullityOfPopoverAndMenuState = {
    name: 'null',
    menuIsOpen: false,
    popoverIsOpen: true,
    onMenuClose: null
  };
  const [popoverAndMenuState, setPopoverAndMenuState] = useState(nullityOfPopoverAndMenuState);
  // useEffect(() => setPopoverAndMenuState(nullityOfPopoverAndMenuState), [color]);

  const handlePopoverAndMenuState = value => setPopoverAndMenuState(value);

  const [slicedArr, isShouldBeSliced, handleConcatAverageWidth] = useSliced(
    widthOfContainer,
    buttonUtilsNewPakeepArray
  );

  const nonSlicedwrapperOfPopoverAndMenuProps = {
    buttonUtilsArr: buttonUtilsNewPakeepArray,
    handlePopoverAndMenuState,
    popoverAndMenuState,
    handleAverageMainComponentWidth: handleConcatAverageWidth,
    customColor
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
  const slicedWrapperOfPopoverAndMenuProps = {
    buttonUtilsArr: buttonUtilsSlicedAndConcatedWithMoreButtonArr,
    handlePopoverAndMenuState,
    popoverAndMenuState,
    customColor
  };

  const wrapperOfPopoverAndMenuProps = isShouldBeSliced
    ? slicedWrapperOfPopoverAndMenuProps
    : nonSlicedwrapperOfPopoverAndMenuProps;
  // console.log(isShouldBeSliced)
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
