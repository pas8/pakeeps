import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const diiaHeadRegular = {
  fontFamily: 'diiaHeadRegular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: './fonts/web/e-UkraineHead-Regular.woff2',
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

export const themeColors = {
  primaryMain: '#ffff8d',
  secondaryMain: '#00b0ff',
  whiteRgbaColorWith0dot8valueOfAlfaCanal: 'rgba(255,255,255,0.8)',
  whiteRgbaColorWith0dot42valueOfAlfaCanal: 'rgba(255,255,255,0.42)',
  whiteRgbaColorWith0dot96valueOfAlfaCanal: 'rgba(255,255,255,0.96)',
};

export const breakpoints = [1920, 1280, 960, 600, 400, 0];

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

    contrastThreshold: 3,
    tonalOffset: 0.3
  })
);
