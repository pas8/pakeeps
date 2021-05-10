import PropTypes from 'prop-types';
import { IconButton, Grid, Typography } from '@material-ui/core';
import Switch from 'react-switch';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';

const ThemeChangerButton = ({ viewOfThemeChangerButton }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const themeOlaceholderFunc = () =>
    enqueueSnackbar({ message: 'White theme sucks, I am sr, just unluckky 😅', severity: 'info' });

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
      {viewOfThemeChangerButton && (
        <>
          {viewOfThemeChangerButton === 'iconButton' && (
            <IconButton aria-label={'Notifications'} color={'inherit'} onClick={themeOlaceholderFunc}>
              <Brightness4OutlinedIcon />
            </IconButton>
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

ThemeChangerButton.propTypes = { viewOfThemeChangerButton: PropTypes.oneOf(['string', 'bool']) };

const mapStateToProps = ({ settings: { viewOfThemeChangerButton } }) => ({ viewOfThemeChangerButton });

export default connect(mapStateToProps, null)(ThemeChangerButton);
