// import PropTypes from 'prop-types';
// import { Button, IconButton, makeStyles } from '@material-ui/core';
// import { themeColors } from 'components/theme';
// import _ from 'lodash';

// const useStyles = makeStyles({ icon: ({ iconColor }) => ({ color: iconColor,  }) });

// const ButtonByPas = ({
//   onClick = null,
//   rotateDeg = false,
//   activeIcon = false,
//   icon: Icon,
//   iconName = 'icon',
//   activeIconName = 'icon',
//   activeProperty = false
// }) => {


//   const currentHoverStatusIsTrue = _.isEqual(activeIconName, iconName) && activeProperty
//   const color = activeIcon
//     ? themeColors.primaryMain
//     : currentHoverStatusIsTrue
//     ? 'rgba(255,255,255,0.92)'
//     : 'rgba(255,255,255,0.42)';

//   const rotate = rotateDeg ? `rotate(${rotateDeg}deg)` : 'rotate(0deg)';

//   const classes = useStyles({ color });

  
//   return (
//     <Button onClick={onClick} endIcon={<Icon/>}>
//       <Icon className={classes.icon} />
//     </Button>
//   );
// };

// IconButtonByPas.propTypes = {
//   Icon: PropTypes.node,
//   activeIcon: PropTypes.bool,
//   activeIconName: PropTypes.string,
//   activeProperty: PropTypes.any,
//   iconName: PropTypes.string,
//   onClick: PropTypes.any,
// };

// export default ButtonByPas;
