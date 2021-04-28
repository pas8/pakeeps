import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import { Box, Button, colors, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { themeColors } from 'components/theme';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
import IconButtonByPas from 'components/IconButton';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import clsx from 'clsx';
import CenteredGrid from 'components/CenteredGrid';

const useStyles = makeStyles(theme => ({
  container: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    }),
    paddingBottom: theme.spacing(0.4),

    '& .react-colorful': {
      padding: theme.spacing(0, 1),
      width: theme.spacing(42)
    },
    '& .react-colorful__pointer': {
      borderRadius: theme.spacing(0.8),
      width: theme.spacing(2.8),
      height: theme.spacing(2.8),
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: '3px solid rgba(255, 255, 255,0.8)',
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.complex
      }),
      '&:hover': {
        borderColor: 'rgba(255, 255, 255,0.96)'
      }
    },
    '& .react-colorful__alpha': {
      order: -1
    },
    '& .react-colorful__hue,.react-colorful__alpha ': {
      borderRadius: theme.spacing(0.8),
      margin: theme.spacing(2, 0),
      height: theme.spacing(2)
    },
    '& .react-colorful__hue-pointer,.react-colorful__alpha-pointer': {
      //  borderWidth: '5px'
    }
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
  }
}));

const ColorPickerByPas = () => {
  const [color, setColor] = useState('rgba(255,255,255,0)');
  const [savedStatus, setSavedStatus] = useState(false);
  const [transparencyStatus, setTransparencyStatus] = useState(false);
  const [extendMoreColorsStatus, setExtendMoreColorsStatus] = useState(false);
  const [customizationsStatus, setCustomizationsStatus] = useState(false);
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

  const handlePopoverAndMenuState = value => setPopoverAndMenuState(value);

  const handleTransparencyColorPickerStatus = () => setTransparencyStatus(state => !state);
  const handleExtendMoreColorsStatus = () => setExtendMoreColorsStatus(state => !state);
  const handleCustomizationStatus = () => setCustomizationsStatus(state => !state);

  const buttonUtilsArr = [
    {
      icon: UnfoldMoreOutlinedIcon,
      popoverText: 'Extend more colors',
      name: 'extendMoreColors',
      activeIcon: extendMoreColorsStatus,
      onlyPopover: true,
      onClick: handleExtendMoreColorsStatus
    },
    {
      icon: ColorLensOutlinedIcon,
      popoverText: 'Add to pattern',
      name: 'pattern',
      activeIcon: false,
      onlyPopover: true
      // onClick: addToPatternList,
    },
    {
      icon: TextureOutlinedIcon,
      popoverText: 'Change transparency Status',
      name: 'changeTransparencyStatus',
      activeIcon: transparencyStatus,
      onlyPopover: true,
      onClick: handleTransparencyColorPickerStatus,
      hidden: true
    },
    {
      icon: PlaylistAddOutlinedIcon,
      popoverText: 'Add ',
      name: 'addOneMoreEvent',
      activeIcon: false,
      onlyPopover: true,
      hidden: true
      // onClick: addOneMoreEventFunc
    }
  ];
  // console.log(colors.red)

  const wrapperOfPopoverAndMenuProps = {
    buttonUtilsArr,
    handlePopoverAndMenuState,
    popoverAndMenuState,
    iconSize: 'small'
  };

  const handleSetColor = value => setColor(value);
  console.log(color);

  const onSave = () => console.log('onSave');

  const saveIconButtonProps = {
    onClick: onSave,
    icon: SaveRoundedIcon,
    activeProperty: !color,
    activeIcon: savedStatus
  };

  return (
    <Grid className={classes.container}>
      {/* <HexColorPicker color={color} onChange={setColor} /> */}
      <Grid container direction={'column'}>
        {colorsArr.map(arr => {
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
              ? selectedElement(true, color,() => handleSetColor(false))
              : staticExtendedElement;

            const elementOfGridColorPicker = extendMoreColorsStatus ? extendedElement : nonExtendedElement;

            return elementOfGridColorPicker;
          });

          return (
            <Grid item>
              <Grid container>{gridRow}</Grid>
            </Grid>
          );
        })}
      </Grid>
      <Box mt={0.4}>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item>
            <Grid container>
              <WrapperOfPopoverAndMenu {...wrapperOfPopoverAndMenuProps} />
            </Grid>
          </Grid>

          <Box mr={1.16}>
            <Button
              onClick={setCustomizationsStatus}
              size={'small'}
              variant={'outlined'}
              style={{ borderColor: color }}
            >
              <Typography variant={'subtitle2'} style={{ color: 'rgba(255,255,255,0.8)' }}>
                Customization
              </Typography>
            </Button>
            <IconButtonByPas {...saveIconButtonProps} size={'small'} />
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ColorPickerByPas;
