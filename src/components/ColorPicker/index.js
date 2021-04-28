import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import { Button, colors, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { themeColors } from 'components/theme';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
// .custom-layout  {
//   padding: 16px;
//   border-radius: 12px;
//   background: #33333a;
//   box-shadow: 0 6px 12px #999;
// }

// .custom-layout .react-colorful__saturation {
//   margin: 15px 0;
//   border-radius: 5px;
//   border-bottom: none;
// }

// .custom-layout .react-colorful__hue {
//   order: -1;
// }

// .custom-layout .react-colorful__hue,
// .custom-layout .react-colorful__alpha {
//   height: 14px;
//   border-radius: 5px;
// }

// .custom-layout .react-colorful__hue-pointer,
// .custom-layout .react-colorful__alpha-pointer {
//   width: 20px;
//   height: 20px;
// }

const useStyles = makeStyles(theme => ({
  container: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    }),

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
    width: theme.spacing(8 * 0.8),
    height: theme.spacing(8 * 0.8),
    margin: theme.spacing(0.8),
    overflow: 'hidden'
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
  }
}));

const ColorPickerByPas = () => {
  const [color, setColor] = useState(themeColors.primaryMain);
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
    popoverAndMenuState
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

            const extendedElement = (
              <Paper className={classes.elementOfGridColorPicker}>
                {namesOfPartsOfGridElement.map(row => (
                  <Grid container>
                    {row.map(name => (
                      <Grid
                        style={{ backgroundColor: colors[colorName][name] }}
                        className={classes.extendedElementOfGridColorPicker}
                      />
                    ))}
                  </Grid>
                ))}
              </Paper>
            );

            const nonExtendedElement = (
              <Paper style={{ backgroundColor: colors[colorName][500] }} className={classes.elementOfGridColorPicker} />
            );
            const elementOfGridColorPicker = extendMoreColorsStatus ? extendedElement : nonExtendedElement;
            return elementOfGridColorPicker;
          });

          return (
            <Grid item>
              <Grid container>{gridRow}</Grid>{' '}
            </Grid>
          );
        })}
      </Grid>
      <Grid container justify={'space-between'} alignItems={'center'}>
        <Grid item>
          <Grid container>
            <WrapperOfPopoverAndMenu {...wrapperOfPopoverAndMenuProps} />
          </Grid>
        </Grid>

        <Grid item>
          <Button onClick={setCustomizationsStatus}>
            <Typography
              variant={'subtitle2'}
              // style={{color: 'rgba(255,255,255,0.4)' }}
            >
              Customization
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ColorPickerByPas;
