import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { colord } from 'colord';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(theme => ({
  iconContainer: ({ color, hoverColor ,isDragging}) => ({
    padding: theme.spacing(1.4),
    transform: 'scale(1.2)',
    color,
    borderRadius: theme.spacing(0.6),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    }),
  //  border: isDragging && '1px solid',
  //  borderColor:isDragging && color,
    cursor: 'pointer',
    '&:hover': {
      background: useAlpha(hoverColor, 0.2),
      boxShadow: theme.shadows[8],
      color: hoverColor,
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
  checkedIcon,
}) => {
  const isSelected = iconName === labelIconName;

  const newColor = customColor
    ? isSelected
      ? customColor.bgUnHover
      : customColor.bgHover
    : isSelected
    ? themeColors.primaryMain
    : themeColors.mediumEmphasis;
  const hoverColor = customColor
    ? isSelected
      ? customColor.bgUnHover
      : customColor.bgHover
    : isSelected
    ? themeColors.primaryMain
    : themeColors.maxEmphasis;

  const classes = useStyles({ color:newColor, hoverColor,isDragging ,customColor});
  const onClick = () => handleChangeLabelIconName(iconName);

  return (
    <Box mx={0.4} onClick={onClick}>
      <Grid container alignItems={'center'} justify={'center'} className={classes.iconContainer}>
        { isSelected && !!checkedIcon ? checkedIcon :   icon}
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
