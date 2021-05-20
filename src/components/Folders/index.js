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
  containerOfFolderWithPakeepsView: {
    margin: theme.spacing(10.8, 0, 0, 0),
    padding: ({ isMenuOpen }) => theme.spacing(0, isMenuOpen ? 0 : 0, 0, 2.4),

    '& button': {
      display: 'flex',

      flexWrap: 'nowrap',
      whiteSpace: ' pre',
      justifyContent: ({ isMenuOpen }) => (!isMenuOpen ? 'center' : 'flex-start'),
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
  },
  textOfFolderWithPakeepsView: {
    padding: theme.spacing(0, 0, 0, 0)
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

const Folders = ({ value, handleChange, folders, handleDrawerWidthThunk, isMenuOpen, navigationViewLike }) => {
  const classes = useStyles({ isMenuOpen });
  const [ref, { width }] = useMeasure();

  const g = usePrevious(width);
  const o = !isMenuOpen && _.min([g, width]);
  useEffect(() => handleDrawerWidthThunk(o), [width]);
  console.log(width);
  const FoldersContainer = isMenuOpen ? Drawer : Grid;

  return (
    <Grid
      ref={ref}
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
          {folders.map(({ title, iconName }) => {
            const [icon] = useTakeIcon(iconName || 'infinity');
            return <Tab aria-label={title} icon={icon} />;
            // return <Tab icon={icon} aria-label={title} />;
          })}
        </Tabs>
      )}

      {navigationViewLike === 'pakeeps' && (
        <ToggleButtonGroup orientation="vertical" value={value} exclusive onChange={handleChange} exclusive>
          {folders.map(({ title, iconName }, idx) => {
            const [icon] = useTakeIcon(iconName || 'infinity');
            return (
              <ToggleButton value={idx} aria-label="list">
                {icon} {isMenuOpen && <Grid className={classes.textOfFolderWithPakeepsView}> {title} </Grid>}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      )}
    </Grid>
  );
};

Folders.propTypes = {};

export default Folders;
