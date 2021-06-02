import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import { useAlpha } from 'hooks/useAlpha.hook';
import { themeColors } from 'components/theme';

const useStyles = makeStyles(theme => ({
  menuText: { marginLeft: theme.spacing(1.4) },

  // preventClickOfMenuItem: { '& .MuiTouchRipple-root': { display: 'none' } },
  itemGrid: ({ color }) => ({
    padding: theme.spacing(1, 1.6),
    '& svg,h6': { color }
  }),
  container: ({ hoverColor, color, }) => ({
    '&:hover > .MuiTouchRipple-root':  {
      background:   useAlpha(color)
    }
  })
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
  isDynamicItemGridMarginIsZero = false
}) => {
  const color = !customColor ? themeColors.highEmphasis : customColor?.unHover;
  const classes = useStyles({ color, hoverColor: '' ,customColor});

  const dynamicMenuItem = (
    <Grid item className={!isDynamicItemGridMarginIsZero && clsx( classes.itemGrid)}>
      <DynamicComponent {...dynamicComponentProps} />
    </Grid>
  );

  const staticMenuItem = (
    <Grid container className={classes.itemGrid}>
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
    className: clsx(isPreventClickOfMenuItem && classes.preventClickOfMenuItem,customColor && classes.container)
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
