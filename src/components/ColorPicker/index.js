import { useState } from 'react';
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
  }
}));

const ColorPickerByPas = () => {
  const nullityColor = themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal;
  const [color, setColor] = useState(nullityColor);
  const [savedStatus, setSavedStatus] = useState(false);
  const [transparencyStatus, setTransparencyStatus] = useState(false);
  const [extendMoreColorsStatus, setExtendMoreColorsStatus] = useState(false);
  const [customizationsStatus, setCustomizationsStatus] = useState(false);
  const [customColorsStatus, setCustomColorsStatus] = useState(false);
  const [customFormatsStatus, setCustomFormatsStatus] = useState(false);
  const [buttonCustomizationHoverStatus, setButtonCustomizationHoverStatus] = useState(false);
  const classes = useStyles();
  const customColorsInHexFormat = colord(color).toHex();

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

  const handlePopoverAndMenuState = value => setPopoverAndMenuState(value);

  const handleTransparencyColorPickerStatus = () => setTransparencyStatus(state => !state);
  const handleExtendMoreColorsStatus = () => setExtendMoreColorsStatus(state => !state);
  const handleCustomizationStatus = () => setCustomizationsStatus(state => !state);
  const handleCustomColorStatus = () => setCustomColorsStatus(state => !state);
  const handleCustomColorFormatStatus = () => setCustomFormatsStatus(state => !state);

  const customizationButtonProps = {
    nullityColor,
    customColorsInHexFormat,
    buttonCustomizationHoverStatus,
    setCustomizationsStatus,
    color,
    onMouseEnter: () => setButtonCustomizationHoverStatus(true),
    onMouseLeave: () => setButtonCustomizationHoverStatus(false)
  };

  const handleSetColor = value => setColor(value);

  const onSave = () => console.log('onSave');

  const customColorProps = {
    setColor,
    color,
    transparencyStatus,
    nullityColor,
    setTransparencyStatus,
    customColorsInHexFormat
  };

  const iconUtilsProps = {
    handleCustomColorStatus,
    handleCustomizationStatus,
    handleExtendMoreColorsStatus,
    handleTransparencyColorPickerStatus,
    handlePopoverAndMenuState,
    onSave,
    customColorsStatus,
    customizationButtonProps,
    transparencyStatus,
    extendMoreColorsStatus,
    color,
    customColorsInHexFormat,
    popoverAndMenuState,
    handleCustomColorFormatStatus,
    customFormatsStatus
  };

  return (
    <Grid className={classes.container}>
      <Grid container direction={'column'}>
        {customColorsStatus ? (
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
                          style: { backgroundColor: colorOfElementOfPartsOfGridElementProps },
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

              const elementOfGridColorPicker = extendMoreColorsStatus ? extendedElement : nonExtendedElement;

              return elementOfGridColorPicker;
            });

            return (
              <Grid item>
                <Grid container>{gridRow}</Grid>
              </Grid>
            );
          })
        )}
      </Grid>
      <Box m={0.4} mb={0} mt={0.8} className={classes.iconUtilsContainer}>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <IconUtilsOfColorPicker {...iconUtilsProps} />
        </Grid>
      </Box>
    </Grid>
  );
};

export default ColorPickerByPas;
