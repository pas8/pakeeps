import { Chip, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';

const useStyles = makeStyles(({spacing}) => ({
  container: ({ color, isDark, currentColor, isCustomColor, parentBackgrounColor,aplyMargin }) => ({
    cursor: 'pointer',
    marginRight:spacing(aplyMargin && 1),
    marginBottom:spacing(aplyMargin && 1),
    '& .MuiChip-root': {
      cursor: 'pointer',
      background: color,
      color: isCustomColor ? parentBackgrounColor : isDark ? '#080808' : null,
      '& svg': {
        color: isCustomColor ? parentBackgrounColor : isDark ? '#080808' : null
      },
      '&:hover': {
        boxShadow: `0px 0px 4px 1px ${color} `
      }
    },
    '& .MuiChip-outlined': {
      background: 'transparent',
      borderColor: color,
      color,
      '& svg': {
        color: `${color} !important`
      }
    }
  })
}));

const LabelItem = ({ currentColor, handleOpen, labelChipProps, customColor, parentBackgrounColor,aplyMargin =  true }) => {
  const isDark = useIsColorDark(currentColor);
  const isCustomColor = !!customColor;

  const [primaryColor, secondaryColor] = useThemeColors();

  const color = isCustomColor
    ? customColor?.hover
    : !currentColor
    ? '#969696'
    : currentColor === 'primary'
    ? primaryColor
    : currentColor === 'secondary'
    ? secondaryColor
    : currentColor;

  const classes = useStyles({ color, isDark, currentColor, isCustomColor, parentBackgrounColor,aplyMargin });

  return (
    <Grid className={classes.container} onContextMenu={handleOpen} onClick={handleOpen}>
      <Chip {...labelChipProps} />
    </Grid>
  );
};

LabelItem.propTypes = {
  currentColor: PropTypes.any,
  handleOpen: PropTypes.func,
  labelChipProps: PropTypes.object
};

export default LabelItem;
