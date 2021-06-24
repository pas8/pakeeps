import { Grid, makeStyles, MenuItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC } from 'react';
import { MoreUtilsPropsType, UseStylesOfMoreUtilsType } from './types';

const useStyles = makeStyles(({ spacing }) => ({
  itemGrid: {
    margin: spacing(0.4, 0.8 * 4, 0, 1.4),
    padding: spacing(0.8, 0)
  },
  menuText: { marginLeft: spacing(1.4) },

  container: ({ color, hoverColor }: UseStylesOfMoreUtilsType) => ({
    '& svg,h6': { color },
    '&:hover svg,h6': { color: hoverColor },
    '&:hover .MuiTouchRipple-root': {
      background: useAlpha(color),
      // borderBottom:isIconActive && `2px solid ${color}`,
      borderRight: 0,
      borderLeft: 0
    }
  })
}));

const MoreUtils: FC<MoreUtilsPropsType> = ({ slicedArrAfter, customColor }) => {
  return (
    <>
      {slicedArrAfter.map(({ popoverText, icon: Icon, isIconActive, onClick, ActiveIcon }) => {
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

        return (
          <MenuItem disableGutters onClick={onClick} key={nanoid()} className={classes.container}>
            <Grid className={clsx(classes.itemGrid)} container>
              {isIconActive ? <ActiveIcon /> : <Icon />}
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

export default MoreUtils;
