import { createMuiTheme, Grid, makeStyles, responsiveFontSizes, ThemeProvider, Button } from '@material-ui/core';
import { colord } from 'colord';
import { LayoutChildrenType, RootStoreType } from 'models/types';
import PropTypes from 'prop-types';
import { ReactNode, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { toDeletePakeep } from 'store/modules/App/actions';
import { getColor } from 'store/modules/Color/hooks';
import mix from 'mix-color';
import { mapValues } from 'lodash';
import { useAlpha } from 'hooks/useAlpha.hook';

export type LayoutType = typeof ThemeLayout;

const ThemeLayout = ({ children, ...props }: any) => {
  const { breakpointsValues, theme: themeColors, textColorCoefficients } = useSelector(getColor);

  const { xs, sm, md, lg, xl } = breakpointsValues;
  const breakpointsArr = [xl, lg, md, sm, xs];

  const dispatch = useDispatch();

  const textColors = mapValues(textColorCoefficients, coefficient => useAlpha(themeColors.textColor, coefficient));
  const theme = responsiveFontSizes(
    createMuiTheme({
      breakpointsArr,
      breakpoints: {
        //@ts-ignore
        values: breakpointsValues
      },
      // direction: 'rtl',
      shape: { borderRadius: themeColors.borderRadius },
      palette: {
        success: { main: '#4caf50' },
        type: themeColors.type,

        text: {
          primary: textColors.max,
          secondary: textColors.high,
          hint: textColors.medium,
          disabled: textColors.min
        },
        primary: {
          main: themeColors.primaryMain
        },
        secondary: {
          main: themeColors.secondaryMain
        },
        //@ts-ignore
        mixed: {
          main: mix(themeColors.primaryMain, themeColors.secondaryMain, 0.42)
        },
        //@ts-ignore
        highEmphasis: {
          main: textColors.high
        },
        mediumEmphasis: {
          main: textColors.medium
        },
        maxEmphasis: {
          main: textColors.max
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
