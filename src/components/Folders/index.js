import { Grid, makeStyles, Tabs, Tab, Drawer, Typography } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import PropTypes from 'prop-types';
import { useMeasure, usePrevious } from 'react-use';
import { useEffect } from 'react';
import _ from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { colord } from 'colord';
import { themeColors } from 'components/theme';
const useStyles = makeStyles(theme => ({
  containerOfFolderWithPakeepsView: ({ positionOfFolderViewWithPakeepViewIsBottom }) => ({
    margin: theme.spacing(10.8, 0, 0, 0),
    padding: ({ isMenuOpen }) => theme.spacing(0, isMenuOpen ? 0 : 0, 0, 2.4),

    // width:'20px',
    '& .MuiToggleButtonGroup-root': {
      margin: ({ positionOfFolderViewWithPakeepViewIsBottom }) =>
        theme.spacing(0, positionOfFolderViewWithPakeepViewIsBottom ? 2.8 : 0, 2.8, 0)
    },
    '& button': {
      display: 'flex',
      flexWrap: 'nowrap',
      // height:'100%',
      display: positionOfFolderViewWithPakeepViewIsBottom ? 'block' : 'flex',
      whiteSpace: 'pre',
      justifyContent: ({ isMenuOpen }) => (!isMenuOpen ? 'center' : 'flex-start'),
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
  textOfFolderWithPakeepsView: ({ positionOfFolderViewWithPakeepViewIsBottom }) => ({
    writingMode: 'vertical-rl',
    textOrientation: 'upright',
    flexWrap: positionOfFolderViewWithPakeepViewIsBottom ? 'wrap' : 'nowrap',
    justifyContent:'flex-end',
    // width:'100%',
    // height:'100%',
alignItems:'center',
    padding: theme.spacing(0, 0, 0, positionOfFolderViewWithPakeepViewIsBottom ? 0 : 0.8),
  }),
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
  positionOfFolderViewWithPakeepViewIsBottom
}) => {
  const classes = useStyles({ isMenuOpen, positionOfFolderViewWithPakeepViewIsBottom });
  const [ref, { width }] = useMeasure();

  const previousWidth = usePrevious(width);
  const correctAndOptimizatedWidth = !isMenuOpen && _.min([previousWidth, width]);
  useEffect(() => handleDrawerWidthThunk(correctAndOptimizatedWidth), [width]);

  const flattenFolders = _.flatten(folders);

  return (
    <Grid
      ref={ref}
      container
      direction={positionOfFolderViewWithPakeepViewIsBottom ? 'row' : 'column'}
      className={navigationViewLike === 'googleKeep' ? classes.container : classes.containerOfFolderWithPakeepsView}
    >
      {navigationViewLike === 'googleKeep' && (
        <Tabs
          orientation={'vertical'}
          variant={'scrollable'}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth={false}
          aria-label={'Vertical folders'}
          // className={classes.tabs}
        >
          {flattenFolders.map(({ title, iconName }) => {
            const [icon] = useTakeIcon(iconName || 'infinity');
            return <Tab aria-label={title} icon={icon} />;
            // return <Tab icon={icon} aria-label={title} />;
          })}
        </Tabs>
      )}

      {navigationViewLike === 'pakeeps' &&
        folders.map(arr => {
          return (
            <ToggleButtonGroup
              orientation={positionOfFolderViewWithPakeepViewIsBottom ? 'horizontal' : 'vertical'}
              value={value}
              exclusive
              onChange={handleChange}
              exclusive
            >
              {arr?.map(({ title, iconName, property, id }) => {
                const findedEl = _.findIndex(flattenFolders, ({ id: folderId }) => folderId === id);
                // console.log(findedEl)
                const [icon] = useTakeIcon(iconName ? iconName : (property === 'label' && 'label') || 'infinity');
                return (
                  <ToggleButton value={findedEl} aria-label={title}>
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
          );
        })}
    </Grid>
  );
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
