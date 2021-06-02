import { createMuiTheme, Grid, makeStyles, responsiveFontSizes } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({}));

const ThemeLayout = ({ children ,theme:themeColors}) => {
  const classes = useStyles();


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
        }
      },
      contrastThreshold: 2,
      tonalOffset: 0.4
    })
  );

  const array1 = [Grid, Grid, Grid, Grid];

  const reducer = (accumulator, currentValue) => <currentValue>{accumulator}</currentValue>  

  console.log(array1.reduce(reducer));

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeLayout.propTypes = {};
const mapStateToProps = ({ app: { theme } }) => ({ theme });

export default connect(mapStateToProps, mapDispatchToProps)(ThemeLayout);
