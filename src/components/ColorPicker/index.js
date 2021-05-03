import { useEffect, useState } from 'react';
import { HexColorPicker, RgbaColorPicker } from 'react-colorful';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import { Box, Button, ButtonGroup, colors, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { themeColors } from 'components/theme';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
import IconButtonByPas from 'components/IconButton';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import clsx from 'clsx';
import CenteredGrid from 'components/CenteredGrid';
import CustomColor from './components/CustomColor';
import { colord } from 'colord';
import CustomizationButton from './components/CustomizationButton';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';
import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import ColorFormatIcon from 'components/Icons/components/ColorFormatIcon';
import IconUtilsOfColorPicker from './components/IconsUtils';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  container: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    }),
    paddingBottom: theme.spacing(0.4)
  },
  elementOfGridColorPicker: {
    width: theme.spacing(16 * 0.42),
    height: theme.spacing(16 * 0.42),
    margin: theme.spacing(0.8),
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0)',
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen
    }),
    cursor: 'pointer'
  },
  containerOfElementOfGridColorPicker: {
    margin: theme.spacing(1.8)
  },
  extendedElementOfGridColorPicker: {
    width: theme.spacing((8 * 0.8) / 2),
    height: theme.spacing((8 * 0.8) / 2)
    // margin: theme.spacing(0.2),
    // borderRadius: 0,
  },
  containerOfExtendedElementOfGridColorPicker: {
    margin: theme.spacing(1.4),
    borderRadius: '10px'
  },
  elementOfGridColorPickerWithBorder: {
    borderColor: 'rgba(255,255,255,1)',
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  iconUtilsContainer: {
    '& .MuiSvgIcon-root': { width: theme.spacing(2 / (0.8 - 0.1)) }
  },
  iconUtilsContainerGradientStatusIsTrue: {
    '& button': { transform: 'scale(1.1)' },
    // padding:theme.spacing(0.8),

    padding: theme.spacing(1.4, 0.8),
    borderLeft: '2px solid rgba(255, 255, 255,0.4)'
    // '& .MuiSvgIcon-root': { width: theme.spacing(10) },

    // '& .MuiSvgIcon-root': { width: theme.spacing(4) }
  }
}));

const ColorPickerByPas = () => {
  const nullityColor = themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal;

  const [color, setColor] = useState(nullityColor);
  const customColorsInHexFormat = colord(color).toHex();

  const [statusState, setStatusState] = useState({
    saved: false,
    extended: false,
    customization: false,
    customFormats: false,
    customColor: false,
    gradient: false
  });

  const [gradientColor, setGradientColor] = useState(customColorsInHexFormat);
  const [gradientAngle, setGradientAngle] = useState(90);
  const [gradientDirection, setGradientDirection] = useState('linear-gradient');
  const [gradientColorState, setGradientColorState] = useState([
    { color: '#090979', stopDeg: 0, key: '0' },
    { color: '#1f13e5', stopDeg: 42, key: '1' },
    { color: '#00d4ff', stopDeg: 80, key: '2' },
    { color: '#0024ff', stopDeg: 100, key: '3' }
  ]);
  const [gradientFocusedElementState, setGradientFocusedElementState] = useState({
    color: gradientColorState[0].color,
    key: gradientColorState[0].key,
    stopDeg: gradientColorState[0].stopDeg
  });

  const onClickOfPalletteButton = () => {
    setStatusState(state => ({ ...state, customColor: !state.customColor, gradient: false }));
  };

  const onClickOfGradientButton = () => {
    setStatusState(state => ({ ...state, gradient: !state.gradient, extended: true }));
  };
  const onClickOfExtendButton = () => {
    setStatusState(state => ({ ...state, extended: !state.extended }));
  };

  const setCustomizationsStatus = value => setStatusState(state => ({ ...state, customization: value }));

  const [customFormatName, setCustomFormatName] = useState('rgb');

  const classes = useStyles();

  const colorsArr = [
    [{ colorName: 'deepOrange' }, { colorName: 'orange' }, { colorName: 'amber' }, { colorName: 'yellow' }],
    [{ colorName: 'lime' }, { colorName: 'lightGreen' }, { colorName: 'green' }, { colorName: 'teal' }],
    [{ colorName: 'cyan' }, { colorName: 'lightBlue' }, { colorName: 'blue' }, { colorName: 'indigo' }],
    [{ colorName: 'deepPurple' }, { colorName: 'purple' }, { colorName: 'pink' }, { colorName: 'red' }]
  ];
  // const arr = colorsArr.map(el => console.log(colors[el.colorName]));
  const [popoverAndMenuState, setPopoverAndMenuState] = useState({
    name: 'null',
    menuIsOpen: false,
    popoverIsOpen: true,
    onMenuClose: null
  });

  useEffect(() => {
    const reduceFunc = (sum, { color, stopDeg }, idx) =>
      `${sum} ${color} ${stopDeg}${gradientColorState.length - 1 === idx ? '%' : '%,'}`;

    const mainPart = _.reduce(gradientColorState, reduceFunc, '');

    const gradientPosition = gradientDirection === 'radial-gradient' ? 'circle' : gradientAngle + 'deg,';
    const gradientRoute = `${gradientDirection}(${gradientPosition}`;

    const gradientColor = `${gradientRoute} ${mainPart})`;

    setGradientColor(gradientColor);
  }, [gradientColorState, gradientDirection, gradientAngle, gradientAngle]);

  useEffect(() => {
    if (color !== nullityColor)
      _.debounce(() => setGradientFocusedElementState(state => ({ ...state, color: customColorsInHexFormat })), 160);
  }, [customColorsInHexFormat]);

  // console.log(gradientsStatus);
  const handlePopoverAndMenuState = value => setPopoverAndMenuState(value);

  const customizationButtonProps = {
    nullityColor,
    customColorsInHexFormat,
    setCustomizationsStatus,
    color
  };

  const handleSetColor = value => setColor(value);

  const onSave = () => console.log('onSave');

  const customColorProps = {
    setColor,
    color,
    nullityColor,
    customColorsInHexFormat,
    customFormatName,
    gradientColor,
    gradientColorState,
    setGradientColorState,
    gradientDirection,
    setGradientDirection,
    gradientAngle,
    setGradientAngle,
    gradientFocusedElementState,
    setGradientFocusedElementState,
    statusState
  };

  const iconUtilsProps = {
    statusState,
    handlePopoverAndMenuState,
    onSave,
    customizationButtonProps,
    color,
    customColorsInHexFormat,
    popoverAndMenuState,
    setCustomFormatName,
    customFormatName,
    onClickOfGradientButton,
    onClickOfExtendButton,
    onClickOfPalletteButton
  };

  console.log(statusState);
  return (
    <Grid className={classes.container}>
      <Grid container direction={statusState.gradient ? 'row' : 'column'}>
        {statusState.customColor ? (
          <CustomColor {...customColorProps} />
        ) : (
          colorsArr.map(arr => {
            const gridRow = arr.map(({ colorName }) => {
              // console.log(colors[colorName.500])

              const namesOfPartsOfGridElement = [
                ['A100', 'A200'],
                ['A400', 'A700']
              ];
              // console.log(namesOfPartsOfGridElement.some(el => colors[colorName][el] === color));
              const correctNamesOfPartsOfGridElementArr = _.flattenDeep(namesOfPartsOfGridElement);
              const isExtendedElementColorCorrect = correctNamesOfPartsOfGridElementArr.some(
                name => colors[colorName][name] === color
              );

              const staticExtendedElement = (
                <Paper className={classes.elementOfGridColorPicker}>
                  {namesOfPartsOfGridElement.map(row => (
                    <Grid container>
                      {row.map(name => {
                        const colorOfElementOfPartsOfGridElementProps = colors[colorName][name];
                        const onClick = () => handleSetColor(colorOfElementOfPartsOfGridElementProps);

                        const elementOfPartsOfGridElementProps = {
                          onClick: onClick,
                          style: { background: colorOfElementOfPartsOfGridElementProps },
                          className: classes.extendedElementOfGridColorPicker
                        };

                        return <Grid {...elementOfPartsOfGridElementProps} />;
                      })}
                    </Grid>
                  ))}
                </Paper>
              );
              const selectedElement = (correctStatus, color, onClickOfSelectElement) => {
                const defaultOnClick = () => handleSetColor(color);
                const onClick = onClickOfSelectElement ?? defaultOnClick;

                const selectedElementPaperContainerProps = {
                  style: { backgroundColor: color },
                  className: clsx(
                    classes.elementOfGridColorPicker,
                    correctStatus ? classes.elementOfGridColorPickerWithBorder : null
                  ),
                  elevation: 8,
                  onClick
                };
                return (
                  <Paper {...selectedElementPaperContainerProps}>
                    <CenteredGrid>{correctStatus && <DoneOutlineOutlinedIcon />}</CenteredGrid>
                  </Paper>
                );
              };

              const nonExtendedElementColor = colors[colorName][500];
              const isNonExtendedElementColorCorrect = color === nonExtendedElementColor;

              const nonExtendedElement = selectedElement(isNonExtendedElementColorCorrect, nonExtendedElementColor);

              const extendedElement = isExtendedElementColorCorrect
                ? selectedElement(true, color, () => handleSetColor(false))
                : staticExtendedElement;

              const elementOfGridColorPicker = statusState.extended ? extendedElement : nonExtendedElement;

              return elementOfGridColorPicker;
            });

            return (
              <Grid item>
                <Grid container>{gridRow}</Grid>
              </Grid>
            );
          })
        )}
        {statusState.gradient && (
          <Box className={classes.iconUtilsContainerGradientStatusIsTrue}>
            <Grid
              container
              justify={'space-between'}
              alignItems={'center'}
              direction={'column'}
              style={{ height: '100%' }}
            >
              <IconUtilsOfColorPicker {...iconUtilsProps} />
            </Grid>
          </Box>
        )}
      </Grid>
      {!statusState.gradient && (
        <Box m={0.4} mb={0} mt={0.8} className={classes.iconUtilsContainer}>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <IconUtilsOfColorPicker {...iconUtilsProps} />
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default ColorPickerByPas;
