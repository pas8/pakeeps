import { Grid, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { Optional } from 'utility-types';
import { FC, MouseEvent, MouseEventHandler, ReactNode, useState } from 'react';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import { ClosePopoverOrMenuType } from 'models/types';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { MoreUtilsPropsType, UseStylesOfMoreUtilsType } from './types';

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
    coordinates: { top: 0, left: 0 },
    MenuComponents: null as ReactNode | any
  };

  const [anchorElState, setAnchorElState] = useState<Optional<typeof nullityOfAnchorEl>>(nullityOfAnchorEl);
  const { MenuComponents } = anchorElState;

  const handleMenuClose: ClosePopoverOrMenuType = () => setAnchorElState(nullityOfAnchorEl);

  const classes = useStyles({ color: customColor.isUseDefault ? '' : customColor.bgUnHover, hoverColor: '' });

  const anchorPosition =
    !!anchorElState?.coordinates?.top && !!anchorElState?.coordinates?.left ? anchorElState.coordinates : undefined;

const reversedColor = useGetReversedCustomColor( customColor)

  const menuComponentsProps = {
    ...anchorElState.menuComponentsProps,
    customColor:{...reversedColor }
  };
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

          const handleMenuOpen: MouseEventHandler<HTMLLIElement> = ({ clientX: left, clientY: top }) => {
            setAnchorElState(state => ({
              ...state,
              coordinates: { top, left },
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
        anchorReference={'anchorPosition'}
        keepMounted
        onClose={handleMenuClose}
        open={!!anchorElState.name}
        anchorPosition={anchorPosition}
      >
        {MenuComponents && <MenuComponents {...menuComponentsProps} onMenuClose={handleMenuClose} />}
      </Menu>
    </Grid>
  );
};

export default MoreUtils;
