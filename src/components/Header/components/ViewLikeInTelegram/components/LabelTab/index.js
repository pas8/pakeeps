import { Button, Grid, makeStyles, Tab, Tabs, withStyles } from '@material-ui/core';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    '& .MuiTouchRipple-root': {
      borderRadius: theme.spacing(0.4)
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
      width: '80%',
      borderRadius: '4% 4% 0% 0% / 100% 100% 0% 0%  ',
      backgroundColor: themeColors.primaryMain
    }
  }
}))(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    '&:focus': {
      opacity: 1
    },
    minHeight:0,
    marginTop: theme.spacing(1.4),
    padding: theme.spacing(0.8,1.8)
  }
}))(props => <Tab {...props} />);

const LabelTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  return (
    <Grid className={classes.container}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
      >
        <StyledTab label="Workflows" />
        <StyledTab label="Datasets" />
        <StyledTab label="Connections" />
      </StyledTabs>
    </Grid>
  );
};

LabelTab.propTypes = {};

export default LabelTab;
