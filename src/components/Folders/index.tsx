import { Grid, makeStyles, Slide, useTheme } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useMeasure, usePrevious, useSize, useWindowSize } from 'react-use';
import { useSelector } from 'react-redux';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import _, { startsWith } from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useAlpha } from 'hooks/useAlpha.hook';
import { getFolders } from 'store/modules/App/selectors';
import { FoldersTypeProps, UseStylesOfFoldersType } from './types';
import MoreMenuOfFolders from './components/MoreMenu';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import { useRouter } from 'next/dist/client/router';
const marginOfToogleGroups = 1;

const useStyles = makeStyles(
  ({ spacing, typography, palette: { primary, secondary, background, mediumEmphasis } }) => ({
    containerOfFolderWithPakeepsView: ({
      isMenuOpen,
      positionOfFolderViewWithPakeepViewIsBottom,
      isFolderViewWithPakeepViewAlignToCenter,
      folderColor,
      isFoldersHaveDraweView,
      positionOfFolderViewWithPakeepViewIsRight
    }: UseStylesOfFoldersType) => {
      const color =
        folderColor === 'default' || !folderColor || folderColor === 'primary'
          ? primary.main
          : folderColor === 'secondary'
          ? secondary.main
          : folderColor;

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
          border: isFoldersHaveDraweView ? 'none' : '',
          color: isFoldersHaveDraweView ? mediumEmphasis?.main : '',
          display: positionOfFolderViewWithPakeepViewIsBottom && isMenuOpen ? 'block' : 'flex',
          whiteSpace: 'pre',
          justifyContent: !isMenuOpen ? 'center' : 'flex-start',
          flexDirection: 'column',

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
          '&:hover': { background: useAlpha(color, 0.2) },

          '& svg': { color }
        },
        '& .folderIsPlaceholder':{
          textTransform:'capitalize',
          '&:hover': {
            background: 'transparent !important'
          }

        },
       
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

  const [folderColor, setFolderColor] = useState('default');

  const navigationViewLike = useSelector(getNavigationViewLike);
  const folders = useSelector(getFolders);
  const classes = useStyles({
    folderColor,
    isMenuOpen,
    isFoldersHaveDraweView,
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight,
    isFolderViewWithPakeepViewAlignToCenter
  });
  const { spacing } = useTheme();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  // console.log(value)
  const SETTING_URL = '/settings';

  const APPEARANCE_URL = `${SETTING_URL}/appearance`;

  const FOLDERS_URL = `${APPEARANCE_URL}/folders`;
  const PAKEEPS_URL = `${APPEARANCE_URL}/pakeeps`;
  const HEADER_URL = `${APPEARANCE_URL}/header`;
  const LABELS_URL = `${APPEARANCE_URL}/labels`;
  const EVENTS_URL = `${APPEARANCE_URL}/events`;

  const ACCOUNT_URL = `${SETTING_URL}/account`;
  const SECURITY_URL = `${SETTING_URL}/security`;
  const THEME_URL = `${SETTING_URL}/theme`;

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
      title: 'Go to pakeeps',
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
        title: 'Security',
        iconName: 'security',
        id: 'folder-security',
        color: 'default',
        route: SECURITY_URL
      }
    ],

    [
      {
        title: 'Appearance',
        isFolderIsPlaceholder: true,
        iconName: 'none',
        id: 'folder-appearance',
        color: 'default'
      },
      {
        title: 'Pakeeps',
        iconName: '',
        id: 'folder-pakeeps',
        color: 'default',
        route: PAKEEPS_URL
      },
      {
        title: 'Header',
        // iconName: 'header',
        id: 'folder-header',
        color: 'default',
        route: HEADER_URL
      },
      {
        title: 'Folders',
        iconName: 'folder',
        id: 'folder-folder',
        color: 'default',
        route: FOLDERS_URL
      },

      {
        title: 'Labels',
        iconName: 'label',
        id: 'folder-labels',
        color: 'default',
        route: LABELS_URL
      },
      {
        title: 'Events',
        iconName: 'today',
        id: 'folder-events',
        color: 'default',
        route: EVENTS_URL
      }
    ]
  ];

  const validatedSettingFolders = isFoldersHaveDraweView ? settingsFolders : [goToPakeepsArr, ...settingsFolders];

  const defaultAllFolders = startsWith(router.pathname, SETTING_URL) ? validatedSettingFolders : pakeepFolders;

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
                  value={ value}
                  exclusive
                  onChange={handleChange}
                >
                  {arr?.map(
                    ({
                      title,
                      iconName,
                      property,
                      id,
                      onClick = null,
                      color,
                      isFolderIsPlaceholder = false,
                      route
                    }) => {
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
                      const borderRadiusValue = spacing(0.6);

                      const isButtonLastOfNotHiddenBottomArr =
                        positionOfFolderViewWithPakeepViewIsBottom && inNextButtonIsMore;

                      const isButtonLastOfNotHiddenNotBottomArr =
                        !positionOfFolderViewWithPakeepViewIsBottom && inNextButtonIsMore;
                      return (
                        //@ts-ignore
                        <ToggleButton
                          //  ref={ref}
                          className={isFolderIsPlaceholder ? 'folderIsPlaceholder' : ''}
                          style={{
                            padding: isFolderIsPlaceholder ? 6 : '',
                            cursor: isFolderIsPlaceholder ? 'auto' : 'pointer',
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
                            handleChange('findedIdx', findedIdx);
                            setFolderColor(color);
                            route && router.push(route);
                            onClickOfToggleButton && e.preventDefault();
                            onClickOfToggleButton && onClickOfToggleButton(e);
                          }}
                          key={id}
                        >
                          {iconName !== 'none' && icon}
                          {isMenuOpen && (
                            <Grid className={classes.textOfFolderWithPakeepsView} container>
                              {isButtonIsMore ? moreButtonTitle : title}
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
