import PropTypes from 'prop-types';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import { themeColors } from 'components/theme';
import _ from 'lodash';

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
  customColor = null
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

  return (
    <Grid className={size === 'small' ? classes.smallButtonSize : null} component={'span'}>
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
