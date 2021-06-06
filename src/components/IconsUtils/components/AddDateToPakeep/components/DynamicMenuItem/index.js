import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';

const useStyles = makeStyles(({ spacing }) => ({
  menuText: { marginLeft: spacing(1.4), paddingTop: spacing(0.32) },

  // preventClickOfMenuItem: { '& .MuiTouchRipple-root': { display: 'none' } },
  itemGrid: ({ color }) => ({
    padding: spacing(0.96, 1.42),
    '& svg,h6': { color }
  }),
  container: ({ hoverColor, color }) => ({
    '&:hover > .MuiTouchRipple-root': {
      background: useAlpha(color)
    }
  }),
  smallerMargin: {
    padding: [spacing(0.6, 1.42),'!important']
  }
}));

const DynamicMenuItem = ({
  DynamicComponent,
  dynamicComponentProps,
  title,
  isActiveIcon,
  isDynamicComponentShouldBeShown,
  dynamicItemProps,
  isPreventClickOfMenuItem = false,
  icon,
  customColor,
  isDynamicItemGridMarginIsZero = false,
  isMarginSmaller = false
}) => {
  const [, , , highEmphasisColor] = useThemeColors();
  const color = !customColor ? highEmphasisColor : customColor?.unHover;
  const classes = useStyles({ color, hoverColor: '', customColor });

  const dynamicMenuItem = (
    <Grid
      item
      className={clsx(isMarginSmaller && classes.smallerMargin,!isDynamicItemGridMarginIsZero && classes.itemGrid, )}
    >
      <DynamicComponent {...dynamicComponentProps} />
    </Grid>
  );

  const staticMenuItem = (
    <Grid container className={clsx(classes.itemGrid)}>
      {icon}
      <Grid item className={classes.menuText}>
        <Typography variant={'subtitle2'}>{title}</Typography>
      </Grid>
    </Grid>
  );

  const ItemOfMenu = isDynamicComponentShouldBeShown ? Grid : MenuItem;

  const itemOfMenuProps = {
    ...dynamicItemProps,
    disableGutters: true,
    className: clsx(isPreventClickOfMenuItem && classes.preventClickOfMenuItem, customColor && classes.container)
  };

  return (
    <ItemOfMenu {...itemOfMenuProps}>{isDynamicComponentShouldBeShown ? dynamicMenuItem : staticMenuItem}</ItemOfMenu>
  );
};

DynamicMenuItem.propTypes = {
  DynamicComponent: PropTypes.node,
  Icon: PropTypes.any,
  isActiveIcon: PropTypes.bool,
  dynamicComponentProps: PropTypes.object,
  isDynamicComponentShouldBeShown: PropTypes.bool,
  isPreventClickOfMenuItem: PropTypes.bool,
  menuItemProps: PropTypes.object,
  title: PropTypes.string
};

export default DynamicMenuItem;
