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

  const handleDiameter = 24;
  const circleColor = '#d8d8d8';
  const backgroundColor = '#5e5e5e';

  const switchIcon = (icon: any) => (
    <Grid container alignItems={'center'} justify={'center'}>
      <Typography variant={'subtitle1'}>{icon} </Typography>
    </Grid>
  );
  // const switchProps = {
  //   onChange: themePlaceholderFunc,
  //   checked: true,
  //   offHandleColor: circleColor,
  //   onHandleColor: circleColor,
  //   offColor: backgroundColor,
  //   handleDiameter,
  //   onColor: backgroundColor,
  //   checkedIcon: switchIcon('🌜'),
  //   uncheckedIcon: switchIcon('🌞')
  // };

  return (
    <>
      {viewOfThemeChangerButton && (
        <>
          {viewOfThemeChangerButton === 'iconButton' && (
            <Grid container alignItems={'center'} justify={'center'}>
              <Brightness4OutlinedIcon />
            </Grid>
          )}
          {/* {viewOfThemeChangerButton === 'switch' && (
            <Grid container alignItems={'center'}>
              <Switch {...switchProps} />
            </Grid>
          )} */}
        </>
      )}
    </>
  );
};

export default ThemeChangerButton;
