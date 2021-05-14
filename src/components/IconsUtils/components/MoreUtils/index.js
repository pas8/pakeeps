import { Grid, makeStyles, MenuItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';
import { useHover, useKeyPressEvent, usePageLeave } from 'react-use';
import { themeColors } from 'components/theme';
import { nanoid } from 'nanoid';

const useStyles = makeStyles(theme => ({
  itemGrid: { margin: theme.spacing(0.4, 0.8 * 4, 0, 1.4), padding: theme.spacing(0.8, 0) },
  menuText: { marginLeft: theme.spacing(1.4) }
}));

const MoreUtils = ({ slicedArrAfter }) => {
  const classes = useStyles();
  return (
    <>
      {slicedArrAfter.map(({ popoverText, icon: Icon, activeIcon }) => {
        const hoveredWrapperOfMenuItem = hovered => {
          const activeColor = activeIcon && themeColors.primaryMain;

          const iconHoveredColor = hovered && themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal;
          const iconColor = activeColor || iconHoveredColor || themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal;

          const textHoveredColor = hovered && themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal;
          const textColor = activeColor || textHoveredColor || themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal;

          return (
            <MenuItem disableGutters 
            // key={nanoid()}
            >
              <Grid className={clsx(classes.itemGrid)} container>
                <Icon style={{ color: iconColor }} />
                <Grid item className={classes.menuText}>
                  <Typography variant={'subtitle2'} style={{ color: textColor }}>
                    {popoverText}
                  </Typography>
                </Grid>
              </Grid>
            </MenuItem>
          );
        };

        const [MoreUtilsMenuItem] = useHover(hoveredWrapperOfMenuItem);

        return MoreUtilsMenuItem;
      })}
    </>
  );
};

MoreUtils.propTypes = {};

export default MoreUtils;
