import PropTypes from 'prop-types';
import { Grid, IconButton, makeStyles, Badge } from '@material-ui/core';
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
  handleAverageMainComponentWidth = false,
  badgeContent 
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
        <Badge badgeContent={badgeContent} color={'secondary'}>
          <Icon className={classes.icon} />
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
}

export default IconButtonByPas;
