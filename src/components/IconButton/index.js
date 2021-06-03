import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, IconButton, makeStyles, Badge } from '@material-ui/core';
import { useMeasure } from 'react-use';
import { useEffect } from 'react';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
// import clsx from 'clsx'
const useStyles = makeStyles(theme => ({
  icon: ({ iconColor, rotate, isArctiveIconPresent, isIconActive }) => ({
    '& svg': { color: iconColor, transform: rotate },
    '& path': { fillOpacity: !isArctiveIconPresent && isIconActive && 1 },
    '&:hover ': { background: useAlpha(iconColor) }
  }),
  smallButtonSize: { '& button ': { padding: theme.spacing(1) } }
}));

const IconButtonByPas = ({
  onClick = null,
  isArctiveIconPresent,
  rotateDeg = false,
  isIconActive = false,
  icon: Icon,
  iconName = 'icon',
  activeIconName = 'icon',
  activeProperty = false,
  size,
  customColor = false,
  handleAverageMainComponentWidth = false,
  badgeContent
}) => {
  const [primaryColor, , maxEmphasisColor, , mediumEmphasisColor] = useThemeColors();
  const currentHoverStatusIsTrue = _.isEqual(activeIconName, iconName) && activeProperty;
  const customIconColor = !!customColor && currentHoverStatusIsTrue ? customColor?.hover : customColor?.unHover;

  const defaultColor = isIconActive ? primaryColor : currentHoverStatusIsTrue ? maxEmphasisColor : mediumEmphasisColor;
  const iconColor = customColor ? customIconColor : defaultColor;

  const rotate = rotateDeg ? `rotate(${rotateDeg}deg)` : 'rotate(0deg)';
  const classes = useStyles({ iconColor, rotate, isIconActive, isArctiveIconPresent });

  const [ref, { width }] = useMeasure();
  useEffect(() => width !== 0 && handleAverageMainComponentWidth && handleAverageMainComponentWidth(width), [width]);

  return (
    <Grid className={size === 'small' ? classes.smallButtonSize : null} component={'div'} ref={ref}>
      <IconButton onClick={onClick} className={classes.icon}>
        <Badge badgeContent={badgeContent} color={'secondary'}>
          <Icon />
        </Badge>
      </IconButton>
    </Grid>
  );
};

IconButtonByPas.propTypes = {
  Icon: PropTypes.node,
  activeIconName: PropTypes.string,
  activeProperty: PropTypes.bool,
  badgeContent: PropTypes.number,
  customColor: PropTypes.bool,
  handleAverageMainComponentWidth: PropTypes.bool,
  icon: PropTypes.any,
  iconName: PropTypes.string,
  isArctiveIconPresent: PropTypes.bool,
  isIconActive: PropTypes.bool,
  onClick: PropTypes.func,
  rotateDeg: PropTypes.number,
  size: PropTypes.string
};

export default IconButtonByPas;
