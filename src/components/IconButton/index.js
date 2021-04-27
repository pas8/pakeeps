import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import { themeColors } from 'components/theme';
import _ from 'lodash';

const useStyles = makeStyles({ icon: ({ iconColor, rotate }) => ({ color: iconColor, transform: rotate }) });

const IconButtonByPas = ({
  onClick = null,
  rotateDeg = false,
  activeIcon = false,
  icon: Icon,
  iconName = 'icon',
  activeIconName = 'icon',
  activeProperty = false
}) => {


  const currentHoverStatusIsTrue = _.isEqual(activeIconName, iconName) && activeProperty
  const iconColor = activeIcon
    ? themeColors.primaryMain
    : currentHoverStatusIsTrue
    ? 'rgba(255,255,255,0.8)'
    : 'rgba(255,255,255,0.4)';

  const rotate = rotateDeg ? `rotate(${rotateDeg}deg)` : 'rotate(0deg)';

  const classes = useStyles({ iconColor, rotate });

  return (
    <IconButton onClick={onClick}>
      <Icon className={classes.icon} />
    </IconButton>
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
