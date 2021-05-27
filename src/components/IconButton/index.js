import PropTypes from 'prop-types';
import { Grid, IconButton, makeStyles, Badge } from '@material-ui/core';
import { themeColors } from 'components/theme';
import _ from 'lodash';
import { useMeasure } from 'react-use';
import { useEffect } from 'react';
import { colord } from 'colord';
// import clsx from 'clsx'
const useStyles = makeStyles(theme => ({
  icon: ({ iconColor, rotate }) => ({
    '& svg': { color: iconColor, transform: rotate ,},
    '&:hover ': { background: colord(iconColor).alpha(0.08).toHex() }
  }),
  smallButtonSize: { '& button ': { padding: theme.spacing(1) } }
}));

const IconButtonByPas = ({
  onClick = null,
  rotateDeg = false,
  activeIcon = false,
  icon: Icon,
  iconName = 'icon',
  activeIconName = 'icon',
  activeProperty = false,
  size,
  customColor = false,
  handleAverageMainComponentWidth = false,
  badgeContent
}) => {
  const currentHoverStatusIsTrue = _.isEqual(activeIconName, iconName) && activeProperty;
  const customIconColor = !!customColor && currentHoverStatusIsTrue ? customColor?.hover : customColor?.unHover;

  const defaultColor = activeIcon
    ? themeColors.primaryMain
    : currentHoverStatusIsTrue
    ? 'rgba(255,255,255,0.92)'
    : 'rgba(255,255,255,0.42)';

  const iconColor = customColor ? customIconColor : defaultColor;

  const rotate = rotateDeg ? `rotate(${rotateDeg}deg)` : 'rotate(0deg)';

  const classes = useStyles({ iconColor, rotate,activeIcon });

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
  activeIcon: PropTypes.bool,
  activeIconName: PropTypes.string,
  activeProperty: PropTypes.bool,
  badgeContent: PropTypes.number,
  customColor: PropTypes.any,
  handleAverageMainComponentWidth: PropTypes.bool,
  icon: PropTypes.any,
  iconName: PropTypes.string,
  onClick: PropTypes.func,
  rotateDeg: PropTypes.number,
  size: PropTypes.string
};

export default IconButtonByPas;
