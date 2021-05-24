import { Grid, makeStyles, Tabs, Tab, Drawer, Typography, Collapse, Slide, useTheme, Menu } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import PropTypes from 'prop-types';
import { useMeasure, usePrevious, useSize, useWindowSize, useCounter } from 'react-use';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { colord } from 'colord';
import { themeColors } from 'components/theme';
import { nanoid } from 'nanoid';
import ButtonItem from './components/ButtonItem';
import MoreMenuOfFolders from './components/MoreMenu';
const useStyles = makeStyles(theme => ({
  containerOfFolderWithPakeepsView: ({
    isMenuOpen,
    positionOfFolderViewWithPakeepViewIsBottom,
    isFolderViewWithPakeepViewAlignToCenter,
    positionOfFolderViewWithPakeepViewIsRight
  }) => ({
    margin: theme.spacing(positionOfFolderViewWithPakeepViewIsBottom ? 8 : 8 + 1.4, 0, 0, 0),
    '& .MuiToggleButtonGroup-root': {
      width: positionOfFolderViewWithPakeepViewIsBottom ? 'auto' : '100%',
      margin: theme.spacing(
        1.4,
        positionOfFolderViewWithPakeepViewIsRight ? 1.4 : positionOfFolderViewWithPakeepViewIsBottom ? 1.4 : 0,
        1.4,
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
      padding: theme.spacing(1.4, positionOfFolderViewWithPakeepViewIsBottom ? 1.4 : 1),

      display: positionOfFolderViewWithPakeepViewIsBottom && isMenuOpen ? 'block' : 'flex',
      whiteSpace: 'pre',
      justifyContent: !isMenuOpen ? 'center' : 'flex-start',
      flexDirection: 'column',
      '& svg': {
        fontSize: '2em'
      }
    },
    '& .Mui-selected': {
      background: colord(themeColors.primaryMain).alpha(0.16).toHex(),
      color: themeColors.primaryMain,
      '&:hover': { background: colord(themeColors.primaryMain).alpha(0.16).toHex() },
      '& svg': {
        color: themeColors.primaryMain
      }
    }
  }),
  textOfFolderWithPakeepsView: ({ positionOfFolderViewWithPakeepViewIsBottom }) =>
    !positionOfFolderViewWithPakeepViewIsBottom
      ? { padding: theme.spacing(0, 0, 0, 0.8) }
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
    margin: theme.spacing(10.32, 0, 0, 0),
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
      borderRadius: theme.spacing(0.8)
    },

    '& button': {
      textTransform: 'none',
      color: '#fff',
      minWidth: '40px',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(16),
      // borderRadius:8,
      '&:focus': {
        opacity: 1
      },
      minHeight: 0,
      // marginTop: theme.spacing(1.4),
      // margin:theme.spacing(2,0),
      marginBottom: theme.spacing(0.8),
      padding: theme.spacing(1.48, 2.6),
      '& span': {
        flexDirection: 'row',
        '& svg': {
          fontSize: '1.8em'
          // margin: theme.spacing(0.8, 0.4, 0, 0)
        }
      }
    }
  }
}));

const Folders = ({
  value,
  handleChange,
  folders,
  handleDrawerWidthThunk,
  isMenuOpen,
  navigationViewLike,
  positionOfFolderViewWithPakeepViewIsBottom,
  positionOfFolderViewWithPakeepViewIsRight,
  isFolderOpen,
  handleHideFolder,
  isFolderViewWithPakeepViewAlignToCenter,
  setMargin,
  isSizeOfFoldersMoreThanSize,
  setIsSizeOfFoldersMoreThanSize
}) => {
  const classes = useStyles({
    isMenuOpen,
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight,
    isFolderViewWithPakeepViewAlignToCenter
  });
  const theme = useTheme();
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  // const utilsFolders = [
  //   [
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-92', property: 'settings' },
  //     { title: 'Hide folders', iconName: 'visibility', onClick: handleHideFolder, id: 'folder-93' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-94', property: 'settings' },
  //     { title: 'Hide folders', iconName: 'visibility', onClick: handleHideFolder },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-95', property: 'settings' },
  //     { title: 'Hide folders', iconName: 'visibility', onClick: handleHideFolder },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-96', property: 'settings' },
  //     { title: 'Hide folders', iconName: 'visibility', onClick: handleHideFolder },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-97', property: 'settings' },
  //     { title: 'Open settings1', iconName: 'settings', id: 'folder-98', property: 'settings' },
  //     { title: 'Open settings2', iconName: 'settings', id: 'folder-99', property: 'settings' },
  //     { title: 'Open settings3', iconName: 'settings', id: 'folder-100', property: 'settings' },
  //     { title: 'Open settings4', iconName: 'settings', id: 'folder-101', property: 'settings' },
  //     { title: 'Open settings5', iconName: 'settings', id: 'folder-102', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-912', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-922', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-932', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-942', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-952', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-9512', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-91252', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-9512', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-91252', property: 'settings' },
  //     { title: 'Open settings', iconName: 'settings', id: 'folder-95122', property: 'settings' },
  //     { title: 'Open settings', iconName: 'pin', id: 'folder-951r22', property: 'settings' }
  //   ]
  // ];
  const valueToAdd = positionOfFolderViewWithPakeepViewIsBottom ? 1 : 3;

  const allFolders = [...folders];
  // const allFolders = [...folders,...utilsFolders ];
  const flattenAllFolders = _.flatten(allFolders);

  const [ref, { width: buttonWidth, height: buttonHeight }] = useMeasure();

  const buttonSize = positionOfFolderViewWithPakeepViewIsBottom ? buttonWidth : buttonHeight;
  const avarageButtonSize = buttonSize / flattenAllFolders.length;

  const foldersSize = buttonSize + avarageButtonSize;
  const windowSize = positionOfFolderViewWithPakeepViewIsBottom ? windowWidth : windowHeight;

  const idxOfFolderItemWhichShouldBeInMenu =
    flattenAllFolders.length - ~~((foldersSize - windowSize) / avarageButtonSize);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMoreMenuopen = Boolean(menuAnchorEl);

  const handleOpenMenu = ({ currentTarget }) => setMenuAnchorEl(currentTarget);
  const handleCloseMenu = () => setMenuAnchorEl(null);

  const arrToMapOfMoreMenu = _.filter(
    flattenAllFolders,
    (el, idx) => idxOfFolderItemWhichShouldBeInMenu - valueToAdd <= idx
  );
  const moreMenuOfFoldersProps = {
    arrToMap: arrToMapOfMoreMenu,
    isMoreMenuopen,
    handleCloseMenu,
    menuAnchorEl,
    flattenAllFolders,
    handleChange,
    value
  };
  console.log(buttonSize);
  // console.log(isSizeOfFoldersMoreThanSize)
  useEffect(() => {
    setMargin(positionOfFolderViewWithPakeepViewIsBottom && foldersSize - windowSize - theme.spacing(4 + 1));
  }, [buttonSize]);
  
  useEffect(() => {
    setIsSizeOfFoldersMoreThanSize(foldersSize - avarageButtonSize * 2 > windowSize);
  }, [foldersSize, avarageButtonSize, windowSize]);

  const [f, { width }] = useSize(() => (
    <Grid container>
      <Grid
        container
        ref={ref}
        justify={'center'}
        // ref={!positionOfFolderViewWithPakeepViewIsBottom ? ref : placeholderRef}
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
                    ? 'bottom'
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
                  exclusive
                >
                  {arr?.map(({ title, iconName, property, id, onClick = null }, idx) => {
                    const findedIdx = _.findIndex(flattenAllFolders, ({ id: folderId }) => folderId === id);

                    const isShouldBeHidden =
                      isSizeOfFoldersMoreThanSize && idxOfFolderItemWhichShouldBeInMenu < findedIdx + valueToAdd + 1;
                    const isButtonIsMore =
                      isSizeOfFoldersMoreThanSize && findedIdx + valueToAdd === idxOfFolderItemWhichShouldBeInMenu;
                    const [icon] = useTakeIcon(
                      isButtonIsMore ? 'more' : iconName ? iconName : (property === 'label' && 'label') || 'infinity'
                    );
                    const moreButtonTitle = 'Open more';

                    const onClickOfToggleButton = isButtonIsMore ? handleOpenMenu : onClick;

                    return (
                      <ToggleButton
                        //  ref={ref}
                        style={{
                          opacity: isButtonIsMore ? 1 : isShouldBeHidden ? 0 : 1,
                          marginLeft:
                            positionOfFolderViewWithPakeepViewIsBottom && isButtonIsMore && theme.spacing(2.8),
                          borderLeft: isButtonIsMore && '1px solid rgba(255, 255, 255, 0.12)',
                          borderTop: isButtonIsMore && '1px solid rgba(255, 255, 255, 0.12)',
                          borderTopRightRadius:
                            (isButtonIsMore && theme.spacing(0.6)) ||
                            (positionOfFolderViewWithPakeepViewIsBottom &&
                              findedIdx + valueToAdd + 1 === idxOfFolderItemWhichShouldBeInMenu &&
                              theme.spacing(0.6)),
                          borderBottomRightRadius:
                            (isButtonIsMore && theme.spacing(0.6)) ||
                            (findedIdx + valueToAdd + 1 === idxOfFolderItemWhichShouldBeInMenu && theme.spacing(0.6)),

                          borderTopLeftRadius:
                            (isButtonIsMore && theme.spacing(0.6)) ||
                            (!positionOfFolderViewWithPakeepViewIsBottom &&
                              findedIdx + valueToAdd + 1 === idxOfFolderItemWhichShouldBeInMenu &&
                              theme.spacing(0.6)),
                          borderBottomLeftRadius:
                            (isButtonIsMore && theme.spacing(0.6)) ||
                            (!positionOfFolderViewWithPakeepViewIsBottom &&
                              findedIdx + valueToAdd + 1 === idxOfFolderItemWhichShouldBeInMenu &&
                              theme.spacing(0.6)),

                          marginTop: isButtonIsMore && !positionOfFolderViewWithPakeepViewIsBottom && theme.spacing(1.4)
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

  useEffect(() => handleDrawerWidthThunk(width), [width, isFolderOpen]);
  useEffect(() => handleDrawerWidthThunk(0), [isMenuOpen]);

  return f;
};

Folders.propTypes = {
  folders: PropTypes.shape({
    map: PropTypes.func
  }),
  handleChange: PropTypes.func,
  handleDrawerWidthThunk: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  navigationViewLike: PropTypes.string,
  positionOfFolderViewWithPakeepViewIsBottom: PropTypes.bool,
  value: PropTypes.any
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
