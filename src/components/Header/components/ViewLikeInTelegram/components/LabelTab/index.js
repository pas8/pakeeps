import SearchIcon from '@material-ui/icons/Search';
import { Button, Grid, makeStyles, Tab, Tabs, withStyles } from '@material-ui/core';
import PinIcon from 'components/Icons/components/PinIcon';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';

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

const LabelTab = ({ folders }) => {
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

const mapStateToProps = ({ app: { folders } }) => ({ folders });
// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(LabelTab);
