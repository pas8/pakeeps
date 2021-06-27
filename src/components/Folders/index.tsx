import { Grid, makeStyles, Slide, useTheme } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useMeasure, useSize, useWindowSize } from 'react-use';
import { useSelector } from 'react-redux';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import _ from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useAlpha } from 'hooks/useAlpha.hook';
import { getFolders } from 'store/modules/App/selectors';
import { FoldersTypeProps, UseStylesOfFoldersType } from './types';
import MoreMenuOfFolders from './components/MoreMenu';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';

const marginOfToogleGroups = 1;

const useStyles = makeStyles(({ spacing, typography, palette: { primary } }) => ({
  containerOfFolderWithPakeepsView: ({
    isMenuOpen,
    positionOfFolderViewWithPakeepViewIsBottom,
    isFolderViewWithPakeepViewAlignToCenter,
    positionOfFolderViewWithPakeepViewIsRight
  }: UseStylesOfFoldersType) => ({
    // transform:'scale(0.8)',

    margin: spacing(positionOfFolderViewWithPakeepViewIsBottom ? 8 : 8 + 1.8, 0, 0, 0),
    // margin: spacing(positionOfFolderViewWithPakeepViewIsBottom ? -10 : -10 + 1.4, 0, 0, 0),
    '& .MuiToggleButtonGroup-root': {
      width: positionOfFolderViewWithPakeepViewIsBottom ? 'auto' : '100%',
      margin: spacing(
        marginOfToogleGroups,
        positionOfFolderViewWithPakeepViewIsRight || positionOfFolderViewWithPakeepViewIsBottom
          ? marginOfToogleGroups
          : 0,
        marginOfToogleGroups,
        positionOfFolderViewWithPakeepViewIsBottom
          ? 1.4
          : !positionOfFolderViewWithPakeepViewIsBottom && !positionOfFolderViewWithPakeepViewIsRight
          ? 1.4
          : 0
      ),
      background: '#303030'
    },
    '& button': {
      flexWrap: 'nowrap',
      height: '100%',
      padding: spacing(1.4, positionOfFolderViewWithPakeepViewIsBottom ? 1.4 : 1),

      display: positionOfFolderViewWithPakeepViewIsBottom && isMenuOpen ? 'block' : 'flex',
      whiteSpace: 'pre',
      justifyContent: !isMenuOpen ? 'center' : 'flex-start',
      flexDirection: 'column',
      '& svg': {
        fontSize: '2em'
      }
    },
    '& .Mui-selected': {
      background: useAlpha(primary.main),
      color: primary.main,
      '&:hover': { background: useAlpha(primary.main, 0.2) },
      '& svg': {
        color: primary.main
      }
    }
  }),
  textOfFolderWithPakeepsView: ({ positionOfFolderViewWithPakeepViewIsBottom }: UseStylesOfFoldersType) =>
    !positionOfFolderViewWithPakeepViewIsBottom
      ? { padding: spacing(0, 0, 0, 0.8) }
      : {
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          flexWrap: positionOfFolderViewWithPakeepViewIsBottom ? 'wrap' : 'nowrap',
          justifyContent: 'flex-end',
          // width:'100%',
          // height:'100%',
          alignItems: 'center'
        },
  container: {
    margin: spacing(10.32, 0, 0, 0),
    height: '100vh',
    // position: 'fixed',
    '& button:first-of-type': {
      borderTopRightRadius: 4
    },
    '& button:last-of-type': {
      borderBottomRightRadius: 4
    },
    '& .MuiTabs-indicator': {
      // height:'80%',
      width: 2,
      borderRadius: spacing(0.8)
    },

    '& button': {
      textTransform: 'none',
      color: '#fff',
      minWidth: '40px',
      fontWeight: typography.fontWeightRegular,
      fontSize: typography.pxToRem(16),
      // borderRadius:8,
      '&:focus': {
        opacity: 1
      },
      minHeight: 0,
      // marginTop: spacing(1.4),
      // margin:spacing(2,0),
      marginBottom: spacing(0.8),
      padding: spacing(1.48, 2.6),
      '& span': {
        flexDirection: 'row',
        '& svg': {
          fontSize: '1.8em'
          // margin: spacing(0.8, 0.4, 0, 0)
        }
      }
    }
  }
}));

const Folders: FC<FoldersTypeProps> = ({
  value,
  handleChange,
  handleDrawerWidth,
  isMenuOpen,
  positionOfFolderViewWithPakeepViewIsBottom,
  positionOfFolderViewWithPakeepViewIsRight,
  isFolderOpen,
  handleHideFolder,
  isFolderViewWithPakeepViewAlignToCenter,
  setMargin,
  isSizeOfFoldersMoreThanSize,
  setIsSizeOfFoldersMoreThanSize
}) => {
  const navigationViewLike = useSelector(getNavigationViewLike);
  const folders = useSelector(getFolders);
  const classes = useStyles({
    isMenuOpen,
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight,
    isFolderViewWithPakeepViewAlignToCenter
  });
  const { spacing } = useTheme();
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const utilsFolders = [
    [
      { title: 'Open settings1', iconName: 'settings', id: 'folder-94', property: 'settings' },
      { title: 'Hide folders2', iconName: 'visibility', onClick: handleHideFolder, id: 'folder-93' }
    ]
  ];

  const marginsOfToogleGroups = spacing(marginOfToogleGroups) * 2;
  // const allFolders = [...folders];
  const allFolders = [...folders, ...utilsFolders];

  const allMarginsOfBottomView = marginsOfToogleGroups * (allFolders.length + 1);
  const allMarginsOfNotBottomView = marginsOfToogleGroups * (allFolders.length + 4) + spacing(8);

  const allMarginsOfToogleGroups = positionOfFolderViewWithPakeepViewIsBottom
    ? allMarginsOfBottomView
    : allMarginsOfNotBottomView;

  const flattenAllFolders = _.flatten(allFolders);

  const [ref, { width: buttonWidth, height: buttonHeight }] = useMeasure<HTMLDivElement>();

  const buttonSize = positionOfFolderViewWithPakeepViewIsBottom ? buttonWidth : buttonHeight;
  const avarageButtonSize = buttonSize / flattenAllFolders.length;

  const foldersSize = buttonSize + allMarginsOfToogleGroups;
  const windowSize = positionOfFolderViewWithPakeepViewIsBottom ? windowWidth : windowHeight;

  const idxOfFolderItemWhichShouldBeInMenu =
    flattenAllFolders.length - ~~((foldersSize - windowSize) / avarageButtonSize);

  const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null);
  const isMoreMenuopen = Boolean(menuAnchorEl);

  const handleOpenMenu: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => setMenuAnchorEl(currentTarget);
  const handleCloseMenu = () => setMenuAnchorEl(null);

  const arrToMapOfMoreMenu = _.filter(flattenAllFolders, (el, idx) => idxOfFolderItemWhichShouldBeInMenu <= idx);

  const moreMenuOfFoldersProps = {
    arrToMap: arrToMapOfMoreMenu,
    isMoreMenuopen,
    handleCloseMenu,
    menuAnchorEl,
    flattenAllFolders,
    handleChange,
    value
  };
  // console.log(isSizeOfFoldersMoreThanSize)
  useEffect(() => {
    const MARGIN_VALUE = +(
      positionOfFolderViewWithPakeepViewIsBottom &&
      buttonSize + (marginsOfToogleGroups * allFolders.length) / 2 - windowSize
    );

    setMargin(MARGIN_VALUE);
    //! to improve better margin logic pl
  }, [buttonSize]);

  useEffect(() => {
    setIsSizeOfFoldersMoreThanSize(foldersSize > windowSize);
  }, [foldersSize, avarageButtonSize, windowSize]);

  const [f, { width }] = useSize(() => (
    <Grid container>
      <Grid
        container
        ref={ref}
        justify={isFolderViewWithPakeepViewAlignToCenter ? 'center' : 'flex-start'}
        wrap={'nowrap'}
        direction={positionOfFolderViewWithPakeepViewIsBottom ? 'row' : 'column'}
        className={navigationViewLike === 'googleKeep' ? classes.container : classes.containerOfFolderWithPakeepsView}
      >
        {navigationViewLike === 'pakeeps' &&
          allFolders.map((arr, arrIdx) => {
            return (
              <Slide
                key={`${arrIdx}-arrIdx`}
                in={isFolderOpen}
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
                {/* <Grid container> */}
                <ToggleButtonGroup
                  orientation={positionOfFolderViewWithPakeepViewIsBottom ? 'horizontal' : 'vertical'}
                  value={value}
                  exclusive
                  onChange={handleChange}
                >
                  {arr?.map(({ title, iconName, property, id, onClick = null }, idx) => {
                    const findedIdx = _.findIndex(flattenAllFolders, ({ id: folderId }) => folderId === id);

                    const isShouldBeHidden =
                      isSizeOfFoldersMoreThanSize && idxOfFolderItemWhichShouldBeInMenu < findedIdx;
                    const isButtonIsMore =
                      isSizeOfFoldersMoreThanSize && findedIdx === idxOfFolderItemWhichShouldBeInMenu;
                    const [icon] = useTakeIcon(
                      isButtonIsMore ? 'more' : iconName ? iconName : (property === 'label' && 'label') || 'infinity'
                    );
                    const moreButtonTitle = 'Open more';

                    const onClickOfToggleButton = isButtonIsMore ? handleOpenMenu : onClick;
                    const inNextButtonIsMore = findedIdx + 1 === idxOfFolderItemWhichShouldBeInMenu;
                    const borderRadiusValue = spacing(0.6);

                    const isButtonLastOfNotHiddenBottomArr =
                      positionOfFolderViewWithPakeepViewIsBottom && inNextButtonIsMore;

                    const isButtonLastOfNotHiddenNotBottomArr =
                      !positionOfFolderViewWithPakeepViewIsBottom && inNextButtonIsMore;
                    return (
                      //@ts-ignore
                      <ToggleButton
                        //  ref={ref}
                        style={{
                          opacity: isButtonIsMore ? 1 : isShouldBeHidden ? 0 : 1,
                          marginLeft: positionOfFolderViewWithPakeepViewIsBottom && isButtonIsMore && spacing(2.8),
                          borderLeft: isButtonIsMore && '1px solid rgba(255, 255, 255, 0.12)',
                          borderTop: isButtonIsMore && '1px solid rgba(255, 255, 255, 0.12)',

                          borderTopRightRadius:
                            (isButtonLastOfNotHiddenBottomArr || isButtonIsMore) && borderRadiusValue,
                          borderBottomRightRadius:
                            (isButtonLastOfNotHiddenNotBottomArr ||
                              isButtonLastOfNotHiddenBottomArr ||
                              isButtonIsMore) &&
                            borderRadiusValue,

                          borderBottomLeftRadius:
                            (isButtonLastOfNotHiddenNotBottomArr || isButtonIsMore) && borderRadiusValue,
                          borderTopLeftRadius:
                            (isButtonLastOfNotHiddenNotBottomArr || isButtonIsMore) && borderRadiusValue,

                          marginTop: isButtonIsMore && !positionOfFolderViewWithPakeepViewIsBottom && spacing(2)
                        }}
                        value={findedIdx}
                        aria-label={isButtonIsMore ? moreButtonTitle : title}
                        onClick={e => {
                          onClickOfToggleButton && e.preventDefault();
                          onClickOfToggleButton && onClickOfToggleButton(e);
                        }}
                        key={id}
                      >
                        {icon}
                        {isMenuOpen && (
                          <Grid className={classes.textOfFolderWithPakeepsView} container>
                            {isButtonIsMore ? moreButtonTitle : title}
                          </Grid>
                        )}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Slide>
            );
          })}
        <MoreMenuOfFolders {...moreMenuOfFoldersProps} />
      </Grid>
    </Grid>
  ));
  // useEffect(() =>  setButtonWidth(buttonW), [isFolderOpen])

  useEffect(() => handleDrawerWidth(width), [width, isFolderOpen]);
  useEffect(() => handleDrawerWidth(0), [isMenuOpen]);

  return f;
};

export default Folders;

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
