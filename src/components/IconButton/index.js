import PropTypes from 'prop-types';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import { themeColors } from 'components/theme';
import _ from 'lodash';
import { useMeasure } from 'react-use';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  icon: ({ iconColor, rotate }) => ({ color: iconColor, transform: rotate }),
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
  customColor = null,
  handleAverageMainComponentWidth = false
}) => {
  const currentHoverStatusIsTrue = _.isEqual(activeIconName, iconName) && activeProperty;
  const iconColor = activeIcon
    ? themeColors.primaryMain
    : customColor
    ? customColor
    : currentHoverStatusIsTrue
    ? 'rgba(255,255,255,0.92)'
    : 'rgba(255,255,255,0.42)';
  const rotate = rotateDeg ? `rotate(${rotateDeg}deg)` : 'rotate(0deg)';

  const classes = useStyles({ iconColor, rotate });

  const [ref, { width }] = useMeasure();
  
  useEffect(() => width !== 0 && handleAverageMainComponentWidth && handleAverageMainComponentWidth(width), [width]);

  return (
    <Grid className={size === 'small' ? classes.smallButtonSize : null} component={'div'} ref={ref}>
      <IconButton onClick={onClick}>
        <Icon className={classes.icon} />
      </IconButton>
    </Grid>
  );
};

IconButtonByPas.propTypes = {
  Icon: PropTypes.node,
  activeIcon: PropTypes.bool,
  activeIconName: PropTypes.string,
  activeProperty: PropTypes.any,
  iconName: PropTypes.string,
  onClick: PropTypes.any,
  rotateDeg: PropTypes.number
};

export default IconButtonByPas;
