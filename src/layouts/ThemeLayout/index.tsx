import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import { mapValues } from 'lodash';
import mix from 'mix-color';
import { useSelector } from 'react-redux';

import { getColor } from 'store/modules/Color/hooks';
import { useAlpha } from 'hooks/useAlpha.hook';

export type LayoutType = typeof ThemeLayout;

const ThemeLayout = ({ children, ...props }: any) => {
  const { breakpointsValues, theme: themeColors, textColorCoefficients } = useSelector(getColor);

  const { xs, sm, md, lg, xl } = breakpointsValues;
  const breakpointsArr = [xl, lg, md, sm, xs];

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
