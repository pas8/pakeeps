import { Grid, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC, MouseEvent, MouseEventHandler, ReactNode, useState } from 'react';
import { MoreUtilsPropsType, UseStylesOfMoreUtilsType } from './types';
import { ClosePopoverOrMenuType } from 'models/types';
import { Optional } from 'utility-types';

const useStyles = makeStyles(({ spacing, shape: { borderRadius } }) => ({
  itemGrid: {
    margin: spacing(0.4, 0.8 * 4, 0, 1.4),
    padding: spacing(0.8, 0)
  },
  menuText: { marginLeft: spacing(1.4) },

  menuItemContainer: ({ color, hoverColor }: UseStylesOfMoreUtilsType) => ({
    '& svg,h6': { color },
    '&:hover svg,h6': { color: hoverColor },
    '&:hover .MuiTouchRipple-root': {
      background: useAlpha(color),
      // borderBottom:isIconActive && `2px solid ${color}`,
      borderRight: 0,
      borderLeft: 0
    }
  }),

  container: { borderRadius }
}));

const MoreUtils: FC<MoreUtilsPropsType> = ({ slicedArrAfter, customColor }) => {
  const nullityOfAnchorEl = {
    name: '',
    menuComponentsProps: {},
    currentTarget: null,
    MenuComponents: null as ReactNode | any
  };

  const [anchorElState, setAnchorElState] = useState<Optional<typeof nullityOfAnchorEl>>(nullityOfAnchorEl);

  const { MenuComponents, menuComponentsProps } = anchorElState;

  const handleMenuClose: ClosePopoverOrMenuType = () => setAnchorElState(nullityOfAnchorEl);

  const classes = useStyles({ color: customColor.isUseDefault ? '' : customColor.bgUnHover, hoverColor: '' });
  return (
    <Grid className={classes.container}>
      {slicedArrAfter.map(
        ({
          name,
          icon: Icon,
          isIconActive,
          onClick: onCustomClick,
          ActiveIcon,
          popoverText,
          menuComponents: MenuComponents,
          menuComponentsProps
        }) => {
          const [primaryColor, , maxEmphasisColor, highEmphasisColor] = useThemeColors();

          const color = (
            customColor.isUseDefault
              ? isIconActive
                ? primaryColor
                : highEmphasisColor
              : isIconActive
              ? customColor.bgUnHover
              : customColor.bgHover
          )!;

          const hoverColor = (customColor.isUseDefault && !isIconActive ? maxEmphasisColor : '')!;
          const classes = useStyles({ color, hoverColor });
          //

          const handleMenuOpen: MouseEventHandler<HTMLLIElement> = ({ currentTarget }) => {
            setAnchorElState(state => ({
              ...state,
              currentTarget,
              handleMenuClose,
              menuComponentsProps,
              MenuComponents,
              name,
              isMenuOpen: true
            }));
          };
          const onClick = onCustomClick ? onCustomClick : handleMenuOpen;

          return (
            <MenuItem disableGutters key={nanoid()} className={classes.menuItemContainer} onClick={onClick}>
              <Grid className={clsx(classes.itemGrid)} container>
                {isIconActive && !!ActiveIcon ? <ActiveIcon /> : <Icon />}
                <Grid item className={classes.menuText}>
                  <Typography variant={'subtitle2'}>{popoverText}</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          );
        }
      )}

      <Menu
        anchorEl={anchorElState.currentTarget}
        keepMounted
        onClose={handleMenuClose}
        open={!!anchorElState.name}
      >
        {MenuComponents && <MenuComponents {...menuComponentsProps} onMenuClose={handleMenuClose} />}
      </Menu>
    </Grid>
  );
};

export default MoreUtils;
