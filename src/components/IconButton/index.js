import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { themeColors } from 'components/theme';
import React from 'react';

const IconButtonByPas = ({
  onClick = ()=> console.log('iconButton'),
  rotateDeg = false,
  activeIcon,
  icon:Icon,
  iconName,
  activeIconName,
  activeProperty
}) => {
  return (
    <IconButton onClick={onClick}>
      <Icon
        style={{
          // filter: name === 'favorite' && activeIcon ? `drop-shadow(0 0 0.4rem ${themeColors.primaryMain})` : '',
          transform: `rotate(${rotateDeg ? rotateDeg : 0}deg)`,
          color: activeIcon
            ? themeColors.primaryMain
            : `rgba(255,255,255,${activeIconName === iconName && activeProperty ? 0.8 : 0.4}`
        }}
      />
    </IconButton>
  );
};

IconButtonByPas.propTypes = {
  Icon: PropTypes.any,
  activeIcon: PropTypes.any,
  activeIconName: PropTypes.any,
  activeProperty: PropTypes.any,
  iconName: PropTypes.any,
  onClick: PropTypes.any,
  rotateDeg: PropTypes.any
};

export default IconButtonByPas;
