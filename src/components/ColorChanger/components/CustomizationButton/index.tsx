import { Button, ButtonGroup, Typography, makeStyles, SvgIcon, IconButton, Badge, Grid } from '@material-ui/core';
import { FC, useState } from 'react';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import DialogOfAddingCustomColorToColorLayouts from './components/DialogOfAddingCustomColorToColorLayouts';
import { CustomizationButtonPropsType, UseStylesOfCustomizationButton } from './types';

const useStyles = makeStyles(theme => ({
  button: ({ customColor, color, nullityColor, colorInHexFormat }: UseStylesOfCustomizationButton) => {
    const isColorDark = !useIsColorLight(colorInHexFormat);
    const isColorDefault = colorInHexFormat === '#000000';
    // const color
    return {
      border: '1px solid',
      background: isColorDefault ? 'transparent' : isColorDark ? colorInHexFormat : 'transparent',
      borderColor: isColorDefault ? 'white' : color === nullityColor ? 'transparent' : colorInHexFormat,
      '& h6': {
        color: isColorDefault ? 'white' : isColorDark ? 'white' : colorInHexFormat
        // ? customColor.bgHover
        // : ''
      },
      '& .MuiSvgIcon-root': { width: theme.spacing(2 / (0.8 + 0.1)) }
    };
  },
  // buttonGroupContainer: {
  //   '&  .MuiBadge-badge': {
  //     backgroundColor: ({ colorInHexFormat, hoverStatusOfButtonOfAddingCustomColorToColorLayouts }) =>
  //       hoverStatusOfButtonOfAddingCustomColorToColorLayouts ? colorInHexFormat : '#424242',
  //     fontSize: theme.spacing(2.42),
  //     fontWeight: 900,
  //     color: themeColors.highEmphasis,
  //     maxWidth: theme.spacing(2),
  //     top: theme.spacing(0.8),
  //     right: theme.spacing(0.42),
  //     transform: 'scale(0.8) translate(50%, -50%);',
  //     transition: theme.transitions.create('background', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.standard
  //     })
  //   },
  //   '& > button': {
  //     padding: theme.spacing(0.42 + 0.42 / 1.96),

  //     transition: theme.transitions.create('all', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.standard
  //     })
  //   },
  //   '& > div > button': {
  //     padding: theme.spacing(0.42, 0),

  //     transition: theme.transitions.create('all', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.standard
  //     })
  //   }
  // },
  buttonWithBargeContainer: {}
}));

const CustomizationButton: FC<CustomizationButtonPropsType> = ({
  nullityColor,
  colorInHexFormat,
  setCustomizationsStatusIsTrue,
  setCustomizationsStatusIsFalse,
  color,
  customColor
}) => {
  // const [
  //   hoverStatusOfButtonOfAddingCustomColorToColorLayouts,
  //   setHoverStatusOfButtonOfAddingCustomColorToColorLayouts
  // ] = useState(false);
  const [openStatusOfDialog, setOpenStatusOfDialog] = useState(false);

  const classes = useStyles({ colorInHexFormat, customColor, color, nullityColor });
  // const classes = useStyles({ colorInHexFormat, hoverStatusOfButtonOfAddingCustomColorToColorLayouts });

  // const setHoverStatusOfButtonOfAddingCustomColorToColorLayoutsIsTrue = () =>
  //   setHoverStatusOfButtonOfAddingCustomColorToColorLayouts(true);

  // const setHoverStatusOfButtonOfAddingCustomColorToColorLayoutsIsFalse = () =>
  //   setHoverStatusOfButtonOfAddingCustomColorToColorLayouts(false);

  // const buttonOfAddingCustomColorToColorLayoutsProps = {
  //   onClick: setCustomizationsStatus,
  //   onMouseEnter: setHoverStatusOfButtonOfAddingCustomColorToColorLayoutsIsTrue,
  //   onMouseLeave: setHoverStatusOfButtonOfAddingCustomColorToColorLayoutsIsFalse
  // };

  const setOpenStatusOfDialogIsTrue = () => setOpenStatusOfDialog(true);
  const setOpenStatusOfDialogIsFalse = () => setOpenStatusOfDialog(false);

  const dialogOfAddingCustomColorToColorLayoutsProps = {
    open: openStatusOfDialog,
    onClose: setOpenStatusOfDialogIsFalse,
    colorInHexFormat,
    onSave: setOpenStatusOfDialogIsFalse
  };

  // const hoveredButtonGroupChildren = (
  //   <Grid>
  //     <Button {...buttonOfAddingCustomColorToColorLayoutsProps}>
  //       {/* <IconButton> */}
  //       <Grid className={classes.buttonWithBargeContainer} onClick={setOpenStatusOfDialogIsTrue}>
  //         <Badge badgeContent={'+'}>
  //           <ColorIcon />
  //         </Badge>
  //       </Grid>
  //     </Button>
  //     <Button onClick={setCustomizationsStatus}>
  //       {/* <Typography variant={'b2'} style={{ color: nullityColor }}> */}
  //       <TuneOutlinedIcon />
  //       {/* </Typography> */}
  //     </Button>

  //   </Grid>
  // );

  const unHoveredButtonGroupChildren = (
    <Button onClick={setCustomizationsStatusIsTrue} variant={'text'} component={'div'}>
      <Typography variant={'subtitle2'} style={{ color: nullityColor }}>
        Customization
      </Typography>
    </Button>
  );

  const buttonGroupChildren = unHoveredButtonGroupChildren;

  return (
    <ButtonGroup
      className={classes.button}
      // onMouseLeave={onMouseLeave}
      // onMouseEnter={onMouseEnter}
      component={'button'}
      // className={classes.buttonGroupContainer}
      size={'small'}
    >
      {buttonGroupChildren}
      <DialogOfAddingCustomColorToColorLayouts {...dialogOfAddingCustomColorToColorLayoutsProps} />
    </ButtonGroup>
  );
};

export default CustomizationButton;
