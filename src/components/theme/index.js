import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';


export const themeColors = {
  primaryMain: '#ffff8d',
  secondaryMain: '#00b0ff',
  highEmphasis: 'rgba(255,255,255,0.8)',
  mediumEmphasis: 'rgba(255,255,255,0.6)',
  maxEmphasis: 'rgba(255,255,255,0.96)',
  type:'dark'
};

export const breakpointsObj = { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 };

const { xs, sm, md, lg, xl } = breakpointsObj;
export const breakpoints = [xl, lg, md, sm, xs];

export const theme = responsiveFontSizes(
  createMuiTheme({
    // breakpoints: {
    //   xs: breakpoints[4],
    //   sm: breakpoints[3],
    //   md: breakpoints[2],
    //   lg: breakpoints[1],
    //   xl: breakpoints[0]
    // },
    direction: 'rtl',
    palette: {
      success: { main: '#4caf50' },
      type: 'dark',
      primary: {
        main: themeColors.primaryMain
      },
      secondary: {
        main: themeColors.secondaryMain
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [diiaHeadRegular]
        }
      }
    },

    contrastThreshold: 2,
    tonalOffset: 0.4
  })
);
