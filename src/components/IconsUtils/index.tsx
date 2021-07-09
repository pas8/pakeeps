import { FC, memo } from 'react';
import { Grid } from '@material-ui/core';
import _, { concat, filter, includes, reverse } from 'lodash';
//3-party-lib----------------------------------------------------------------------
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import UnfoldLessOutlinedIcon from '@material-ui/icons/UnfoldLessOutlined';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
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
//materia-ui-icons--------------------------------------------------------------------------------
import { useSliced } from 'hooks/useSliced';
import PinIcon from 'components/Icons/components/PinIcon';
import ColorPickerByPas from 'components/ColorChanger';
//--------------------------------------------------------------------------------
import WrapperOfPopoverAndMenu from './components/WrapperOfPopoverAndMenu';
import LabelsList from './components/LabelsList';
import MoreUtils from './components/MoreUtils';
import PinOutlinedIcon from 'components/Icons/components/PinOutlinedIcon';
import WrapperOfAddDateToPakeep from './components/WrapperOfAddDateToPakeep';
import { IconsUtilsArrDenotationNameType, IconsUtilsArrType, IconsUtilsPropsType } from './types';
import { iconsUtilsArrDenotation } from './denotation';

const IconsUtils: FC<IconsUtilsPropsType> = ({
  isAllIconsIsShown = true,
  handleSetEditTitleIsTrue,
  handleSetFavoritePakeep,
  isChangingTitle,
  isPinned,
  isFavorite,
  isInBookmark,
  id,
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
  arrOfButtonNamesWhichSholudBeHidden = [],
  isUtilsReversed,
  eventsListProps,
  events = [],
  isEditingUtilsHidden = true,
  handleRedo,
  handleUndo,
  handleSetArhivedPakeep
}) => {

  const namesOfEditingUtils = isEditingUtilsHidden
    ? [iconsUtilsArrDenotation.CHECKBOX.name, iconsUtilsArrDenotation.UNDO.name, iconsUtilsArrDenotation.REDO.name]
    : [];

  const iconsUtilsArr: IconsUtilsArrType = [
    {
      icon: CheckBoxOutlinedIcon,
      ActiveIcon: CheckBoxIcon,
      onClick: handleSetIsCheckBoxesPakeep,
      isIconActive: isCheckBoxes,
      ...iconsUtilsArrDenotation.CHECKBOX
      // hidden: isEditingUtilsHidden
    },
    {
      icon: FormatColorFillOutlinedIcon,
      isIconActive: !isBackgroundColorDefault,
      menuComponentsProps: { handleSave: handleSetBackgroundColorPakeep },
      menuComponents: ColorPickerByPas,
      ...iconsUtilsArrDenotation.BACKGROUND_COLOR
    },
    {
      icon: FormatColorTextOutlinedIcon,
      isIconActive: !isColorDefault,
      menuComponentsProps: { handleSave: handleSetColorPakeep },
      menuComponents: ColorPickerByPas,

      ...iconsUtilsArrDenotation.TEXT_COLOR
    },
    {
      icon: UndoOutlinedIcon,
      isIconActive: false,
      onClick: handleUndo,
      // hidden: isEditingUtilsHidden,
      ...iconsUtilsArrDenotation.UNDO
    },
    {
      icon: RedoOutlinedIcon,
      isIconActive: false,
      // hidden: isEditingUtilsHidden,
      onClick: handleRedo,

      ...iconsUtilsArrDenotation.REDO
    },

    {
      ...iconsUtilsArrDenotation.LABELS,
      icon: LabelOutlinedIcon,
      ActiveIcon: LabelIcon,
      isIconActive: !!labels?.length,
      menuComponents: LabelsList,
      badgeContent: labelBargeNumber,
      menuComponentsProps: { ...labelsListProps, customColor }
    },
    {
      icon: EventAvailableOutlinedIcon,
      // onClick: handleClick,
      ActiveIcon: EventAvailableIcon,
      isIconActive: !!events?.length,
      menuComponentsProps: {...eventsListProps, id ,},
      menuComponents: WrapperOfAddDateToPakeep,
      ...iconsUtilsArrDenotation.EVENT
    },

    {
      ...iconsUtilsArrDenotation.PICTURE,
      icon: WallpaperOutlinedIcon,
      // onClick: handleClick,
      ActiveIcon: InsertPhotoIcon
    },
    {
      icon: ArchiveOutlinedIcon,
      onClick: handleSetArhivedPakeep,
      ActiveIcon: ArchiveIcon,
      ...iconsUtilsArrDenotation.ARCHIVE
    },

    // {
    //   ...iconsUtilsArrDenotation.EDIT,
    //   icon: EditOutlinedIcon,
    //   onClick: handleSetEditTitleIsTrue,
    //   isIconActive: isChangingTitle,
    //   ActiveIcon: EditIcon
    // },

    {
      ...iconsUtilsArrDenotation.FAVORITE,
      icon: FavoriteBorderOutlinedIcon,
      onClick: handleSetFavoritePakeep,
      isIconActive: isFavorite,
      ActiveIcon: FavoriteIcon
    },
    {
      ...iconsUtilsArrDenotation.BOOKMARK,
      icon: BookmarkBorderOutlinedIcon,
      onClick: handleSetBookmarkPakeep,
      isIconActive: isInBookmark,
      ActiveIcon: BookmarkIcon
    },
    {
      ...iconsUtilsArrDenotation.PINNED,
      icon: PinOutlinedIcon,
      ActiveIcon: PinIcon,
      onClick: handleSetIsPinnedPakeep,
      isIconActive: isPinned
    },
    {
      ...iconsUtilsArrDenotation.WIDTH,
      icon: UnfoldMoreOutlinedIcon,
      onClick: handleSetWidth,
      isIconActive: isNewPakeepContainerHaveFullWidth,
      rotateDeg: 90,
      ActiveIcon: UnfoldLessOutlinedIcon
    },
    {
      icon: ShareOutlinedIcon,
      //  onClick: handleClick,
      ActiveIcon: ShareIcon,
      ...iconsUtilsArrDenotation.SHARE
    }
  ];
  const reverseValidatedIconButtonUtilsArr: IconsUtilsArrType = isUtilsReversed
    ? reverse(iconsUtilsArr)
    : iconsUtilsArr;

  const correctIconButtonUtilsArr: IconsUtilsArrType = filter(
    reverseValidatedIconButtonUtilsArr,
    ({ name }: { name: IconsUtilsArrDenotationNameType }) =>
      !includes([...arrOfButtonNamesWhichSholudBeHidden, ...namesOfEditingUtils], name)
  );

  // useEffect(() => setPopoverAndMenuState(nullityOfPopoverAndMenuState), [color]);

  const [slicedArr, isShouldBeSliced, handleConcatAverageWidth] = useSliced(
    widthOfContainer,
    correctIconButtonUtilsArr
  );

  const defaultWrapperOfPopoverAndMenuProps = { customColor };

  const nonSlicedwrapperOfPopoverAndMenuProps = {
    buttonUtilsArr: correctIconButtonUtilsArr,
    handleAverageMainComponentWidth: handleConcatAverageWidth
  };

  const buttonMoreOfItemOfArrWhichWasSliced = {
    icon: PlayCircleOutlineOutlinedIcon,
    rotateDeg: 90,
    hidden: slicedArr?.after?.length === 0,
    menuComponents: MoreUtils,
    menuComponentsProps: { slicedArrAfter: slicedArr.after },
    ...iconsUtilsArrDenotation.MORE_UTILS
  };

  const buttonUtilsSlicedAndConcatedWithMoreButtonArr = concat(slicedArr.before, buttonMoreOfItemOfArrWhichWasSliced);
  const slicedWrapperOfPopoverAndMenuProps = { buttonUtilsArr: buttonUtilsSlicedAndConcatedWithMoreButtonArr };

  const wrapperOfPopoverAndMenuProps = isShouldBeSliced
    ? slicedWrapperOfPopoverAndMenuProps
    : nonSlicedwrapperOfPopoverAndMenuProps;

  const allWrapperOfPopoverAndMenuProps = { ...defaultWrapperOfPopoverAndMenuProps, ...wrapperOfPopoverAndMenuProps };

  // console.log(isShouldBeSliced)
  return (
    <Grid container wrap={'nowrap'} justify={isAllIconsIsShown ? 'flex-start' : 'space-between'}>
      <WrapperOfPopoverAndMenu {...allWrapperOfPopoverAndMenuProps} />
    </Grid>
  );
};

export default memo(IconsUtils);
