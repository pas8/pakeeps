import { Grid, makeStyles, Slide, useTheme } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useMeasure, usePrevious, useSize, useWindowSize } from 'react-use';
import { useSelector } from 'react-redux';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import _, { flatten, mapValues, startsWith } from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useAlpha } from 'hooks/useAlpha.hook';
import { getFolderOrderNames, getFolders, getHeaderHeight } from 'store/modules/App/selectors';
import { FoldersTypeProps, UseStylesOfFoldersType } from './types';
import MoreMenuOfFolders from './components/MoreMenu';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import { useRouter } from 'next/dist/client/router';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { useValidateColor } from 'hooks/useValidateColor.hook';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
;
import { useStylesOfFolders } from './useStyles';
import { DEFAULT, PRIMARY, SECONDARY } from 'models/denotation';
import { useValidateFolderColor } from 'hooks/useValidateFolderColor.hook';
import FolderButtonGroupByPas from './components/ButtonGroup';
import { useTakeFoldersArr } from 'hooks/useTakeFoldersArr.hook';

const Folders: FC<FoldersTypeProps> = ({
  isFolderOpen,
  isFolderExtended,
  positionOfFolderViewWithPakeepViewIsBottom,
  positionOfFolderViewWithPakeepViewIsRight,
  
  isFolderViewWithPakeepViewAlignToCenter,
  setMargin,
  isSizeOfFoldersMoreThanSize,
  setIsSizeOfFoldersMoreThanSize,
  ...defaultUseTakeFoldersArrProps
  // ...defaultFolderButtonGroupByPasProps
}) => {
  const router = useRouter();

  const [folderColor, setFolderColor] = useState(DEFAULT);

  const {
    validatedFolderColor,
    theme: { shape, spacing, palette }
  } = useValidateFolderColor(folderColor);

  const headerHeight = useSelector(getHeaderHeight);


  const all = useTakeFoldersArr({ ...defaultUseTakeFoldersArrProps,  });

  // const classes = useStylesOfFolders({
  //   folderColor: validatedFolderColor,
  //   // isMenuOpen,
  //   headerHeight,
  //   isFoldersHaveDraweView,
  //   positionOfFolderViewWithPakeepViewIsBottom,
  //   positionOfFolderViewWithPakeepViewIsRight,
  //   isFolderViewWithPakeepViewAlignToCenter
  // });

  // const findedElement = _.find(flattenAllFolders, el => _.startsWith(router.route, el?.route));

  // useEffect(() => {
  //   const findedElementIdx = _.findIndex(flattenAllFolders, ({ id }) => findedElement?.id === id);
  //   router.pathname !== '/' && findedElementIdx && handleChange(null, findedElementIdx);
  // }, [router, findedElement]);

  // useEffect(() => {
  //   !isFoldersHaveDraweView && handleDrawerWidth(width);
  // }, [width, isFolderOpen]);

  // const moreMenuOfFoldersProps = {
  //   arrToMap: arrToMapOfMoreMenu,
  //   isMoreMenuopen,
  //   handleCloseMenu,
  //   menuAnchorEl,
  //   flattenAllFolders,
  //   handleChange,
  //   value
  // };

  const [isAncholElHidden, setIsAncholElHidden] = useState(false);

  const handleChangeAncholElHiddenStatus = () => {
    setIsAncholElHidden(prev => !prev);
  };

  const { isSizeSmall } = useBreakpointNames();
  const folderButtonGroupByPas = {
    // ...defaultFolderButtonGroupByPasProps
  };
  return (
    <Grid container>
      <Grid
        container
        // ref={ref}
        justify={isFolderViewWithPakeepViewAlignToCenter ? 'center' : 'flex-start'}
        wrap={'nowrap'}
        direction={positionOfFolderViewWithPakeepViewIsBottom ? 'row' : 'column'}
        // className={classes.containerOfFolderWithPakeepsView}
      >
        <Slide
          in={isFolderOpen || isFolderExtended}
          mountOnEnter
          unmountOnExit
          direction={
            positionOfFolderViewWithPakeepViewIsBottom
              ? 'down'
              : positionOfFolderViewWithPakeepViewIsRight
              ? 'left'
              : 'right'
          }
        >
          <FolderButtonGroupByPas {...folderButtonGroupByPas} />
        </Slide>
      </Grid>
    </Grid>
  );
};

export default Folders;
{
  /* <MoreMenuOfFolders {...moreMenuOfFoldersProps} /> */
}

// {navigationViewLike === 'googleKeep' && (
//   <Tabs
//     orientation={'vertical'}
//     variant={'scrollable'}
//     value={value}
//     onChange={handleChange}
//     indicatorColor="primary"
//     textColor="primary"
//     fullWidth={false}
//     aria-label={'Vertical folders'}
//     // className={classes.tabs}
//   >
//     {flattenFolders.map(({ title, iconName }) => {
//       const [icon] = useTakeIcon(iconName || 'infinity');
//       return <Tab aria-label={title} icon={icon} />;
//       // return <Tab icon={icon} aria-label={title} />;
//     })}
//   </Tabs>
// )}

// {
//   allFolders.map((arr, arrIdx) => {
//     if (!arr.length) return null;

//     return (

//         {/* <Grid container> */}
//         <ToggleButtonGroup
//           orientation={positionOfFolderViewWithPakeepViewIsBottom ? 'horizontal' : 'vertical'}
//           value={value}
//           exclusive
//           onChange={handleChange}
//         >
//           {arr?.map(
//             ({
//               title,
//               iconName,
//               isAncholElementLast = false,
//               property,
//               id,
//               onClick = null,
//               color,
//               isFolderIsPlaceholder = false,
//               route,
//               parentRoute = 'isParent'
//             }) => {
//               const isHaveParentRoute = parentRoute !== 'isParent';

//               if ((parentRoute !== router.route || isAncholElHidden || isSizeSmall) && isHaveParentRoute)
//                 return null;
//               if (!isMenuOpen && isFolderIsPlaceholder) return null;
//               if (isFolderOpen && !isMenuOpen && iconName === 'none' && isHaveParentRoute) return null;
//               const findedIdx = _.findIndex(flattenAllFolders, ({ id: folderId }) => folderId === id);
//               const isShouldBeHidden =
//                 isSizeOfFoldersMoreThanSize && idxOfFolderItemWhichShouldBeInMenu < findedIdx;
//               const isButtonIsMore =
//                 isSizeOfFoldersMoreThanSize && findedIdx === idxOfFolderItemWhichShouldBeInMenu;
//               const [icon] = useTakeIcon(
//                 isButtonIsMore
//                   ? 'more'
//                   : !!iconName
//                   ? iconName
//                   : (property === 'label' && 'label') || (property === 'event' && 'week') || 'infinity'
//               );
//               const moreButtonTitle = 'Open more';

//               const onClickOfToggleButton = isButtonIsMore ? handleOpenMenu : onClick;
//               const inNextButtonIsMore = findedIdx + 1 === idxOfFolderItemWhichShouldBeInMenu;
//               const borderRadiusValue = shape.borderRadius;

//               const isButtonLastOfNotHiddenBottomArr =
//                 positionOfFolderViewWithPakeepViewIsBottom && inNextButtonIsMore;

//               const isButtonLastOfNotHiddenNotBottomArr =
//                 !positionOfFolderViewWithPakeepViewIsBottom && inNextButtonIsMore;

//               // const validatedColor = useValidateColor(findedElement.color);
//               const isButtonActive = findedElement?.id === id;
//               const borderColor = useAlpha(validatedFolderColor, 0.6);
//               return (
//                 //@ts-ignore
//                 <ToggleButton
//                   //  ref={ref}
//                   className={isFolderIsPlaceholder ? 'folderIsPlaceholder' : ''}
//                   style={{
//                     textTransform: isHaveParentRoute ? 'capitalize' : '',
//                     padding: isFolderIsPlaceholder ? 6 : '',
//                     cursor: isFolderIsPlaceholder ? 'auto' : 'pointer',
//                     opacity: isButtonIsMore ? 1 : isShouldBeHidden ? 0 : 1,
//                     marginLeft: positionOfFolderViewWithPakeepViewIsBottom && isButtonIsMore && spacing(2.8),
//                     borderTop: isButtonActive
//                       ? `2px solid ${borderColor}`
//                       : isButtonIsMore && `1px solid ${useAlpha(palette.text.primary)}`,
//                     borderLeft:
//                       isHaveParentRoute || isButtonActive
//                         ? `2px solid ${borderColor}`
//                         : isButtonIsMore && `1px solid ${useAlpha(palette.text.primary)}`,
//                     borderRight: isHaveParentRoute || isButtonActive ? `2px solid ${borderColor}` : '',
//                     borderBottom:
//                       (isButtonActive && isAncholElHidden) || isAncholElementLast
//                         ? `2px solid ${borderColor}`
//                         : '',

//                     borderTopRightRadius:
//                       (isButtonLastOfNotHiddenBottomArr || isButtonIsMore) && borderRadiusValue,
//                     borderBottomRightRadius:
//                       (isButtonLastOfNotHiddenNotBottomArr ||
//                         isButtonLastOfNotHiddenBottomArr ||
//                         isButtonIsMore) &&
//                       borderRadiusValue,

//                     // isAncholElementLast

//                     borderBottomLeftRadius:
//                       (isButtonLastOfNotHiddenNotBottomArr || isButtonIsMore) && borderRadiusValue,
//                     borderTopLeftRadius:
//                       !isHaveParentRoute &&
//                       (isButtonLastOfNotHiddenNotBottomArr || isButtonIsMore) &&
//                       borderRadiusValue,

//                     marginTop: isButtonIsMore && !positionOfFolderViewWithPakeepViewIsBottom && spacing(2)
//                   }}
//                   value={findedIdx}
//                   aria-label={isButtonIsMore ? moreButtonTitle : title}
//                   onClick={e => {
//                     // onClickOfToggleButton  e.preventDefault();
//                     onClickOfToggleButton && onClickOfToggleButton(e);
//                     isButtonActive && handleChangeAncholElHiddenStatus();
//                     handleChange('findedIdx', findedIdx);
//                     setFolderColor(color);
//                     route && router.push(route);
//                   }}
//                   key={`arrItemOfAllFolders${id}`}
//                 >
//                   {/* {findedElement.id !== id && iconName !== 'none' && icon} */}
//                   {iconName !== 'none' && !isHaveParentRoute && icon}
//                   {isMenuOpen && (
//                     <Grid className={classes.textOfFolderWithPakeepsView} container>
//                       {isButtonIsMore ? moreButtonTitle : isHaveParentRoute ? `# ${title}` : title}
//                     </Grid>
//                   )}
//                   {isMenuOpen && isButtonActive && (
//                     <Grid container alignItems={'flex-end'} justify={'flex-end'}>
//                       {isAncholElHidden ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}
//                     </Grid>
//                   )}
//                 </ToggleButton>
//               );
//             }
//           )}
