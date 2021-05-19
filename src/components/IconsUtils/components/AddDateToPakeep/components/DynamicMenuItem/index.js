import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography, MenuItem } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  itemGrid: { margin: theme.spacing(0.4, 0.8 * 4, 0, 1.4), padding: theme.spacing(0.8, 0) },
  menuText: { marginLeft: theme.spacing(1.4) },
  marginTop: {
    marginRight: theme.spacing(1.4),
    marginLeft: theme.spacing(1.0 * 2),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    })
  },
  
  preventClickOfMenuItem: { '& .MuiTouchRipple-root': { display: 'none' } }
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
}) => {
  const classes = useStyles();

  const dynamicMenuItem = (
    <Grid item className={clsx(classes.marginTop, classes.itemGrid)}>
      <DynamicComponent {...dynamicComponentProps} />
    </Grid>
  );

  const staticMenuItem = (
    <Grid className={clsx(classes.itemGrid)} container>
      <Icon style={{ color: `rgba(255,255,255,${isActiveIcon ? 0.8 : 0.42})` }} />
      <Grid item className={classes.menuText}>
        <Typography variant={'subtitle2'} style={{ color: `rgba(255,255,255,${isActiveIcon ? 1 : 0.8})` }}>
          {title}
        </Typography>
      </Grid>
    </Grid>
  );

  const ItemOfMenu = isDynamicComponentShouldBeShown ? Grid : MenuItem;

  const itemOfMenuProps = {
    ...menuItemProps,
    disableGutters: true,
    className: isPreventClickOfMenuItem ? classes.preventClickOfMenuItem : null
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
