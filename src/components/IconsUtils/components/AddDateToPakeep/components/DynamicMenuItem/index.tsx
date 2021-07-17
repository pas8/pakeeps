import { FC } from 'react';
import { Grid, makeStyles, Typography, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { DynamicMenuItemPropsType } from './types';

const useStyles = makeStyles(({ spacing }) => ({
  menuTextClass: { marginLeft: spacing(1.4), paddingTop: spacing(0.32) },

  preventClickOfMenuItem: { '& .MuiTouchRipple-root': { display: 'none' } },
  itemGridClass: ({ color }: { color: string }) => ({
    padding: spacing(0.96, 1.42),
    '& svg,h6': { color }
  }),
  containerClass: ({ color }: { color: string }) => ({
    '&:hover > .MuiTouchRipple-root': {
      background: useAlpha(color)
    }
  }),
  smallerMarginClass: {
    padding: spacing(0.6, 1.42) //!important should be
  }
}));

const DynamicMenuItem: FC<DynamicMenuItemPropsType> = ({
  DynamicComponent,
  dynamicComponentProps,
  title,
  isDynamicComponentShouldBeShown,
  dynamicItemProps,
  isPreventClickOfMenuItem = false,
  icon,
  customColor,
  isDynamicItemGridMarginIsZero = false,
  isMarginSmaller = false
}) => {
  const [, , , highEmphasisColor] = useThemeColors();
  const color = highEmphasisColor && customColor.isUseDefault ? highEmphasisColor : customColor?.unHover;
  const classes = useStyles({ color });

  const dynamicMenuItem = (
    <Grid
      item
      className={clsx(
        isMarginSmaller && classes.smallerMarginClass,
        !isDynamicItemGridMarginIsZero && classes.itemGridClass
      )}
    >
      <DynamicComponent {...dynamicComponentProps} />
    </Grid>
  );

  const staticMenuItem = (
    <Grid container className={clsx(classes.itemGridClass)}>
      {icon}
      <Grid item className={classes.menuTextClass}>
        <Typography variant={'subtitle2'}>{title}</Typography>
      </Grid>
    </Grid>
  );

  const ItemOfMenu: FC = isDynamicComponentShouldBeShown ? Grid : MenuItem;

  const itemOfMenuProps = {
    ...dynamicItemProps,
    disableGutters: true,
    className: clsx(isPreventClickOfMenuItem && classes.preventClickOfMenuItem, customColor && classes.containerClass)
  };

  return (
    <ItemOfMenu {...itemOfMenuProps}>{isDynamicComponentShouldBeShown ? dynamicMenuItem : staticMenuItem}</ItemOfMenu>
  );
};

export default DynamicMenuItem;
