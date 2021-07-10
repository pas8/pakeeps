import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { colord } from 'colord';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC } from 'react';
import { PreparedIconSelectingListPropsType } from './types';

const useStyles = makeStyles(({ spacing, transitions, shadows }) => ({
  iconContainer: ({ color, hoverColor, isDragging }: any) => ({
    padding: spacing(1.4),
    transform: 'scale(1.2)',
    color,
    borderRadius: spacing(0.6),
    transition: transitions.create('all', {
      easing: transitions.easing.easeIn,
      duration: transitions.duration.enteringScreen
    }),
    //  border: isDragging && '1px solid',
    //  borderColor:isDragging && color,
    cursor: 'pointer',
    '&:hover': {
      background: useAlpha(hoverColor, 0.2),
      boxShadow: shadows[8],
      color: hoverColor
      //  borderColor:isDragging && hoverColor
    }
  })
}));

const PreparedIconSelectingList: FC<PreparedIconSelectingListPropsType> = ({
  icon,
  iconName,
  selectedIconName,
  color,
  onClick,
  customColor,
  isDragging,
  checkedIcon
}) => {
  const [primaryColor, , , maxEmphasisColor, , mediumEmphasisColor] = useThemeColors();

  const isSelected = iconName === selectedIconName;

  const newColor = customColor
    ? isSelected
      ? customColor.bgUnHover
      : customColor.bgHover
    : isSelected
    ? primaryColor
    : mediumEmphasisColor;
  const hoverColor = customColor
    ? isSelected
      ? customColor.bgUnHover
      : customColor.bgHover
    : isSelected
    ? primaryColor
    : maxEmphasisColor;

  const classes = useStyles({ color: newColor, hoverColor, isDragging, customColor });

  return (
    <Box mx={0.4} onClick={onClick}>
      <Grid container alignItems={'center'} justify={'center'} className={classes.iconContainer}>
        {isSelected && !!checkedIcon ? checkedIcon : icon}
      </Grid>
    </Box>
  );
};

export default PreparedIconSelectingList;
