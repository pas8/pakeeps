import { Grid, makeStyles, Slide, useTheme } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useMeasure, usePrevious, useSize, useWindowSize } from 'react-use';
import { useSelector } from 'react-redux';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import _, { flatten, mapValues, startsWith } from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useAlpha } from 'hooks/useAlpha.hook';
import { getFolders } from 'store/modules/App/selectors';
import { FoldersTypeProps, UseStylesOfFoldersType } from './types';
import MoreMenuOfFolders from './components/MoreMenu';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import { useRouter } from 'next/dist/client/router';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { useValidateColor } from 'hooks/useValidateColor.hook';

const marginOfToogleGroups = 1;

const useStyles = makeStyles(
  ({ spacing, typography, palette: { primary, secondary, background, mediumEmphasis, text } }) => ({
    containerOfFolderWithPakeepsView: ({
      isMenuOpen,
      positionOfFolderViewWithPakeepViewIsBottom,
      isFolderViewWithPakeepViewAlignToCenter,
      folderColor,
      isFoldersHaveDraweView,
      positionOfFolderViewWithPakeepViewIsRight
    }: UseStylesOfFoldersType) => {
      const color = folderColor;
      return {
        // transform:'scale(0.8)',

        margin: spacing(isFoldersHaveDraweView ? 0 : positionOfFolderViewWithPakeepViewIsBottom ? 8 : 8 + 1.8, 0, 0, 0),
        // margin: spacing(positionOfFolderViewWithPakeepViewIsBottom ? -10 : -10 + 1.4, 0, 0, 0),
        '& .MuiToggleButtonGroup-root': {
          width: positionOfFolderViewWithPakeepViewIsBottom ? 'auto' : '100%',
          margin: spacing(
            isFoldersHaveDraweView ? 0 : marginOfToogleGroups,
            positionOfFolderViewWithPakeepViewIsRight || positionOfFolderViewWithPakeepViewIsBottom
              ? marginOfToogleGroups
              : 0,
            isFoldersHaveDraweView ? 0 : marginOfToogleGroups,
            isFoldersHaveDraweView
              ? 0
              : positionOfFolderViewWithPakeepViewIsBottom
              ? 1.4
              : !positionOfFolderViewWithPakeepViewIsBottom && !positionOfFolderViewWithPakeepViewIsRight
              ? 1.4
              : 0
          ),
          background: isFoldersHaveDraweView ? background.paper : background.default
        },
        '& button': {
          flexWrap: 'nowrap',
          height: '100%',
          borderRadius: isFoldersHaveDraweView ? 0 : '',
          padding: spacing(1.4, isFoldersHaveDraweView ? 1.42 : positionOfFolderViewWithPakeepViewIsBottom ? 1.4 : 1),
          // background: isFoldersHaveDraweView ? `${background.paper}` : '',
          border: isFoldersHaveDraweView ? 'none' : `1px solid ${useAlpha(text.primary)}`,
          color: isFoldersHaveDraweView ? text.hint : text.hint,
          display: positionOfFolderViewWithPakeepViewIsBottom && isMenuOpen ? 'block' : 'flex',
          whiteSpace: 'pre',
          justifyContent: !isMenuOpen ? 'center' : 'flex-start',
          flexDirection: 'column',
          '&:hover': {
            background: useAlpha(text.primary)
          },

          '&:last-child': {
            // background:'red',
            borderBottom: isFoldersHaveDraweView ? `1px solid ${mediumEmphasis?.main}` : ''

            // background: isFoldersHaveDraweView ? `${useAlpha(color)} !important` : ''
          },
          '& svg': {
            fontSize: '2em'
          }
        },
        '& .Mui-selected': {
          background: useAlpha(color),
          color,
          borderColor: useAlpha(color),
          '&:hover': { background: useAlpha(color, 0.2) },

          '& svg': { color }
        },
        '& .folderIsPlaceholder': {
          textTransform: 'capitalize',
          '&:hover': {
            background: 'transparent !important'
          }
        }
      };
    },
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
  })
);

const SETTING_URL = '/settings';

const THEME = 'theme';
const APPEARANCE = 'appearance';

const APPEARANCE_URL = `${SETTING_URL}/${APPEARANCE}`;
const THEME_URL = `${SETTING_URL}/${THEME}`;
const ACCOUNT_URL = `${SETTING_URL}/account`;
const SECURITY_URL = `${SETTING_URL}/security`;

export const themeAnchorArr = {
  COLORS_ID: `${THEME}_colors`,
  DEFAULT_THEMES_ID: `${THEME}_defaultThemes`,
  BORDER_RADIUS: `${THEME}_borderRadius`
};

export const themeAnchorIdArr = mapValues(themeAnchorArr, el => '#' + el);

const appearanceAnchorArr = {
  FOLDERS_ID: `#${APPEARANCE}_folders`,
  PAKEEPS_ID: `#${APPEARANCE}_pakeeps`,
  HEADER_ID: `#${APPEARANCE}_header`,
  LABELS_ID: `#${APPEARANCE}_labels`,
  EVENTS_ID: `#${APPEARANCE}_events`
};

const Folders: FC<FoldersTypeProps> = ({
  value,
  handleChange,
  handleDrawerWidth,
  isMenuOpen,
  positionOfFolderViewWithPakeepViewIsBottom,
  positionOfFolderViewWithPakeepViewIsRight,
  isFolderOpen,
  handleHideFolder,
  handleCloseFoldersWithDrawerView,
  isFolderViewWithPakeepViewAlignToCenter,
  setMargin,
  isSizeOfFoldersMoreThanSize,
  setIsSizeOfFoldersMoreThanSize,
  isFoldersHaveDraweView
}) => {
  const router = useRouter();

  const {
    spacing,
    shape,
    palette: { text, primary, secondary }
  } = useTheme();
  const [folderColor, setFolderColor] = useState('default');

  const validatedFolderColor =
    folderColor === 'default' || !folderColor || folderColor === 'primary'
      ? primary.main
      : folderColor === 'secondary'
      ? secondary.main
      : folderColor;

  const navigationViewLike = useSelector(getNavigationViewLike);
  const folders = useSelector(getFolders);
  const classes = useStyles({
    folderColor: validatedFolderColor,
    isMenuOpen,
    isFoldersHaveDraweView,
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight,
    isFolderViewWithPakeepViewAlignToCenter
  });

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  // console.log(value)

  const handleOpenSetting = () => {
    handleChange('placeholder', 1);
    router.push(ACCOUNT_URL);
  };

  // const previuosValue = usePrevious(value)
  const handleGoBack = () => {
    router.back();
    // handleChange('placeholder', previuosValue);
  };

  const handleGoToPakeep = () => {
    router.push('/');
  };

  const utilsFolders = [
    [
      { title: 'Open settings1', iconName: 'settings', id: 'folder-94', onClick: handleOpenSetting, color: 'default' },
      { title: 'Hide folders2', iconName: 'visibility', onClick: handleHideFolder, id: 'folder-93', color: 'default' }
      // { title: 'Hide folders2', iconName: 'visibility', onClick: handleHideFolder, id: 'folder-93', color: 'default' },
      // { title: 'Hide folders2', iconName: 'visibility', onClick: handleHideFolder, id: 'folder-93', color: 'default' },
    ]
  ];

  const marginsOfToogleGroups = spacing(marginOfToogleGroups) * 2;

  const pakeepFolders = [...folders, ...utilsFolders];

  const goToPakeepsArr = [
    {
      title: 'To_pakeeps',
      iconName: 'arrowBack',
      id: 'folder-arrowBack',
      onClick: handleGoToPakeep,
      color: 'default'
    }
  ];

  const settingsFolders = [
    [
      { title: 'Account', iconName: 'account', id: 'folder-account', color: 'default', route: ACCOUNT_URL },

      { title: 'Theme', iconName: 'color', id: 'folder-theme', color: 'default', route: THEME_URL },

      {
        title: 'Colors',
        iconName: 'none',
        parentRoute: THEME_URL,
        id: themeAnchorIdArr.COLORS_ID,
        color: 'default',
        route: themeAnchorIdArr.COLORS_ID
      },
      {
        title: 'Themes',
        iconName: 'none',
        parentRoute: THEME_URL,
        id: themeAnchorIdArr.DEFAULT_THEMES_ID,
        color: 'default',
        route: themeAnchorIdArr.DEFAULT_THEMES_ID
      },
      {
        title: 'Border_Radius',
        iconName: 'none',
        parentRoute: THEME_URL,
        id: themeAnchorIdArr.BORDER_RADIUS,
        color: 'default',
        route: themeAnchorIdArr.BORDER_RADIUS,
        isAncholElementLast: true
      },

      {
        title: 'Security',
        iconName: 'security',
        id: 'folder-security',
        color: 'default',
        route: SECURITY_URL
      },
      {
        title: 'Appearance',
        // isFolderIsPlaceholder: true,
        iconName: 'none',
        id: 'folder-appearance',
        color: 'default',
        route: APPEARANCE_URL
      },
      {
        title: 'Pakeeps',
        iconName: '',
        parentRoute: APPEARANCE_URL,
        id: 'folder-appearance-pakeeps',
        color: 'default',
        route: appearanceAnchorArr.PAKEEPS_ID
      },
      // {
      //   title: 'Header',
      //   // iconName: 'header',
      //   id: 'folder-appearance-header',
      //   color: 'default',
      //   route: appearanceAnchorArr.Head
      // },
      {
        title: 'Folders',
        parentRoute: APPEARANCE_URL,
        iconName: 'folder',
        id: 'folder-appearance-folder',
        color: 'default',
        route: appearanceAnchorArr.FOLDERS_ID
      },

      {
        title: 'Labels',
        parentRoute: APPEARANCE_URL,
        iconName: 'label',
        id: 'folder-appearance-labels',
        color: 'default',
        route: appearanceAnchorArr.LABELS_ID
      },
      {
        title: 'Events',
        parentRoute: APPEARANCE_URL,
        iconName: 'today',
        id: 'folder-appearance-events',
        color: 'default',
        route: appearanceAnchorArr.EVENTS_ID
      }
    ]
  ];

  // const settingsFoldersRouteArr =  flatten(settingsFolders).map(({route}))

  const validatedSettingFolders = isFoldersHaveDraweView ? settingsFolders : [goToPakeepsArr, ...settingsFolders];

  const defaultAllFolders = _.startsWith(router.pathname, SETTING_URL) ? validatedSettingFolders : pakeepFolders;

  const allFoldersWithDrawerView = [
    [
      {
        title: 'Close menu',
        iconName: 'close',
        id: 'folder-close',
        onClick: handleCloseFoldersWithDrawerView,
        color: 'default'
      }
    ],
    ...defaultAllFolders
  ];

  const allFolders = isFoldersHaveDraweView ? allFoldersWithDrawerView : defaultAllFolders;
  const flattenAllFolders = _.flatten(allFolders);

  const findedElement = _.find(flattenAllFolders, el => _.startsWith(router.route, el?.route));

  useEffect(() => {
    const findedElementIdx = _.findIndex(flattenAllFolders, ({ id }) => findedElement?.id === id);
    findedElementIdx && handleChange(null, findedElementIdx);
  }, [router, findedElement]);

  const FOLDER_WITHOUT_ROUTE = 'FOLDER_WITHOUT_ROUTE';

  const allMarginsOfBottomView = marginsOfToogleGroups * (allFolders.length + 1);
  const allMarginsOfNotBottomView = marginsOfToogleGroups * (allFolders.length + 4) + spacing(8);

  const allMarginsOfToogleGroups = positionOfFolderViewWithPakeepViewIsBottom
    ? allMarginsOfBottomView
    : allMarginsOfNotBottomView;

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

  const [isAncholElHidden, setIsAncholElHidden] = useState(false);

  const handleChangeAncholElHiddenStatus = () => {
    setIsAncholElHidden(prev => !prev);
  };

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
                  {arr?.map(
                    ({
                      title,
                      iconName,
                      isAncholElementLast = false,
                      property,
                      id,
                      onClick = null,
                      color,
                      isFolderIsPlaceholder = false,
                      route,
                      parentRoute = 'isParent'
                    }) => {
                      const isHaveParentRoute = parentRoute !== 'isParent';

                      if ((parentRoute !== router.route || isAncholElHidden) && isHaveParentRoute) return null;
                      if (!isMenuOpen && isFolderIsPlaceholder) return null;

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
                      const borderRadiusValue = shape.borderRadius;

                      const isButtonLastOfNotHiddenBottomArr =
                        positionOfFolderViewWithPakeepViewIsBottom && inNextButtonIsMore;

                      const isButtonLastOfNotHiddenNotBottomArr =
                        !positionOfFolderViewWithPakeepViewIsBottom && inNextButtonIsMore;

                      // const validatedColor = useValidateColor(findedElement.color);
                      const isButtonActive = findedElement?.id === id;
                      const borderColor = useAlpha(validatedFolderColor, 0.6);
                      return (
                        //@ts-ignore
                        <ToggleButton
                          //  ref={ref}
                          className={isFolderIsPlaceholder ? 'folderIsPlaceholder' : ''}
                          style={{
                            textTransform: isHaveParentRoute ? 'capitalize' : '',
                            padding: isFolderIsPlaceholder ? 6 : '',
                            cursor: isFolderIsPlaceholder ? 'auto' : 'pointer',
                            opacity: isButtonIsMore ? 1 : isShouldBeHidden ? 0 : 1,
                            marginLeft: positionOfFolderViewWithPakeepViewIsBottom && isButtonIsMore && spacing(2.8),
                            borderTop: isButtonActive
                              ? `2px solid ${borderColor}`
                              : isButtonIsMore && `1px solid ${useAlpha(text.primary)}`,
                            borderLeft:
                              isHaveParentRoute || isButtonActive
                                ? `2px solid ${borderColor}`
                                : isButtonIsMore && `1px solid ${useAlpha(text.primary)}`,
                            borderRight: isHaveParentRoute || isButtonActive ? `2px solid ${borderColor}` : '',
                            borderBottom:
                              (isButtonActive && isAncholElHidden) || isAncholElementLast
                                ? `2px solid ${borderColor}`
                                : '',

                            borderTopRightRadius:
                              (isButtonLastOfNotHiddenBottomArr || isButtonIsMore) && borderRadiusValue,
                            borderBottomRightRadius:
                              (isButtonLastOfNotHiddenNotBottomArr ||
                                isButtonLastOfNotHiddenBottomArr ||
                                isButtonIsMore) &&
                              borderRadiusValue,

                            // isAncholElementLast

                            borderBottomLeftRadius:
                              (isButtonLastOfNotHiddenNotBottomArr || isButtonIsMore) && borderRadiusValue,
                            borderTopLeftRadius:
                              (isButtonLastOfNotHiddenNotBottomArr || isButtonIsMore) && borderRadiusValue,

                            marginTop: isButtonIsMore && !positionOfFolderViewWithPakeepViewIsBottom && spacing(2)
                          }}
                          value={findedIdx}
                          aria-label={isButtonIsMore ? moreButtonTitle : title}
                          onClick={e => {
                            handleChange('findedIdx', findedIdx);
                            setFolderColor(color);
                            route && router.push(route);
                            onClickOfToggleButton && e.preventDefault();
                            onClickOfToggleButton && onClickOfToggleButton(e);
                            isButtonActive && handleChangeAncholElHiddenStatus();
                          }}
                          key={id}
                        >
                          {/* {findedElement.id !== id && iconName !== 'none' && icon} */}
                          {iconName !== 'none' && icon}
                          {isMenuOpen && (
                            <Grid className={classes.textOfFolderWithPakeepsView} container>
                              {isButtonIsMore ? moreButtonTitle : isHaveParentRoute ? `# ${title}` : title}
                            </Grid>
                          )}
                          {isButtonActive && (
                            <Grid container alignItems={'flex-end'} justify={'flex-end'}>
                              {isAncholElHidden ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}
                            </Grid>
                          )}
                        </ToggleButton>
                      );
                    }
                  )}
                </ToggleButtonGroup>
              </Slide>
            );
          })}
        <MoreMenuOfFolders {...moreMenuOfFoldersProps} />
      </Grid>
    </Grid>
  ));
  // useEffect(() =>  setButtonWidth(buttonW), [isFolderOpen])

  useEffect(() => {
    !isFoldersHaveDraweView && handleDrawerWidth(width);
  }, [width, isFolderOpen]);
  useEffect(() => {
    handleDrawerWidth(0);
  }, [isMenuOpen]);

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
