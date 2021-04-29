import { Button, ButtonGroup, Typography, makeStyles, SvgIcon, IconButton, Badge, Grid } from '@material-ui/core';
import ColorIcon from 'components/Icons/components/ColorIcon';
import { themeColors } from 'components/theme';
import { useState } from 'react';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';

const useStyles = makeStyles(theme => ({
  buttonGroupContainer: {
    '&  .MuiBadge-badge': {
      backgroundColor: ({ customColorsInHexFormat, hoverStatusOfButtonOfAddingCustomColorToColorLayouts }) =>
        hoverStatusOfButtonOfAddingCustomColorToColorLayouts ? customColorsInHexFormat : '#424242',
      fontSize: theme.spacing(2.42),
      fontWeight: 900,
      color: themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal,
      maxWidth: theme.spacing(2),
      top: theme.spacing(0.8),
      right: theme.spacing(0.42),
      transform: 'scale(0.8) translate(50%, -50%);',
      transition: theme.transitions.create('background', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      })
    },
    '& > button': {
      padding: theme.spacing(0.42 + 0.42 / 1.96),

      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      })
    },
    '& > div > button': {
      padding: theme.spacing(0.42, 0),

      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      })
    }
  },
  buttonWithBargeContainer: {
    '& .MuiSvgIcon-root': { width: theme.spacing(2 / (0.8 + 0.016)) }
  }
}));

const CustomizationButton = ({
  nullityColor,
  customColorsInHexFormat,
  buttonCustomizationHoverStatus,
  setCustomizationsStatus,
  color,
  onMouseLeave,
  onMouseEnter
}) => {
  const [
    hoverStatusOfButtonOfAddingCustomColorToColorLayouts,
    setHoverStatusOfButtonOfAddingCustomColorToColorLayouts
  ] = useState(false);
  const classes = useStyles({ customColorsInHexFormat, hoverStatusOfButtonOfAddingCustomColorToColorLayouts });

  const setHoverStatusOfButtonOfAddingCustomColorToColorLayoutsIsTrue = () =>
    setHoverStatusOfButtonOfAddingCustomColorToColorLayouts(true);

  const setHoverStatusOfButtonOfAddingCustomColorToColorLayoutsIsFalse = () =>
    setHoverStatusOfButtonOfAddingCustomColorToColorLayouts(false);

  const buttonOfAddingCustomColorToColorLayoutsProps = {
    onClick: setCustomizationsStatus,
    onMouseEnter: setHoverStatusOfButtonOfAddingCustomColorToColorLayoutsIsTrue,
    onMouseLeave: setHoverStatusOfButtonOfAddingCustomColorToColorLayoutsIsFalse
  };

  const hoveredButtonGroupChildren = (
    <Grid>
      <Button {...buttonOfAddingCustomColorToColorLayoutsProps}>
        {/* <IconButton> */}
        <Grid className={classes.buttonWithBargeContainer}>
          <Badge badgeContent={'+'}>
            <ColorIcon />
          </Badge>
        </Grid>
      </Button>
      <Button onClick={setCustomizationsStatus}>
        {/* <Typography variant={'b2'} style={{ color: nullityColor }}> */}
        <TuneOutlinedIcon />
        {/* </Typography> */}
      </Button>
    </Grid>
  );

  const unHoveredButtonGroupChildren = (
    <Button onClick={setCustomizationsStatus} variant={'text'}>
      <Typography variant={'subtitle2'} style={{ color: nullityColor }}>
        Customization
      </Typography>
    </Button>
  );

  const buttonGroupChildren = buttonCustomizationHoverStatus
    ? hoveredButtonGroupChildren
    : unHoveredButtonGroupChildren;

  return (
    <ButtonGroup
      onMouseLeave={onMouseLeave}
      outlined
      onMouseEnter={onMouseEnter}
      className={classes.buttonGroupContainer}
      size={'small'}
      style={{ border: '1px solid', borderColor: color === nullityColor ? 'transparent' : customColorsInHexFormat }}
    >
      {buttonGroupChildren}
    </ButtonGroup>
  );
};

export default CustomizationButton;
