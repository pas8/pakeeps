import { Grid, makeStyles, MenuItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';
import { useHover, useKeyPressEvent, usePageLeave } from 'react-use';
import { themeColors } from 'components/theme';
import { nanoid } from 'nanoid';
import { colord } from 'colord';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';

const useStyles = makeStyles(theme => ({
  itemGrid: {
    margin: theme.spacing(0.4, 0.8 * 4, 0, 1.4),
    padding: theme.spacing(0.8, 0)
  },
  menuText: { marginLeft: theme.spacing(1.4) },

  container: ({ color, hoverColor }) => ({
    '& svg,h6': { color },
    '&:hover svg,h6': { color: hoverColor },
    '&:hover .MuiTouchRipple-root': {
      background: colord(color).alpha(0.16).toHex()
    }
  })
}));

const MoreUtils = ({ slicedArrAfter, customColor }) => {
  return (
    <>
      {slicedArrAfter.map(({ popoverText, icon: Icon, isIconActive, onClick }) => {
        const color = !customColor
          ? isIconActive
            ? themeColors.primaryMain
            : themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal
          : isIconActive
          ? customColor.bgHover
          : customColor.bgUnHover;

        const hoverColor = !customColor && !isIconActive && themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal;
        const classes = useStyles({ color, hoverColor });

        return (
          <MenuItem disableGutters onClick={onClick} key={nanoid()} className={classes.container}>
            <Grid className={clsx(classes.itemGrid)} container>
              <Icon />
              <Grid item className={classes.menuText}>
                <Typography variant={'subtitle2'}>{popoverText}</Typography>
              </Grid>
            </Grid>
          </MenuItem>
        );
      })}
    </>
  );
};

MoreUtils.propTypes = {};

export default MoreUtils;
