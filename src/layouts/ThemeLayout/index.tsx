import { createMuiTheme, Grid, makeStyles, responsiveFontSizes, ThemeProvider, Button } from '@material-ui/core';
import { LayoutChildrenType, RootStoreType } from 'models/interfaces';
import PropTypes from 'prop-types';
import { ReactNode, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { toDeletePakeep } from 'store/modules/App/actions';
import { useAppSelector } from 'store/modules/App/hooks';
import { useColorSelector } from 'store/modules/Color/hooks';

const ThemeLayout = ({ children }: LayoutChildrenType) => {
  const { breakpointsValues, theme: themeColors } = useSelector(({ color }: RootStoreType) => color);

  const { xs, sm, md, lg, xl } = breakpointsValues;
  const breakpointsArr = [xl, lg, md, sm, xs];
  const { pakeeps } = useSelector(({ app }: RootStoreType) => app);

  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(toDeletePakeep({ pakeepId: 'pakeep7' }));
  };

  console.log(pakeeps);

  const theme = responsiveFontSizes(
    createMuiTheme({
      breakpointsArr,
      breakpoints: {
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
      },
      contrastThreshold: 2,
      tonalOffset: 0.4
    })
  );

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={onClick}>FUCK</Button>
      {children}
    </ThemeProvider>
  );
};

export default ThemeLayout;
