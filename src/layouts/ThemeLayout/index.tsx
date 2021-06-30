import { createMuiTheme, Grid, makeStyles, responsiveFontSizes, ThemeProvider, Button } from '@material-ui/core';
import { LayoutChildrenType, RootStoreType } from 'models/types';
import PropTypes from 'prop-types';
import { ReactNode, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { toDeletePakeep } from 'store/modules/App/actions';
import { getColor } from 'store/modules/Color/hooks';

const ThemeLayout = ({ children }: LayoutChildrenType) => {
  const { breakpointsValues, theme: themeColors } = useSelector(getColor);

  const { xs, sm, md, lg, xl } = breakpointsValues;
  const breakpointsArr = [xl, lg, md, sm, xs];

  const dispatch = useDispatch();

  const theme = responsiveFontSizes(
    createMuiTheme({
      breakpointsArr,
      breakpoints: {
        //@ts-ignore
        values: breakpointsValues
      },
      direction: 'rtl',
      palette: {
        success: { main: '#4caf50' },
        type: themeColors.type,
        primary: {
          main: themeColors.primaryMain
        },
        secondary: {
          main: themeColors.secondaryMain
        },
        //@ts-ignore
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
      }
    })
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeLayout;
