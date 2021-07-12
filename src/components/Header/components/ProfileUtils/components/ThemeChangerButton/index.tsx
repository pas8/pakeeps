import { IconButton, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import Switch from 'react-switch';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { getViewOfThemeChangerButton } from 'store/modules/Settings/selectors';

const ThemeChangerButton: FC = () => {
  const viewOfThemeChangerButton = useSelector(getViewOfThemeChangerButton);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const themePlaceholderFunc = () => {
    // enqueueSnackbar({ message: 'White theme sucks, I am sr, just unluckky 😅', severity: 'info' });
    enqueueSnackbar({
      message: 'U can theme theme in the setting, but remember that, white theme sucks 😅',
      severity: 'info'
    });
  };
  const handleDiameter = 24;
  const circleColor = '#d8d8d8';
  const backgroundColor = '#5e5e5e';

  const switchIcon = (icon: any) => (
    <Grid container alignItems={'center'} justify={'center'}>
      <Typography variant={'subtitle1'}>{icon} </Typography>
    </Grid>
  );
  const switchProps = {
    onChange: themePlaceholderFunc,
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
      {viewOfThemeChangerButton && (
        <>
          {viewOfThemeChangerButton === 'iconButton' && (
            <Grid onClick={themePlaceholderFunc} container>
              <Brightness4OutlinedIcon />
            </Grid>
          )}
          {viewOfThemeChangerButton === 'switch' && (
            <Grid container alignItems={'center'}>
              <Switch {...switchProps} />
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default ThemeChangerButton;
