import { createMuiTheme, Grid, makeStyles, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { operateToAddNewPakeep } from 'store/modules/App/operations';

const ThemeLayout = ({ children, theme: themeColors, breakpointsValues }) => {
  const { xs, sm, md, lg, xl } = breakpointsValues;
  const breakpointsArr = [xl, lg, md, sm, xs];

  const j = ['pakeeps'];

  // const { pakeeps, labels } = useSelector(({ app }) => ({ app, labels }));
  // console.log(pakeeps); 
  operateToAddNewPakeep({
    newPakeep: {
      title: 'Placeholder 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isInBookmark: true,
      isFavorite: true,
      color: 'default',
      labels: ['label3', 'label1', 'label0', 'label2'],
      isArchived: false,
      events: [],
      id: 'pakeep1',
      isPinned: true,
      isCheckBoxes: true,
      backgroundColor: 'default'
    }
  });

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
