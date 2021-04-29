import { Button, ButtonGroup, Typography, makeStyles, SvgIcon, IconButton, Badge } from '@material-ui/core';
import ColorIcon from 'components/Icons/components/ColorIcon';
import { themeColors } from 'components/theme';
import React from 'react';

const useStyles = makeStyles(theme => ({
  buttonGroupContainer: {
    '&  .MuiBadge-badge': {
      backgroundColor: ({ customColorsInHexFormat }) => customColorsInHexFormat,
      backgroundColor: '#424242',
      fontSize: theme.spacing(1.96),
      fontWeight: 900,
      color: themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal,
      maxWidth: theme.spacing(1.96),
      maxHeight: theme.spacing(1.96),
      top: theme.spacing(0.42),
      right: theme.spacing(0.42)
      // opacity: 0.8
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
  const classes = useStyles({ customColorsInHexFormat });

  const hoveredButtonGroupChildren = (
    <>
      <Button onClick={setCustomizationsStatus}>
        <Typography variant={'subtitle2'} style={{ color: nullityColor }}>
          {/* <IconButton> */}
          <Badge badgeContent={'+'} >
            <ColorIcon/>
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
