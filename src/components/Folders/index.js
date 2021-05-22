import { Grid, makeStyles, Tabs, Tab, Drawer, Typography, Collapse, Slide } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import PropTypes from 'prop-types';
import { useMeasure, usePrevious, useSize } from 'react-use';
import { useEffect } from 'react';
import _ from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { colord } from 'colord';
import { themeColors } from 'components/theme';
const useStyles = makeStyles(theme => ({
  containerOfFolderWithPakeepsView: ({
    isMenuOpen,
    positionOfFolderViewWithPakeepViewIsBottom,
    isFolderViewWithPakeepViewAlignToCenter,
    positionOfFolderViewWithPakeepViewIsRight
  }) => ({
    margin: theme.spacing(isFolderViewWithPakeepViewAlignToCenter ? 8 : 8 + 1.4, 0, 0, 0),
    justifyContent: 'center',
    '& .MuiToggleButtonGroup-root': {
      width: positionOfFolderViewWithPakeepViewIsBottom ? 'auto' : '100%',
      margin: theme.spacing(
        1.4,
        positionOfFolderViewWithPakeepViewIsRight ? 1.4 : positionOfFolderViewWithPakeepViewIsBottom ? 2.4 : 0,
        1.4,
        !positionOfFolderViewWithPakeepViewIsBottom && !positionOfFolderViewWithPakeepViewIsRight ? 1.4 : 0
      )
    },
    '& button': {
      flexWrap: 'nowrap',
      height: '100%',
      display: positionOfFolderViewWithPakeepViewIsBottom && isMenuOpen ? 'block' : 'flex',
      whiteSpace: 'pre',
      justifyContent: !isMenuOpen ? 'center' : 'flex-start',
      flexDirection: 'column',
      '& svg': {
        fontSize: '2.28em'
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
  isFolderViewWithPakeepViewAlignToCenter
}) => {
  const classes = useStyles({
    isMenuOpen,
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight,
    isFolderViewWithPakeepViewAlignToCenter
  });

  const flattenFolders = _.flatten(folders);

  const utilsFolders = [
    [
      { title: 'Open settings', iconName: 'settings', id: 'folder-92', property: 'settings' },
      { title: 'Hide folders', iconName: 'visibility', onClick: handleHideFolder }
    ]
  ];
  const allFolders = [...folders, ...utilsFolders];
  const [f, { width }] = useSize(() => (
    <Grid
      // ref={ref}
      container
      direction={positionOfFolderViewWithPakeepViewIsBottom ? 'row' : 'column'}
      className={navigationViewLike === 'googleKeep' ? classes.container : classes.containerOfFolderWithPakeepsView}
    >
      {navigationViewLike === 'pakeeps' &&
        allFolders.map(arr => {
          return (
            <Slide in={isFolderOpen} mountOnEnter unmountOnExit direction="right">
              {/* <Grid container> */}
              <ToggleButtonGroup
                orientation={positionOfFolderViewWithPakeepViewIsBottom ? 'horizontal' : 'vertical'}
                value={value}
                exclusive
                onChange={handleChange}
                exclusive
              >
                {arr?.map(({ title, iconName, property, id, onClick = null }) => {
                  const findedEl = _.findIndex(flattenFolders, ({ id: folderId }) => folderId === id);
                  // console.log(findedEl)
                  const [icon] = useTakeIcon(iconName ? iconName : (property === 'label' && 'label') || 'infinity');
                  return (
                    <ToggleButton
                      value={findedEl}
                      aria-label={title}
                      onClick={e => {
                        onClick && e.preventDefault();
                        onClick();
                      }}
                    >
                      {icon}
                      {isMenuOpen && (
                        <Grid className={classes.textOfFolderWithPakeepsView} container>
                          {title}
                        </Grid>
                      )}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
              {/* </Grid> */}
            </Slide>
          );
        })}
    </Grid>
  ));


  useEffect(() => handleDrawerWidthThunk(width), [width, isFolderOpen]);
  useEffect(() => handleDrawerWidthThunk(  0), [isMenuOpen]);

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
