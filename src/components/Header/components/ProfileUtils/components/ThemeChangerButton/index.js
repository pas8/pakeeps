import PropTypes from 'prop-types';
import { Badge, IconButton, makeStyles, Grid, Typography } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Switch from 'react-switch';
import { useState } from 'react';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({}));

const ThemeChangerButton = () => {
  const classes = useStyles();
  const [state, setState] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const themeOlaceholderFunc = () => enqueueSnackbar({ message: 'White theme sucks, unluckky', severity: 'info' });

  const handleDiameter = 24;
  const circleColor = '#d8d8d8';
  const backgroundColor = '#5e5e5e';

  const switchIcon = icon => (
    <Grid container alignItems={'center'} justify={'center'}>
      <Typography variant={'subtitle1'}>{icon} </Typography>
    </Grid>
  );
  const switchProps = {
    onChange: themeOlaceholderFunc,
    checked: true,
    offHandleColor: circleColor,
    onHandleColor: circleColor,
    offColor: backgroundColor,
    handleDiameter,
    onColor: backgroundColor,
    checkedIcon: switchIcon('🌜'),
    uncheckedIcon: switchIcon('🌞')
  };

  return (
    <>
      <IconButton aria-label={'Notifications'} color={'inherit'}>
        <Brightness4OutlinedIcon />
      </IconButton>
      <Grid container alignItems={'center'}>
        <Switch {...switchProps}/>
      </Grid>
    </>
  );
};

ThemeChangerButton.propTypes = {};

export default ThemeChangerButton;
