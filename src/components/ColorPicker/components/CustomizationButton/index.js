import { Button, ButtonGroup, Typography, makeStyles, SvgIcon, IconButton, Badge } from '@material-ui/core';
import ColorIcon from 'components/Icons/components/ColorIcon';
import { themeColors } from 'components/theme';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  buttonGroupContainer: {
    '&  .MuiBadge-badge': {
      backgroundColor: ({ customColorsInHexFormat, hoverStatusOfButtonOfAddingCustomColorToColorLayouts }) =>
        hoverStatusOfButtonOfAddingCustomColorToColorLayouts ? customColorsInHexFormat : '#424242',
      fontSize: theme.spacing(1.96),
      fontWeight: 900,
      color: themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal,
      maxWidth: theme.spacing(1.96),
      maxHeight: theme.spacing(1.96),
      top: theme.spacing(0.42),
      right: theme.spacing(0.42),
      // opacity: 0.8

      transition: theme.transitions.create('background', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      })
    }
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
    <>
      <Button {...buttonOfAddingCustomColorToColorLayoutsProps}>
        <Typography variant={'subtitle2'} style={{ color: nullityColor }}>
          {/* <IconButton> */}
          <Badge badgeContent={'+'}>
            <ColorIcon />
          </Badge>
        </Typography>
      </Button>
      <Button onClick={setCustomizationsStatus}>
        <Typography variant={'subtitle2'} style={{ color: nullityColor }}>
          1
        </Typography>
      </Button>
    </>
  );

  const unHoveredButtonGroupChildren = (
    <Button onClick={setCustomizationsStatus}>
      <Typography variant={'subtitle2'} style={{ color: nullityColor }}>
        Customization
      </Typography>
    </Button>
  );

  const buttonGroupChildren = true ? hoveredButtonGroupChildren : unHoveredButtonGroupChildren;

  return (
    <ButtonGroup
      onMouseLeave={onMouseLeave}
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
