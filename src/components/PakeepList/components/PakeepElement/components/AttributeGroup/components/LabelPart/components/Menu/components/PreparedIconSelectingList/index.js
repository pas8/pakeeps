import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { colord } from 'colord';
import PropTypes from 'prop-types';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';

const useStyles = makeStyles(({ spacing, transition, shadowss }) => ({
  iconContainer: ({ color, hoverColor, isDragging }) => ({
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

const PreparedIconSelectingList = ({
  icon,
  iconName,
  handleChangeLabelIconName,
  labelIconName,
  color,
  customColor,
  isDragging,
  checkedIcon
}) => {
  const [primaryColor, , , maxEmphasisColor, , mediumEmphasisColor] = useThemeColors();

  const isSelected = iconName === labelIconName;

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
  const onClick = () => handleChangeLabelIconName(iconName);

  return (
    <Box mx={0.4} onClick={onClick}>
      <Grid container alignItems={'center'} justify={'center'} className={classes.iconContainer}>
        {isSelected && !!checkedIcon ? checkedIcon : icon}
      </Grid>
    </Box>
  );
};

PreparedIconSelectingList.propTypes = {
  color: PropTypes.string,
  handleChangeLabelIconName: PropTypes.func,
  icon: PropTypes.any,
  iconName: PropTypes.string,
  labelIconName: PropTypes.string
};

export default PreparedIconSelectingList;
