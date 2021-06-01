import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import { useAlpha } from 'hooks/useAlpha.hook';
import { themeColors } from 'components/theme';

const useStyles = makeStyles(theme => ({
  menuText: { marginLeft: theme.spacing(1.4) },
  marginTop: {
    marginRight: theme.spacing(1.4),
    marginLeft: theme.spacing(1.0 * 2),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    })
  },

  // preventClickOfMenuItem: { '& .MuiTouchRipple-root': { display: 'none' } },
  itemGrid: ({color}) => ({
    padding: theme.spacing(0.92, 0.8),
    '& svg,h6': { color },


  }),
  container:  ({hoverColor,color}) => ({
    margin: theme.spacing(0.4, 0.8 * 4, 0, 1.4),

    // '&:hover svg,h6': { color: hoverColor },
    '& .MuiTouchRipple-root': {
      background:useAlpha(color)
    }

  })
}));

const DynamicMenuItem = ({
  DynamicComponent,
  dynamicComponentProps,
  title,
  isActiveIcon,
  isDynamicComponentShouldBeShown,
  menuItemProps,
  isPreventClickOfMenuItem = false,
  Icon,
  customColor,
  isDynamicItemGridMarginIsZero = false
}) => {

const color = !customColor?.isUseDefault ?  customColor?.unHover : themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal 
// console.log(customColor?.isUseDefault)
const classes = useStyles({ color, hoverColor: '' });

  const dynamicMenuItem = (
    <Grid item className={!isDynamicItemGridMarginIsZero && clsx(classes.marginTop, classes.itemGrid)}>
      <DynamicComponent {...dynamicComponentProps} />
    </Grid>
  );

  const staticMenuItem = (
    <Grid  container className={ classes.itemGrid}>
      <Icon />
      <Grid item className={classes.menuText}>
        <Typography variant={'subtitle2'}>{title}</Typography>
      </Grid>
    </Grid>
  );

  const ItemOfMenu = isDynamicComponentShouldBeShown ? Grid : MenuItem;

  const itemOfMenuProps = {
    ...menuItemProps,
    disableGutters: true,
    className: isPreventClickOfMenuItem ? classes.preventClickOfMenuItem : classes.itemGrid
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
