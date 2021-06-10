import { createMuiTheme, Grid, makeStyles, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { h } from 'store/modules/App/operations';

const ThemeLayout = ({ children, theme: themeColors, breakpointsValues }) => {
  const { xs, sm, md, lg, xl } = breakpointsValues;
  const breakpointsArr = [xl, lg, md, sm, xs];

  

h[0]({newEvent: [], pakeepId: ';;dflqwfbhwjs' })

  const theme = responsiveFontSizes(
    createMuiTheme({
      breakpointsArr,
      breakpoints: {
        values: breakpointsValues
      },
      direction: 'rtl',
      palette: {
        success: { main: '#4caf50' },
        type: themeColors?.type,
        primary: {
          main: themeColors.primaryMain
        },
        secondary: {
          main: themeColors.secondaryMain
        },
        highEmphasis: {
          main: themeColors?.highEmphasis
        },
        mediumEmphasis: {
          main: themeColors?.mediumEmphasis
        },
        maxEmphasis: {
          main: themeColors?.maxEmphasis
        },
        background: {
          paper: themeColors?.paperMain,
          default: themeColors?.defaultBackgroundMain
        }
      },
      contrastThreshold: 2,
      tonalOffset: 0.4
    })
  );

  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
};

ThemeLayout.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.shape({
    primaryMain: PropTypes.any,
    secondaryMain: PropTypes.any
  })
};
const mapStateToProps = ({ color: { theme, breakpointsValues } }) => ({ theme, breakpointsValues });

export default connect(mapStateToProps)(ThemeLayout);
