import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, IconButton, makeStyles, Badge } from '@material-ui/core';
import { useHover, useMeasure } from 'react-use';
import { FC, useEffect } from 'react';

import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import { IconButtonByPasType, IconClassType } from './types';

const useStyles = makeStyles(({ spacing }) => ({
  iconClass: ({ iconColor, rotate, isArctiveIconPresent, isIconActive, fillOpacity }: IconClassType) => ({
    fillOpacity,
    '& svg': { color: iconColor, transform: rotate },
    '& path': { fillOpacity: !isArctiveIconPresent && isIconActive && 1 },
    '&:hover ': { background: useAlpha(iconColor!) }
  }),
  smallButtonSizeClass: { '& button ': { padding: spacing(1) } }
}));

const Wrapper: FC<IconButtonByPasType> = props => {
  const [hoverable] = useHover(isHovering => (
    <IconButtonByPas {...props} activeProperty={props.activeProperty ?? isHovering} />
  ));
  return hoverable;
};

const IconButtonByPas: FC<IconButtonByPasType> = ({
  onClick,
  isArctiveIconPresent,
  rotateDeg = false,
  isIconActive = false,
  icon: Icon,
  fillOpacity = 1,
  iconName = 'icon',
  activeIconName = 'icon',
  activeProperty = false,
  size,
  customColor,
  handleAverageMainComponentWidth,
  badgeContent,
  style,
  ...props
}) => {
  const [primaryColor, , maxEmphasisColor, , mediumEmphasisColor] = useThemeColors();
  const currentHoverStatusIsTrue = _.isEqual(activeIconName, iconName) && activeProperty;
  const customIconColor =
    !customColor?.isUseDefault && currentHoverStatusIsTrue ? customColor?.hover : customColor?.unHover;

  const defaultColor = isIconActive ? primaryColor : currentHoverStatusIsTrue ? maxEmphasisColor : mediumEmphasisColor;
  const iconColor = !customColor?.isUseDefault ? customIconColor : defaultColor;

  const rotate = rotateDeg ? `rotate(${rotateDeg}deg)` : 'rotate(0deg)';
  const classes = useStyles({ iconColor, rotate, isIconActive, isArctiveIconPresent, fillOpacity });
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  useEffect(() => {
    width !== 0 && handleAverageMainComponentWidth && handleAverageMainComponentWidth(width);
  }, [width]);

  return (
    <Grid className={size === 'small' ? classes.smallButtonSizeClass : ''} ref={ref} style={style}>
      <IconButton onClick={onClick} className={classes.iconClass} {...props}>
        <Badge badgeContent={badgeContent} color={'secondary'}>
          <Icon />
        </Badge>
      </IconButton>
    </Grid>
  );
};

export default Wrapper;
