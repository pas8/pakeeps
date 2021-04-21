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

export const theme = responsiveFontSizes(
  createMuiTheme({
    direction: 'rtl',
    palette: {
      success: { main: '#4caf50' },
      type: 'dark',
      primary: {
        main: '#ffff8d'
      },
      secondary: {
        main: '#00b0ff'
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
