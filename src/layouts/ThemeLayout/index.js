import { createMuiTheme, Grid, makeStyles, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';

const ThemeLayout = ({ children, theme: themeColors }) => {
  const theme = responsiveFontSizes(
    createMuiTheme({
      direction: 'rtl',
      palette: {
        success: { main: '#4caf50' },
        type: 'dark',
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
const mapStateToProps = ({ app: { theme } }) => ({ theme });

export default connect(mapStateToProps)(ThemeLayout);
