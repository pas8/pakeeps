import SearchIcon from '@material-ui/icons/Search';
import { Button, Grid, makeStyles, Tab, Tabs, withStyles } from '@material-ui/core';
import PinIcon from 'components/Icons/components/PinIcon';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { handleCurrentFolderPropertyIdxThunk } from 'store/modules/App/operations';

const useStyles = makeStyles(theme => ({
  container: {
    '& .MuiTouchRipple-root': {
      borderRadius: theme.spacing(0.4)
    },
    flexGrow: 1,
    width: '100%',

    '& button': {
      textTransform: 'none',
      color: '#fff',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(16),
      '&:focus': {
        opacity: 1
      },
      minHeight: 0,
      marginTop: theme.spacing(1.4),
      padding: theme.spacing(0.8, 1.8),
      '& span': {
        flexDirection: 'row',
        '& svg': {
          fontSize: '1em',
          margin: theme.spacing(0.8, 0.4, 0, 0)
        }
      }
    }
  }
}));

const StyledTabs = withStyles(theme => ({
  indicator: {
    height: 2 * 1.6,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: `${80 - 4}%`,
      borderRadius: '4% 4% 0% 0% / 100% 100% 0% 0%  ',
      backgroundColor: themeColors.primaryMain
    }
  }
}))(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const LabelTab = ({ folders, handleCurrentFolderPropertyIdxThunk, currentFolderPropertyIdx }) => {

  const handleTabIdxChange = (placeholder, folderName) => {
    handleCurrentFolderPropertyIdxThunk(folderName)
  };

  const classes = useStyles();

  // const styledTabsProps = {
  //   value,
  //   onChange:handleTabIdxChange,
  // }
  return (
    <Grid className={classes.container}>
      <StyledTabs
        value={currentFolderPropertyIdx}
        onChange={handleTabIdxChange}
        indicatorColor={'primary'}
        textColor={'primary'}
        variant={'scrollable'}
        scrollButtons={'off'}
        aria-label={'scrollable auto tabs example'}
      >
        {folders.map(({ title, iconName, key }) => {
          const [icon] = useTakeIcon(iconName);
          return <Tab key={key} label={title} wrapper icon={icon} />;
        })}
      </StyledTabs>
    </Grid>
  );
};

LabelTab.propTypes = {};

const mapStateToProps = ({ app: { folders, currentFolderPropertyIdx } }) => ({ folders, currentFolderPropertyIdx });
const mapDispatchToProps = dispatch => ({
  handleCurrentFolderPropertyIdxThunk: folderIdx => dispatch(handleCurrentFolderPropertyIdxThunk(folderIdx))
});

export default connect(mapStateToProps, mapDispatchToProps)(LabelTab);